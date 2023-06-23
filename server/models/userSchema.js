import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    name:{
        type:String,trim:true,
    },
    email:{
        type:String,trim:true,
    },
    password:{
        type:String,trim:true,
    },
    pic:{
        type:String,
        required:true,
        default:'https://cdn.picpng.com/person/person-individually-alone-icon-49284.png',
    }
    },{timestamps:true});

    userSchema.pre('save',async function (next){
        if(!this.isModified)next();
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
    })
const User=mongoose.model("User",userSchema);
export default User;