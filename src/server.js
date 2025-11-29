import dotenv from "dotenv";
dotenv.config();      

import { connectDB } from "./config/db.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
