import generateToken from "../database/token.js";
import asyncHandler from "express-async-handler";  //PACKAGE
 import User from "../models/userSchema.js";
const Registeruser=asyncHandler(async (req,res)=>{  
    // console.log("register user"); 
    const {name,email,password,pic}=req.body;
    if(!name || !password || !email){
        console.log("test 2"); 
        res.status(400).json("PLEASE ENTER ALL DETAILS");
        return;
    }
    const userExist =await User.findOne({email}); 
    if(userExist){
        res.status(400).json("User already registered");
        return;
    } 
    // await User.deleteMany({});
    const newuser=new User({name,email,password,pic});
    await newuser.save() 
    console.log(newuser);
    if(newuser){
        return res.status(201).json({
            _id:newuser._id,            
            name:newuser.name,
            email:newuser.email,
            token:generateToken(newuser._id),
            pic:newuser.pic
        });
        console.log(">>>>>done");
    }
    else{
        res.status(400).json("Failed to create user");
    }
})

const authdetails=async(req,res)=>{
    console.log("authenticate user"); 
    const {email,password}=req.body;
    const userexist=await User.findOne({email});
    console.log(userexist);
    if(userexist){ //verify whether password is also same by decrypting it.
        res.status(200).json({
           _id:userexist._id,
            name:userexist.name,
            email:userexist.email,
            token:generateToken(userexist._id),
            pic:userexist.pic
        })
    }
    else{
        console.log("t1")
        res.status(401).json("Failed to login");
        console.log("t2")
    }
}
const allUsers=asyncHandler(async(req,res)=>{
    console.log("get all user"); 
    const keyword=req.query.search?{
        $or :[
            {name:{$regex:req.query.search,$options:"i"}}, {email:{$regex:req.query.search,$options:"i"}},
        ],
    }:{};
     console.log(keyword);
    const users=await User.find(keyword).find({ _id: { $ne: req.user?._id } }); // yahan kuch garbad h in _id (? put karne par garbad resolve ho gyi)
    res.send(users);
    console.log(keyword);
});
export {Registeruser,authdetails,allUsers};