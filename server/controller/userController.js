import generateToken from "../database/token.js";
import asyncHandler from "express-async-handler";  //PACKAGE
 import User from "../models/userSchema.js";
const Registeruser=asyncHandler(async (req,res)=>{   
    const {name,email,password,pic}=req.body;
    if(!name || !password || !email){
        res.status(400);
        throw new Error("PLEASE ENTER CORRECT DETAILS");
    }
    const userExist =await User.findOne({email});
    if(userExist){
        res.status(400);
         throw new Error("User already registered");
    }
    const newuser=new User({name,email,password,pic});
    newuser.save()
    // .then(() => console.log('User saved successfully'))
    // .catch((error) => {
    //     if (error.code === 11000) {
    //         console.log(email);
    //     throw new Error('Email address already in use');
    //     } else {
    //     throw new Error(error);
    //     }
    // });
    console.log(newuser);
    if(newuser){
        res.status(201).json({
            _id:newuser._id,            
            name:newuser.name,
            email:newuser.email,
            token:generateToken(newuser._id),
            pic:newuser.pic
        });
    }
    else{
        res.status(400);
        throw new Error("Failed to create user")
    }
})

const authdetails=async(req,res)=>{
    const {email,password}=req.body;
    const userexist=User.findOne({email});
    if(userexist){ //verify whether password is also same by decrypting it.
        res.json({
           _id:userexist._id,
            name:userexist.name,
            email:userexist.email,
            token:generateToken(userexist._id),
            pic:userexist.pic
        })
    }
    else{
        res.status(400);
        throw new Error("Enter correct details");
    }
}
const allUsers=asyncHandler(async(req,res)=>{
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