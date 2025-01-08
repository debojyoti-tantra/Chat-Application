import {Server} from "socket.io";
import http from "http";
import express from "express";

import dotenv from "dotenv";
dotenv.config({}); 

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      // origin: ["http://localhost:5173"],
      origin: process.env.FRONTEND_URI,
      methods: ['GET', 'POST'],
      
   },
});

// SOCKET IO
export const getReciverSocketId = (receiverId) => {
   return userSocketMap[receiverId];
}

const userSocketMap = {}; // make a object i.e, {userId (key) --> socketId (value)} 

io.on('connection', (socket) => {
   console.log('user connected', socket.id);
   
   // recive data from frondend
   const userId = socket.handshake.query.userId;
   
   if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
   }
   
   // by emit you can send data to FRONTEND
   io.emit('getOnlineUsers', Object.keys(userSocketMap));
   
   socket.on('disconnect', () => {
      console.log('user disconnect', socket.id);
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
   })
});

export {app, io, server};