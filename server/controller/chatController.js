import asyncHandler from 'express-async-handler';
import chat from '../models/chatschema.js';
import User from '../models/userSchema.js';
const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("User id params not sent with request");
        return res.sendStatus(400);
    }
    var isChat=await chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$elemMatch:{$eq:req.userId}}}},
        ],
    }).populate("users","-password").populate("latestMess");

    isChat=await User.populate(isChat,{
        path:"latestMess.sender",
        select:"name pic email"
    });
    if(isChat.length>0)res.send(isChat[0]);
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try{
            const createdChat=await chat.create(chatData);
            const FullChat=await chat.findOne({_id:createdChat._id}).populate("users","-password");
            res.status(200).send(FullChat);
        }
        catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
});
const fetchChat=asyncHandler(async(req,res)=>{
    try{
        chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("grpadmin").populate("latestMess").sort({updatedAt:-1}).then(
            async(results)=>{results=await User.populate(results,{
                path:"latestMess.sender",
                select:"name pic email"
            })}
        )
        res.status(200).send(results);
        }
        catch(error){
            res.status(400);
            throw new Error(error.message);
        }
});
export {accessChat,fetchChat};