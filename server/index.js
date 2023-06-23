import express from "express";
import {chats} from "./data/data.js"
import cors from "cors";
import  connection  from "./database/db.js";
import dotenv from "dotenv";
import Path from "./routes/userRoutes.js";
import  { errorHandler, notFound } from "./errorhandler/error.js";
import router from "./routes/chatRoutes.js";
import protect from "./errorhandler/authentication.js";
const app=express();
app.use(express.json());
dotenv.config();
const Port_NO=process.env.PORT_NO ||4800;
app.use(cors());
connection();
app.use("/api/user",Path);
 app.use("/api/chat",protect,router);
app.get("/",(req,res)=>{
        res.send("hello");
});
app.get("/chat",(req,res)=>{
        res.send(chats);
});

app.use(notFound);
app.use(errorHandler);
// app.get("/api/chat/:id",(req,res)=>{
//    const reqid=req.params.id; //eg :-  http://localhost:4800/api/chat/617a518c4081150016472c78
//    const singlechat=chats.find((c)=>c._id===reqid);
//         res.send(singlechat);
// });
app.listen(Port_NO,()=>{
    console.log("server created successfully");
})