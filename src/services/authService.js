import * as userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { createJWT } from "../utils/jwt.js";
import jwt from "jsonwebtoken";           
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export async function register({ name, email, password }) {
  console.log("📩 Datos recibidos:", { name, email, password });

  console.log("🔍 Checking existing user…");
  let existingUser;
  try {
    existingUser = await userRepository.getUserByEmail(email);
    console.log("🔍 Resultado getUserByEmail:", existingUser);
  } catch (err) {
    console.error("💥 Error en getUserByEmail:", err);
    throw err;
  }

  if (existingUser) {
    console.log("⚠️ Usuario ya existe");
    throw new Error("El email ya está registrado");
  }

  console.log("🔐 Generando hash…");
  let hashed;
  try {
    hashed = await hashPassword(password);
    console.log("🔐 Hash generado:", hashed);
  } catch (err) {
    console.error("💥 Error en hashPassword:", err);
    throw err;
  }

  console.log("🔥 Creando usuario…");
  let user;
  try {
    user = await userRepository.createUser({
      name,
      email,
      password: hashed,
      isVerified: false,
    });
    console.log("🔥 Usuario creado:", user);
  } catch (err) {
    console.error("💥 ERROR EXACTO en createUser:", err);
    throw err;
  }

  // email
  console.log("📧 Enviando email…");
  const token = createJWT({ userId: user._id });
  try {
    await sendVerificationEmail(user, token);
    console.log("📧 Email enviado OK");
  } catch (err) {
    console.error("❌ Error enviando email:", err.message);
  }

  return { user };
}


export async function login({ email, password }) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error("Credenciales inválidas");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Credenciales inválidas");

  if (!user.isVerified)
    throw new Error("Debes verificar tu cuenta antes de ingresar");

  const token = createJWT({ userId: user._id });

  return {
    message: "Login exitoso",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function verifyAccount(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.getUserById(decoded.userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (user.isVerified) {
      return { message: "La cuenta ya estaba verificada" };
    }

    await userRepository.updateUser(user._id, { isVerified: true });

    return { message: "Cuenta verificada correctamente" };
  } catch (error) {
    console.error("Error en verifyAccount:", error);
    throw new Error("Token inválido o expirado");
  }
}
