// server/receiver.js
import { ImapFlow } from "imapflow";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const MESSAGES_FILE = "./server/messages.json";

export async function readInbox() {
  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await client.connect();
    await client.mailboxOpen("INBOX");

    const messages = [];

    // Fetch the 10 most recent emails
    for await (let msg of client.fetch("*", { envelope: true, source: true }, { limit: 10 })) {
      const from = msg.envelope.from[0].address;
      const subject = msg.envelope.subject;
      const date = msg.envelope.date;
      const body = msg.source.toString();

      messages.push({
        from,
        subject,
        date,
        body: body.slice(0, 500), // limit preview length
      });
    }

    // Save locally for now
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    console.log(`📥 Saved ${messages.length} received messages to ${MESSAGES_FILE}`);

    await client.logout();
  } catch (err) {
    console.error("❌ Error reading inbox:", err);
  }
}