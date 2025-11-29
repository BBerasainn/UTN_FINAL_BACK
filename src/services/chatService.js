import * as chatRepository from "../repositories/chatRepository.js";

export function getChatsByUser(userId) {
  return chatRepository.getChatsByUser(userId);
}
