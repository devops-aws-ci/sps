import cron from "node-cron";
import dotenv from "dotenv";
import { sendEmail } from "./mailer.js";

// Load environment variables
dotenv.config();

// Import your real SPS phase data
import conception from "./data/conception.js";
import developpement from "./data/developpement.js";
import infrastructure from "./data/infrastructure.js";
import deploiement from "./data/deploiement.js";
import maintenance from "./data/maintenance.js";

// Choose which phase to simulate (you can make this dynamic later)
const currentPhase = conception;

// Track simulation day
let currentDay = 1;

export function startDailyScheduler() {
  console.log("⏱️ SPS daily email scheduler started...");
  console.log(`📘 Current phase: conception (${currentPhase.length} messages)`);

  // Every day at 09:00 — for testing use "*/1 * * * *" (every minute)
  cron.schedule("*/1 * * * *", async () => {
    const message = currentPhase.find(m => m.day === currentDay);
    if (message) {
      // Replace variables in the template
      const formattedBody = message.body
        .replaceAll("{clientName}", "Client Démo")
        .replaceAll("{projectName}", "Projet SPS")
        .replaceAll("{providerName}", "Équipe SPS");

      const formattedSubject = message.subject
        .replaceAll("{projectName}", "Projet SPS");

      console.log(`📤 Sending message for day ${currentDay}: ${formattedSubject}`);
      await sendEmail(process.env.TARGET_EMAIL, formattedSubject, formattedBody);
    } else {
      console.log(`ℹ️ No message for day ${currentDay}`);
    }

    currentDay++;
    if (currentDay > 60) currentDay = 1; // loop if needed
  });
}
