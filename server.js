// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------------------
   MIDDLEWARE
---------------------------- */
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "https://kayahaus.co.za",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ THIS ALONE HANDLES PREFLIGHT IN NODE 24
app.use(cors(corsOptions));

/* ---------------------------
   SMTP
---------------------------- */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ---------------------------
   HEALTH CHECK
---------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 Kayahaus Backend is running!");
});

/* ---------------------------
   CONTACT FORM
---------------------------- */
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const subjectLine = subject || `New Contact Message from ${name}`;

  try {
    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER,
      subject: subjectLine,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
      `,
    });

    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message",
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for contacting <strong>Kayahaus Furniture</strong>.</p>
        <p>We will get back to you shortly.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>Kind regards,<br/>Kayahaus Team</p>
      `,
    });

    res.json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send emails.",
    });
  }
});


/* ------------------------------------
   PRODUCT ENQUIRY FORM
------------------------------------ */
app.post("/api/product-enquiry", async (req, res) => {
  const { name, email, phone, message, product, color, fabric } = req.body;

  if (!name || !email || !message || !product) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const subject = `Product Enquiry: ${product.name}`;

  try {
    // Email to company
    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER,
      subject,
      html: `
        <h2>New Product Enquiry</h2>
        <p><strong>Product:</strong> ${product.name} (${product.id || "N/A"})</p>
        ${color ? `<p><strong>Color:</strong> ${color}</p>` : ""}
        ${fabric ? `<p><strong>Fabric:</strong> ${fabric}</p>` : ""}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your enquiry about ${product.name}`,
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for enquiring about <strong>${product.name}</strong>.</p>
        ${color ? `<p><strong>Selected Color:</strong> ${color}</p>` : ""}
        ${fabric ? `<p><strong>Selected Fabric:</strong> ${fabric}</p>` : ""}
        <p>Our team will contact you shortly.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>Kind regards,<br />Kayahaus Team</p>
      `,
    });

    return res.json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.error("Product enquiry error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send enquiry",
    });
  }
});


/* ---------------------------
   START SERVER
---------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
