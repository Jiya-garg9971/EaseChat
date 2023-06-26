import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const generateToken=(id)=>{
    console.log(process.env.JWT_secret);
    const token=jwt.sign({id},process.env.JWT_secret,{expiresIn:"30d"});
    console.log(token);
    return token;
}
export default generateToken;