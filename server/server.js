// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

import { startDailyScheduler } from "./scheduler.js";
import { readInbox } from "./receiver.js";

dotenv.config();

const app = express(); // ✅ must exist before defining routes
app.use(cors());
app.use(express.json());

// Route 1: start sending emails
app.post("/api/start", async (req, res) => {
  const { phase, target } = req.body;

  if (!phase || !target) {
    return res.status(400).json({ error: "phase and target are required" });
  }

  try {
    startDailyScheduler(phase, target);
    res.json({ status: "ok", message: `Scheduler started for phase: ${phase}` });
  } catch (err) {
    console.error("❌ Error starting scheduler:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route 2: get received messages
app.get("/api/messages", async (req, res) => {
  try {
    await readInbox(); // refresh inbox
    const data = fs.readFileSync("./server/messages.json", "utf-8");
    const message = JSON.parse(data);
    res.json(message);
  } catch (err) {
    console.error("❌ Error in /api/messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 SPS backend API running on port ${PORT}`);
  console.log(`📡 Available routes:
    - POST /api/start
    - GET /api/messages
  `);
});
