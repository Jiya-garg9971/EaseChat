import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const generateToken=(id)=>{
    const token=jwt.sign({id},process.env.JWT_secret,{expiresIn:"30d"});
    console.log(token);
    return token;
}
export default generateToken;