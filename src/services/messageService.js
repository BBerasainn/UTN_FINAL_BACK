import * as messageRepository from "../repositories/messageRepository.js";

export function getMessages(contactId) {
  return messageRepository.getMessagesByContact(contactId);
}

export function createMessage(contactId, msg) {
  return messageRepository.createMessage(contactId, msg);
}
