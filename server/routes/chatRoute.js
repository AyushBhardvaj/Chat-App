import express from "express";
import {
  createConversation,
  createMessage,
  getConversationMessages,
  getConversationUsers,
  getUsers,
} from "../controllers/chatController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/conversation", createConversation);
router.get("/conversations/:userId", isAuthenticated, getConversationUsers);
router.post("/message", isAuthenticated, createMessage);
router.get(
  "/messages",
  isAuthenticated,
  getConversationMessages
);
router.get("/users", isAuthenticated, getUsers);

export default router;
