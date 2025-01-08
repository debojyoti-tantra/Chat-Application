import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
   try {
      const senderId = req.id;
      const receiverId = req.params.id;
      const {message} = req.body;
      
      let gotConversation = await Conversation.findOne({
         participants:{$all : [senderId, receiverId]},
      });
      
      if (!gotConversation) {
         gotConversation = await Conversation.create({
            participants:[senderId, receiverId]
         });
      }
      
      const newMessage = await Message.create({
         senderId,
         receiverId,
         message
      });
      if (newMessage) {
         gotConversation.messages.push(newMessage._id);
      }
      
      // await gotConversation.save();
      
      // for seal time messages (socket io) we need to save "newMessage" also
      await Promise.all([gotConversation.save(), newMessage.save()]);
      
      // SOCKET IO : at the end [END GAME]
      const reciverSocketId = getReciverSocketId(receiverId);
      if (reciverSocketId) {
         // send to frontend
         io.to(reciverSocketId).emit("newMessage", newMessage);
      }
      
      return res.status(201).json({
         newMessage
      });
   } catch (error) {
      console.log(error);
   }
}

export const getMessage = async (req,res) => {
   try {
      const senderId = req.id;
      const receiverId = req.params.id;
      const conversation = await Conversation.findOne({
         participants: {$all : [senderId, receiverId]}
      }).populate("messages");    // if we don't use populate it's only give id of message but "populate" go the id of mongodb and gives the messages
      
      return res.status(200).json(conversation?.messages)
      
   } catch (error) {
      console.log(error);
   }
}