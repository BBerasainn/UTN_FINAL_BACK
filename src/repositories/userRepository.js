import User from "../models/User.js";

export async function createUser(data) {
  console.log("CREANDO USUARIO EN MONGO:");
  console.log(data);
  return await User.create(data);
}


export async function getUserByEmail(email) {
  return await User.findOne({ email });
}

export async function getUserById(id) {
  return await User.findById(id);
}

export async function markAsVerified(id) {
  return await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}
