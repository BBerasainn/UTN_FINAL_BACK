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

import { google } from "googleapis";

export async function sendVerificationEmail(user, token) {
  console.log("📣 Enviando email usando API Gmail (NO SMTP)");

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

    const rawMessage =
      [
        `From: "UTN Final" <${process.env.GOOGLE_EMAIL}>`,
        `To: ${user.email}`,
        "Subject: Verificá tu cuenta",
        "Content-Type: text/html; charset=UTF-8",
        "",
        `<h2>Hola ${user.name}!</h2>
         <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
         <a href="${verificationUrl}">Verificar cuenta</a>`
      ]
        .join("\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("📨 Email enviado correctamente a:", user.email);

  } catch (err) {
    console.error("ERROR ENVIANDO EMAIL API:", err);
  }
}
