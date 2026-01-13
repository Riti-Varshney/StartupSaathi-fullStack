import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const createConversation = async (req, res) => {
  const { user1, user2 } = req.body; 
  
  let conversation = await Conversation.findOne({
    members: { $all: [user1, user2] }  //$all isliy use kiya so that array must contain all specified elements in any order
  });

  if (!conversation) {
    conversation = await Conversation.create({
      members: [user1, user2]
    });
  }

  res.json(conversation); //snd cnvrstn bck 2 frontend
};
export const sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;

  const msg = await Message.create({
    conversationId,
    sender,
    text,
  });

  res.json(msg);
};
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

  res.json(messages);
};

//fetch all cnvrstn of a user
export const getUserConversations = async (req, res) => {
  const { user } = req.params;

  const conversations = await Conversation.find({
    members: { $in: [user] }   //$in ye isliye use kiya bcoz-> array must contain at least one of the specified values
  }).sort({ updatedAt: -1 });

  res.json(conversations);
};
export const getLastMessage = async (req, res) => {
  const { conversationId } = req.params;

  const lastMsg = await Message.findOne({ conversationId })
    .sort({ createdAt: -1 });

  res.json(lastMsg);
};
