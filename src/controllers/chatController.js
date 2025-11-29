import * as chatService from "../services/chatService.js";

export async function getChatsByUser(req, res) {
  try {
    const chats = await chatService.getChatsByUser(req.params.userId);
    res.json(chats);
  } catch (err) {
    console.error("Error en getChatsByUser:", err);
    res.status(500).json({ error: "No se pudieron obtener los chats" });
  }
}
