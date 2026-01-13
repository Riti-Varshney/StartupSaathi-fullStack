import express from "express";
import {
  createConversation,
  sendMessage,
  getMessages,
  getUserConversations,
  getLastMessage
} from '../controller/newChatController.js'

const router = express.Router();

router.post("/conversation", createConversation);
router.post("/send", sendMessage);
router.get("/messages/:conversationId", getMessages);
router.get("/user/:user", getUserConversations);
router.get("/last/:conversationId", getLastMessage);

export default router;