import { sendEmail, verificationEmailTemplate } from "./email.js";

export async function sendVerificationEmail(user, token) {
  try {
    const link = `${process.env.FRONTEND_URL}/verify/${token}`;
    const html = verificationEmailTemplate(user.name, link);

    await sendEmail(user.email, "Verificación de cuenta", html);

    console.log("Email de verificación enviado a:", user.email);
    return true;

  } catch (err) {
    console.error("Error enviando email de verificación:", err);
    return false;
  }
}
