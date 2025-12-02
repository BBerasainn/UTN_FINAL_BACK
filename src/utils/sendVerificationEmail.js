import nodemailer from "nodemailer";

export async function sendVerificationEmail(user, token) {

  console.log("📣 sendVerificationEmail SE ESTÁ EJECUTANDO");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,      
    port: Number(process.env.SMTP_PORT), 
    secure: Number(process.env.SMTP_PORT) === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

  try {
    await transporter.sendMail({
      from: `"UTN App" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Verifica tu cuenta",
      html: `
        <h2>Hola ${user.name}!</h2>
        <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
        <a href="${verificationUrl}">Verificar cuenta</a>
      `,
    });

    console.log("📧 Email enviado correctamente a:", user.email);

  } catch (error) {
    console.error(" ERROR ENVIANDO EMAIL:", error.message);
    console.error(" ERROR COMPLETO:", error);
  }
}
