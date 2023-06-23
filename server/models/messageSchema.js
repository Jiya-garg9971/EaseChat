import mongoose from 'mongoose';
import User from './userSchema.js';
const msgSchema=new mongoose.Schema({
sender:{
    type:mongoose.Schema.Types.ObjectId,trim:true,ref:"User",
}
,content:{
type:String,trim:true
},
chat:{
type:mongoose.Schema.Types.ObjectId,ref:"User",
}

},{timestamps:true})
const Message=mongoose.model("Message",msgSchema);
export default Message;