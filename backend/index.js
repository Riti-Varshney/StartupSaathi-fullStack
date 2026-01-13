import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/newRoutesFounder.js';
import mentorRoutes from "./routes/newRoutesMentor.js";
import chatRoutes from './routes/newChatRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import cors from 'cors';
import http from "http";
import { Server } from "socket.io";
import initSocket from "./socket.js";


dotenv.config();
const port = process.env.PORT || 5000;

let app=express();
app.use(cors({
origin:["http://localhost:5173","http://localhost:5174"],
credentials:true
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/match", matchRoutes);
const server = http.createServer(app); 

// SOCKET.IO SERVER
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});


// Initialize Socket Logic
initSocket(io);

server.listen(port, () => {
  console.log("Server running on " + port);
  connectDb();
});
