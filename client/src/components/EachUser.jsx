import React from 'react'
import './chat.css'
const EachUser = ({user}) => {
  console.log(user," is detail");
  return (
    <div className='user-box'>
        <h4>{user.name}</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

    </div>
  )
}

export default EachUser