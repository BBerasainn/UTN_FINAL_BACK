import nodemailer from "nodemailer";

export async function sendVerificationEmail(user, token) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

  await transporter.sendMail({
    from: "no-reply@miapp.com",
    to: user.email,
    subject: "Verifica tu cuenta",
    html: `
      <h2>Hola ${user.name}!</h2>
      <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
      <a href="${verificationUrl}">Verificar cuenta</a>
    `,
  });

  console.log("📧 Email enviado correctamente a Mailtrap:", user.email);
}
