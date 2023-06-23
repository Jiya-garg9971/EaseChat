import { useEffect, useState } from "react"
import axios from 'axios'
const Chatpage=()=>{
    const [chat,setchats]=useState([]);
    const url="/api/chat";
    const fetchChats=async()=>{
        const {data}=await axios.get(url);
         console.log(data);
        setchats(data);
    }
    useEffect(()=>{
        fetchChats();
    },[]);
    return(
        <div>
            {chat.map(c=>
                (<div key={c._id}> {c.chatName}</div>))
            }
        </div>
    )
}
export default Chatpage;