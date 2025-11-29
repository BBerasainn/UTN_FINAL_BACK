import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.DB_URI;

    if (!uri) {
      throw new Error("DB_URI no está definido en el archivo .env");
    }

    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error conectando a MongoDB", err);
    process.exit(1);
  }
}
