import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from "path";

dotenv.config({});

// const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

// to passing data in json use middlewire
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
   origin:`${process.env.FRONTEND_URI}`,
   credentials:true
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);  // http://localhost:8080/api/v1/user/register or login ....
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get('*', (req, res) => {
   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, ()=>{
   connectDB();
   console.log(`server listen at port http://localhost:${PORT}`);
});