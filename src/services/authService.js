import * as userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { createJWT, verifyJWT } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/gmailVerificationEmail.js";

console.log("authService.js CARGADO (VERSION ACTUAL)");

export async function register({ name, email, password }) {
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashed = await hashPassword(password);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashed,
    isVerified: false,
  });

  console.log("Antes de createJWT");
  const token = createJWT({ userId: user._id });
  console.log("Token generado:", token);

  try {
    await sendVerificationEmail(user, token);
  } catch (err) {
    console.error("Error enviando email:", err.message);
  }

  return {
    message: "Registro exitoso. Revisa tu email para activarlo.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  };
}

export async function login({ email, password }) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error("Credenciales inválidas");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Credenciales inválidas");

  if (!user.isVerified) {
    throw new Error("Debes verificar tu cuenta antes de ingresar");
  }

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
    const decoded = verifyJWT(token); 
    const user = await userRepository.getUserById(decoded.userId);

    if (!user) throw new Error("Usuario no encontrado");
    if (user.isVerified) return { message: "La cuenta ya estaba verificada" };

    await userRepository.updateUser(user._id, { isVerified: true });

    return { message: "Cuenta verificada correctamente" };
  } catch (err) {
    console.error("Error en verifyAccount:", err);
    throw new Error("Token inválido o expirado");
  }
}
