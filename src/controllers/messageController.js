import * as messageRepository from "../repositories/messageRepository.js";

export async function getMessages(req, res) {
  try {
    const { contactId } = req.params;
    const messages = await messageRepository.getMessages(contactId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo mensajes" });
  }
}

export async function createMessage(req, res) {
  try {
    const { contactId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Mensaje vacío" });
    }

    const message = await messageRepository.createMessage({
      contactId,
      userId,
      text
    });

    res.status(201).json(message);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando mensaje" });
  }
}
