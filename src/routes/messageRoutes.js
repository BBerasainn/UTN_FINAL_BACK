import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/:contactId/messages", authMiddleware, getMessages);
router.post("/:contactId/messages", authMiddleware, createMessage);

export default router;
