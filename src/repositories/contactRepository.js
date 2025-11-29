import Contact from "../models/Contact.js";

export async function getContactsByUser(userId) {
  return await Contact.find({ userId }).sort({ createdAt: -1 });
}

export async function createContact({ name, lastname, phone, avatar, userId }) {
  return await Contact.create({ name, lastname, phone, avatar, userId });
}

export async function updateContact(id, data) {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteContact(id) {
  return await Contact.findByIdAndDelete(id);
}

export async function getContactById(id) {
  return await Contact.findById(id);
}
