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
// app.post("/api/product-enquiry", async (req, res) => {
//   const { name, email, phone, message, product, color, fabric } = req.body;

//   if (!name || !email || !message || !product) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   const subject = `Product Enquiry: ${product.name}`;

//   try {
//     // Email to company
//     await transporter.sendMail({
//       from: `"Kayahaus" <${process.env.SMTP_USER}>`,
//       replyTo: email,
//       to: process.env.CONTACT_RECEIVER,
//       subject,
//       html: `
//         <h2>New Product Enquiry</h2>
//         <p><strong>Product:</strong> ${product.name} (${product.id || "N/A"})</p>
//         ${color ? `<p><strong>Color:</strong> ${color}</p>` : ""}
//         ${fabric ? `<p><strong>Fabric:</strong> ${fabric}</p>` : ""}
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
//         <hr />
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     });

//     // Confirmation email to user
//     await transporter.sendMail({
//       from: `"Kayahaus" <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: `We received your enquiry about ${product.name}`,
//       html: `
//         <p>Hello ${name},</p>
//         <p>Thank you for enquiring about <strong>${product.name}</strong>.</p>
//         ${color ? `<p><strong>Selected Color:</strong> ${color}</p>` : ""}
//         ${fabric ? `<p><strong>Selected Fabric:</strong> ${fabric}</p>` : ""}
//         <p>Our team will contact you shortly.</p>
//         <hr />
//         <p><strong>Your message:</strong></p>
//         <p>${message}</p>
//         <p>Kind regards,<br />Kayahaus Team</p>
//       `,
//     });

//     return res.json({
//       success: true,
//       message: "Enquiry sent successfully",
//     });
//   } catch (error) {
//     console.error("Product enquiry error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send enquiry",
//     });
//   }
// });

