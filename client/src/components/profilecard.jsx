import React from 'react'
import { ChatState } from '../context/chatProvider'
import './chat.css';
const Profilecard = () => {
    console.log("profilecard show")
    const {user}=ChatState();
    
    console.log(user.data.name)
  return (
    
    <div className='ProfileCard'>
        <h1> {user.data.name}</h1>
        <img src={user.data.pic} className='img2'/>
        <h3> Email: {user.data.email}</h3>
        <button> CLOSE</button>
    </div>
  )
}

export default Profilecard