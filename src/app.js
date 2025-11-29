import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://utnfinalfrontendfullstack-q5kl1y1te-bbs-projects-3a406ec0.vercel.app",  
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS no permitido: " + origin), false);
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messageRoutes);  
app.use("/api/chats", chatRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use(errorMiddleware);

export default app;