app.post("/api/product-enquiry", async (req, res) => {
  const { name, email, phone, message, product, color, fabric, size, sizePrice } = req.body;

  if (!name || !email || !message || !product) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const subject = `Product Enquiry: ${product.name}`;
  const productPrice = sizePrice || (product.price ? `R${Number(product.price).toFixed(2)}` : "Price on request");
  
  try {
    // Email to company
    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Product Enquiry</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 20px; 
              background-color: #f8f9fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background-color: #000000; 
              color: #ffffff; 
              padding: 30px; 
              text-align: center;
            }
            .content { 
              padding: 40px 30px; 
            }
            .section { 
              margin-bottom: 25px; 
              padding-bottom: 25px; 
              border-bottom: 1px solid #e9ecef;
            }
            .section:last-child { 
              border-bottom: none; 
              margin-bottom: 0; 
              padding-bottom: 0;
            }
            .label { 
              font-weight: 600; 
              color: #000000; 
              display: inline-block; 
              min-width: 120px; 
              margin-bottom: 5px;
            }
            .value { 
              color: #666666;
            }
            .product-details { 
              background-color: #f8f9fa; 
              padding: 20px; 
              border-radius: 6px; 
              border-left: 4px solid #000000;
            }
            .footer { 
              background-color: #f8f9fa; 
              padding: 30px; 
              text-align: center; 
              border-top: 1px solid #e9ecef;
            }
            .logo { 
              max-width: 120px; 
              margin-bottom: 20px;
            }
            h2 { 
              color: #000000; 
              margin-top: 0; 
              font-size: 24px;
            }
            h3 { 
              color: #000000; 
              margin-top: 0; 
              font-size: 18px;
            }
            .divider { 
              height: 1px; 
              background-color: #e9ecef; 
              margin: 30px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📋 New Product Enquiry</h2>
            </div>
            
            <div class="content">
              <div class="section">
                <h3>Customer Details</h3>
                <p><span class="label">Name:</span> <span class="value">${name}</span></p>
                <p><span class="label">Email:</span> <span class="value">${email}</span></p>
                <p><span class="label">Phone:</span> <span class="value">${phone || "Not provided"}</span></p>
              </div>
              
              <div class="section">
                <div class="product-details">
                  <h3>Product Information</h3>
                  <p><span class="label">Product:</span> <span class="value">${product.name}</span></p>
                  <p><span class="label">Price:</span> <span class="value">${productPrice}</span></p>
                  ${size ? `<p><span class="label">Selected Size:</span> <span class="value">${size}</span></p>` : ""}
                  ${color ? `<p><span class="label">Selected Color:</span> <span class="value">${color}</span></p>` : ""}
                  ${fabric ? `<p><span class="label">Selected Fabric:</span> <span class="value">${fabric}</span></p>` : ""}
                </div>
              </div>
              
              <div class="section">
                <h3>Customer Message</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #000000;">
                  <p style="margin: 0; color: #666666;">${message}</p>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0; color: #666666; font-size: 14px;">
                This enquiry was submitted from the Kayahaus website. Please respond within 24 hours.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"Kayahaus" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for your enquiry about ${product.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enquiry Confirmation</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 20px; 
              background-color: #f8f9fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background-color: #000000; 
              color: #ffffff; 
              padding: 30px; 
              text-align: center;
            }
            .content { 
              padding: 40px 30px; 
            }
            .section { 
              margin-bottom: 25px; 
              padding-bottom: 25px; 
              border-bottom: 1px solid #e9ecef;
            }
            .section:last-child { 
              border-bottom: none; 
              margin-bottom: 0; 
              padding-bottom: 0;
            }
            .label { 
              font-weight: 600; 
              color: #000000; 
              display: inline-block; 
              min-width: 120px; 
              margin-bottom: 5px;
            }
            .value { 
              color: #666666;
            }
            .product-details { 
              background-color: #f8f9fa; 
              padding: 20px; 
              border-radius: 6px; 
              border-left: 4px solid #000000;
            }
            .footer { 
              background-color: #000000; 
              color: #ffffff; 
              padding: 40px 30px; 
              text-align: center;
            }
            .logo-container { 
              margin-bottom: 20px;
            }
            .logo { 
              max-width: 150px; 
              height: auto;
            }
            .contact-info { 
              font-size: 14px; 
              color: #cccccc; 
              margin-top: 15px;
            }
            h2 { 
              color: #000000; 
              margin-top: 0; 
              font-size: 24px;
            }
            h3 { 
              color: #000000; 
              margin-top: 0; 
              font-size: 18px;
            }
            .thank-you { 
              font-size: 16px; 
              line-height: 1.8;
            }
            .highlight { 
              color: #000000; 
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Your Enquiry</h2>
            </div>
            
            <div class="content">
              <div class="section">
                <p class="thank-you">
                  Hello <span class="highlight">${name}</span>,<br><br>
                  Thank you for enquiring about <span class="highlight">${product.name}</span>. 
                  We have received your enquiry and our team will contact you within 24 hours.
                </p>
              </div>
              
              <div class="section">
                <div class="product-details">
                  <h3>Your Selection</h3>
                  <p><span class="label">Product:</span> <span class="value">${product.name}</span></p>
                  <p><span class="label">Price:</span> <span class="value">${productPrice}</span></p>
                  ${size ? `<p><span class="label">Selected Size:</span> <span class="value">${size}</span></p>` : ""}
                  ${color ? `<p><span class="label">Selected Color:</span> <span class="value">${color}</span></p>` : ""}
                  ${fabric ? `<p><span class="label">Selected Fabric:</span> <span class="value">${fabric}</span></p>` : ""}
                </div>
              </div>
              
              <div class="section">
                <h3>Your Message</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #000000;">
                  <p style="margin: 0; color: #666666;">${message}</p>
                </div>
              </div>
              
              <div class="section">
                <h3>What Happens Next?</h3>
                <p style="color: #666666;">
                  1. Our product specialist will review your enquiry<br>
                  2. You'll receive a personalized response within 24 hours<br>
                  3. We'll provide you with detailed information and assistance
                </p>
              </div>
            </div>
            
            <div class="footer">
              <div class="logo-container">
                <!-- Add your logo here -->
                <!-- <img src="https://yourdomain.com/logo.png" alt="Kayahaus Logo" class="logo"> -->
                <div style="font-size: 24px; font-weight: 600; color: #ffffff;">KAYAHAUS</div>
              </div>
              <p style="margin: 0; font-size: 14px; color: #cccccc;">
                Premium Quality Products
              </p>
              <div class="contact-info">
                <p style="margin: 10px 0 0 0;">
                  <!-- Add your contact information here -->
                  <!-- Email: info@kayahaus.com | Phone: +27 (0) 00 000 0000 -->
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
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
