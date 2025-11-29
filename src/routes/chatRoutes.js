import { Router } from "express";
import { getChatsByUser } from "../controllers/chatController.js";

const router = Router();

router.get("/:userId", getChatsByUser);

export default router;
