import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String], //using email of each person as a unique identity
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
