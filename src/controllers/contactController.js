import * as contactService from "../services/contactService.js";

export async function getContacts(req, res) {
  try {
    const userId = req.user.id;
    const contacts = await contactService.getContacts(userId);
    res.json(contacts);
  } catch (err) {
    console.error("Error en getContacts:", err);
    res.status(500).json({ error: "Error obteniendo contactos" });
  }
}

export async function createContact(req, res) {
  try {
    const userId = req.user.id;
    const { name, lastname, phone, avatar } = req.body;

    const contact = await contactService.createContact({
      name,
      lastname,
      phone,
      avatar,
      userId,
    });

    res.json(contact);
  } catch (err) {
    console.error("Error en createContact:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function updateContact(req, res) {
  try {
    const updated = await contactService.updateContact(
      req.params.id,
      req.body
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el contacto" });
  }
}

export async function deleteContact(req, res) {
  try {
    await contactService.deleteContact(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("Error en deleteContact:", err);
    res.status(500).json({ error: "No se pudo eliminar" });
  }
}
