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
            {users:{$elemMatch:{$eq:req.user._id}}}, //bearer token ke through
            {users:{$elemMatch:{$elemMatch:{$eq:req.userId}}}}, //request body ke through
        ],
    }).populate("users","-password").populate("latestMess");

    isChat=await User.populate(isChat,{
        path:"latestMess.sender",
        select:"name pic email"
    });
    console.log(isChat+" is the chat");
    if(isChat.length>0)res.send(isChat[0]);
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId], 
        };
        console.log("CHATDATA IS,....",chatData);
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
const createGrpChat=asyncHandler(async(req,res)=>{
    console.log("chat creation")
    if(!req.body.user || !req.body.chatName){
        console.log("user not found");
        return res.status(300).send("Please fill all the details");
    }
    try{
        var users=JSON.parse(req.body.user);
        if(users.length<2){
            console.log("lessss than 2 users");
            res.status(300).send("Please add more people in order to form the group");
        }
        users.push(req.user);
        const groupChat=await chat.create({
            chatName:req.body.chatName,
            isGroupchat:true,
            users:users,
            grpadmin:req.user
        })
        console.log(groupChat)
        const FullChat=await chat.find({_id:groupChat._id}).populate("users","-password").populate("grpadmin","-password");
        res.status(200).json(FullChat);        
    }
    catch(error){
        console.log(error);
        res.status(400);
        throw new Error(error.message);
    }
})
const renameGrp = asyncHandler(async (req, res) => {
    console.log("rename user")
    const { chatId, chatName } = req.body;
    const updatedChat = await chat.findByIdAndUpdate(chatId, { chatName }, { new: true }).populate("users","-password").populate("grpadmin","-password"); ;
    if(updatedChat){
        res.status(200).send(updatedChat);
    }
    else {
        res.status(400).send("updation failed")
    }
    res.json(updatedChat);
});
const addToGrp=asyncHandler(async(req,res)=>{
    if(!req.body.chatId || !req.body.userId){
        console.log("please fill all details");
        res.status(400).send("Please fill all the details");
    }
    const {chatId,userId}=req.body;
    const addmember=await chat.findByIdAndUpdate(chatId,{$push:{users:userId}},
        { new: true }).populate("users","-password").populate("grpadmin","-password"); 
     if(addmember){
        res.status(200).send(addmember);
    }
    else {
        res.status(400).send("updation failed")
    }
    res.json(addmember);
})
const removeFromGrp=asyncHandler(async(req,res)=>{
    console.log("remove user")
if(!req.body.chatId || !req.body.userId){
        console.log("please fill all details");
        res.status(400).send("Please fill all the details");
    }
    const {chatId,userId}=req.body;
    const addmember=await chat.findByIdAndUpdate(chatId,{$pull:{users:userId}},
        { new: true }).populate("users","-password").populate("grpadmin","-password"); 
     if(addmember){
        res.status(200).send(addmember);
    }
    else {
        res.status(400).send("updation failed")
    }
    res.json(addmember);
})
export {accessChat,fetchChat,createGrpChat,renameGrp,addToGrp,removeFromGrp};