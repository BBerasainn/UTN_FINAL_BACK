import * as userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { createJWT } from "../utils/jwt.js";
import jwt from "jsonwebtoken";           
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export async function register({ name, email, password }) {
  console.log("ejecutando registe service");
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) throw new Error("El email ya está registrado");

  const hashed = await hashPassword(password);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashed,
    isVerified: false,
  });

 const token = createJWT({ userId: user._id });

  try {
    await sendVerificationEmail(user, token);
  } catch (err) {
    console.error("❌ Error enviando email:", err.message);
  }
  
  return {
    message: "Registro exitoso. Revisa tu email para activarlo.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    }
  };
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
