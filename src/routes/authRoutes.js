import { Router } from "express";
import {
  register,
  login,
  verifyAccount,
  getUserData,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyAccount);
router.get("/me", authMiddleware, getUserData);

export default router;
