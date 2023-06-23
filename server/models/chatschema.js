import mongoose from 'mongoose';
import User  from './userSchema.js';
import Message from './messageSchema.js';
const chatModel=new mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupchat:{type:Boolean,default:false},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],
    latestMess:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    grpadmin:{
           type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },{
        timestamps:true,
    })
const chat=mongoose.model("Chat",chatModel);
export default chat;