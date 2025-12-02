// import nodemailer from "nodemailer";

// export async function sendVerificationEmail(user, token) {

//   console.log("📣 sendVerificationEmail SE ESTÁ EJECUTANDO");

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,      
//     port: 465, 
//     secure: true, 
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     logger: true,
//     debug: true,
//   });

//   const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

//   try {
//     await transporter.sendMail({
//       from: `"UTN App" <${process.env.SMTP_USER}>`,
//       to: user.email,
//       subject: "Verifica tu cuenta",
//       html: `
//         <h2>Hola ${user.name}!</h2>
//         <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
//         <a href="${verificationUrl}">Verificar cuenta</a>
//       `,
//     });

//     console.log("📧 Email enviado correctamente a:", user.email);

//   } catch (error) {
//     console.error(" ERROR ENVIANDO EMAIL:", error.message);
//     console.error(" ERROR COMPLETO:", error);
//   }
// }

import nodemailer from "nodemailer";
import { google } from "googleapis";

console.log("📌 gmailVerificationEmail.js CARGADO CORRECTAMENTE");

export async function sendVerificationEmail(user, token) {
  console.log("📣 Enviando email con Gmail API OAuth2");

  try {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken?.token,
      },
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

    await transporter.sendMail({
      from: `UTN Final <${process.env.GOOGLE_EMAIL}>`,
      to: user.email,
      subject: "Verificá tu cuenta",
      html: `
        <h2>Hola ${user.name}!</h2>
        <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
        <a href="${verificationUrl}">Verificar cuenta</a>
      `,
    });

    console.log("Email enviado correctamente a:", user.email);

  } catch (err) {
    console.error("ERROR ENVIANDO EMAIL (Gmail API):", err);
  }
}
