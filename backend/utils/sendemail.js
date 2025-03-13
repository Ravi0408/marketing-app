const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Fix: Use `host` instead of `service`
      port: 587, // Port 587 for TLS
      secure: false, // Fix: Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER, // Your Mailtrap username
        pass: process.env.EMAIL_PASS, // Your Mailtrap password
      },
    });

    await transporter.sendMail({
      from: `"Your App Name" <no-reply@yourapp.com>`, // Fix: Use a generic email
      to: email,
      subject: subject,
      text: text,
    });

    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
