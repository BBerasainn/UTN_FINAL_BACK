import Message from "../models/Message.js";

export async function getMessages(contactId, userId) {
  return await Message.find({ contactId, userId }).sort({ createdAt: 1 });
}

export async function createMessage({ contactId, userId, text }) {
  const message = new Message({
    contactId,
    userId,
    text,
    time: new Date(),
  });

  return await message.save();
}
