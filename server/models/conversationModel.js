import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: { type: [mongoose.Types.ObjectId], ref: "User" },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
