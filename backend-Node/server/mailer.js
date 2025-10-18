import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to, subject, body) {
  try {
    const info = await transporter.sendMail({
      from: `"SPS Simulation" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email send failed:", err);
  }
}
