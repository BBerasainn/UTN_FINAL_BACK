import User from "../models/user.js";

export async function createUser(data) {
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
