import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const MAX_MESSAGE_LENGTH = 2000;

// Init transporter once at startup (not per-request)
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || "587");
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const secure =
  String(process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
  port === 465;

const smtpReady = !!(host && user && pass);
const transporter = smtpReady
  ? nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
  : null;

function normalize(value) {
  return String(value ?? "").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

router.post("/", async (req, res) => {
  const name = normalize(req.body?.name);
  const email = normalize(req.body?.email);
  const message = normalize(req.body?.message);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required." });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: "Message is too long." });
  }

  if (!transporter || !process.env.CONTACT_TO) {
    return res
      .status(500)
      .json({ error: "Email service is not configured." });
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || user;
  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const safeEmail = email.replace(/[\r\n]+/g, "").trim();
  const subject = `Portfolio Inquiry from ${safeName}`;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: safeEmail,
      subject,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${message}`,
    });

    return res.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact] Failed to send email:", msg);
    return res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
