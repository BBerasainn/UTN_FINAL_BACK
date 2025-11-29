import Message from "../models/Message.js";
import Contact from "../models/Contact.js";

export async function getChatList(userId) {
  const contacts = await Contact.find({ userId }).sort({ createdAt: -1 });

  const chatsWithLastMessage = await Promise.all(
    contacts.map(async (c) => {
      const lastMsg = await Message.find({ contactId: c._id })
        .sort({ createdAt: -1 })
        .limit(1);

      return {
        contact: c,
        lastMessage: lastMsg[0] || null,
      };
    })
  );

  return chatsWithLastMessage;
}

export async function getChatByContactId(contactId, userId) {
  const contact = await Contact.findOne({ _id: contactId, userId });

  if (!contact) return null;

  const messages = await Message.find({ contactId }).sort({ createdAt: 1 });

  return { contact, messages };
}
