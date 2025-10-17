// server/receiver.js
import { ImapFlow } from "imapflow";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const MESSAGES_FILE = "./server/messages.json";

export async function readInbox() {
  console.log("🚀 Starting IMAP read process...");
  console.log("📄 Using IMAP_USER:", process.env.IMAP_USER);

  const client = new ImapFlow({
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT),
    secure: process.env.IMAP_SECURE === "true",
    auth: {
      user: process.env.IMAP_USER,
      pass: process.env.IMAP_PASS,
    },
  });

  try {
    console.log("🔌 Connecting to IMAP server...");
    await client.connect();
    console.log("📡 Connected to IMAP as:", process.env.IMAP_USER);

    await client.mailboxOpen("INBOX");
    console.log("📥 INBOX opened successfully");

    const targetSender = process.env.TARGET_SENDER || "cloudsecops.services@gmail.com";
    const messages = [];

    for await (let msg of client.fetch("*", { envelope: true, source: true }, { limit: 20 })) {
      const from = msg.envelope.from[0].address;
      const subject = msg.envelope.subject;
      const date = new Date(msg.envelope.date);
      const body = msg.source.toString();

      if (from.toLowerCase() === targetSender.toLowerCase()) {
        messages.push({ from, subject, date, body: body.slice(0, 500) });
      }
    }

    messages.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = messages[0] || null;

    if (latest) {
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(latest, null, 2));
      console.log(`📩 Saved latest email from ${latest.from} (${latest.subject})`);
    } else {
      console.log(`ℹ️ No new emails found from ${targetSender}`);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify({ message: "No new emails" }, null, 2));
    }

    await client.logout();
    console.log("👋 Logged out from IMAP");
  } catch (err) {
    console.error("❌ Error reading inbox:", err);
  }
}

// 👇 Add this line so the script actually runs when executed directly
readInbox();
