import * as authService from "../services/authService.js";

export async function register(req, res) {
  console.log("BODY RECIBIDO EN REGISTER:", req.body);
  try {
    const user = await authService.register(req.body);
    res.json({ message: "Registro exitoso, revisá tu email", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function verifyAccount(req, res) {
  try {
    const token = req.params.token;
    const result = await authService.verifyAccount(token);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getUserData(req, res) {
  res.json({
    message: "Usuario autenticado",
    user: req.user,
  });
}
