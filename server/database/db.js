import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connection=async()=>{
    const password=process.env.Password;
    const Modulename=process.env.Modulename;
    const url=`mongodb+srv://${Modulename}:${password}@cluster0.wefkhsd.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await mongoose.connect(url);
       console.log("mongoose connnected");
    }
    catch(e){
        console.log(e.message);
    }
}
export default connection;