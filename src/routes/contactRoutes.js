import { Router } from "express";
import {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from "../controllers/contactController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getContacts);
router.post("/", authMiddleware, createContact);
router.put("/:id", authMiddleware, updateContact);   
router.delete("/:id", authMiddleware, deleteContact);

export default router;
