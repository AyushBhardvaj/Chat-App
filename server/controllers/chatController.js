import Conversation from "../models/conversationModel.js";
import Message from "../models/messsageModel.js";
import User from "../models/userModel.js";

// I don't think this is needed.
export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const newConversation = await Conversation.create({
      members: [senderId, receiverId],
    });
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This will be used to diplay those users on left sidebar who had conversations earlier.
export const getConversationUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversationList = await Conversation.find({
      members: { $in: [userId] },
    });

    const convesationUsers = await Promise.all(
      conversationList.map(async ({ members, _id }) => {
        const receiverId = members.find((memberId) => memberId != userId);
        const recieverUser = await User.findById(receiverId);
        return { user: recieverUser, conversationId: _id };
      })
    );

    res.status(200).send(convesationUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { conversationId, message, receiverId = "" } = req.body;
    if (!conversationId) {
      const newConversation = await Conversation.create({
        members: [req.user._id, receiverId],
      });
      const newMessage = await Message.create({
        conversationId: newConversation._id,
        sender: req.user._id,
        message,
      });
      return res.status(200).send("Message sent successfully");
    }
    const newMessage = await Message.create({
      conversationId,
      sender: req.user._id,
      message,
    });
    res.status(200).send("Message sent successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId, receiverId } = req.query;

    if (!conversationId) {
      const conversation = await Conversation.find({
        members: { $all: [receiverId, req.user._id] },
      });

      if (conversation.length === 0) {
        return res.status(200).send([]);
      }

      const conversationMessages = await Message.find({
        conversationId: conversation[0]._id,
      });

      const messages = conversationMessages.map(({ message, sender }) => {
        return { message, sender };
      });

      return res.status(200).send(messages);
    }

    const conversationMessages = await Message.find({ conversationId });

    const messages = conversationMessages.map(({ message, sender }) => {
      return { message, sender };
    });
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Added by myself for click on a user in user's list.
// export const startConversation = async (req, res) => {
//   try {
//     const { receiverId, userId } = req.body; // Need to access receiverId through params and senderId from req.body
// const conversation = await Conversation.find({
//   members: { $all: [receiverId, userId] },
// });
// if (!conversation) {
//   res.status(200).send([]);
// }
//     const conversationMessages = await Message.find({
//       conversationId: conversation._id,
//     });
//     const messages = conversationMessages.map(({ message }) => {
//       return message;
//     });
//     res.status(200).send(messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
