import { createContext,useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
const chatContext=createContext();
const ChatProvider=({children})=>{
    const navigate=useNavigate();
    const [user,setuser]=useState();
    useEffect(()=>{
        const userDetail=JSON.parse(localStorage.getItem("userInfo"));
        setuser(userDetail);
        console.log(userDetail," userdetails")
        if(!userDetail){
            navigate("/")
        }
    },[navigate])
    return <chatContext.Provider value={{user,setuser}}>{children} </chatContext.Provider>
}
export const ChatState=()=>{
    return useContext(chatContext);
}
export default ChatProvider;