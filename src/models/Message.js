import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    text: { type: String, required: true },

    from: {
      type: String,
      enum: ["me", "bot"],
      default: "me",
    },

    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
