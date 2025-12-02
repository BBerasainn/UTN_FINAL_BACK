import nodemailer from "nodemailer";

if (process.env.NODE_ENV !== "production") {
  console.log("🌱 Cargando .env (local)...");
  require("dotenv").config();
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,     
  port: Number(process.env.SMTP_PORT), 
  secure: false,                  
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"UTN App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📨 Email enviado a:", to);
  } catch (err) {
    console.error("❌ Error enviando email:", err);
    console.log("DEBUG SMTP_USER:", process.env.SMTP_USER),
    console.log("DEBUG SMTP_PASS:", process.env.SMTP_PASS ? "OK" : "MISSING");
  }
}

export function verificationEmailTemplate(name, link) {
  return `
    <h1>Hola ${name}!</h1>
    <p>Gracias por registrarte. Para activar tu cuenta hacé clic acá:</p>

    <a href="${link}" 
      style="padding:12px 20px;background:#4caf50;color:white;
             text-decoration:none;border-radius:5px;">
      Activar cuenta
    </a>

    <p>Si no fuiste vos, podés ignorar este mensaje.</p>
  `;
}
