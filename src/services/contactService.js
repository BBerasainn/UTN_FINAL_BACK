import * as contactRepository from "../repositories/contactRepository.js";

export async function getContacts(userId) {
  return await contactRepository.getContactsByUser(userId);
}

export async function createContact(data) {
  return await contactRepository.createContact(data);
}

export async function updateContact(id, data) {
  return await contactRepository.updateContact(id, data);
}

export async function deleteContact(id) {
  return await contactRepository.deleteContact(id);
}
