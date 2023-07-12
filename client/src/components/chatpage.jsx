import { useEffect, useRef, useState } from "react";
import { FaBell, FaSearch } from 'react-icons/fa';
import { ChatState } from '../context/chatProvider';

import { toast } from 'react-toastify';
import './chat.css';
import './chat.css';
import axios from 'axios';
import { useNavigate } from "react-router";
import EachUser from "./EachUser";

const Chatpage = () => {
  // profile page
    const { user } = ChatState();
  const [chat, setchats] = useState([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showoption, setShowoption] = useState(false);
  const [showSideDraw, setShowSideDraw] = useState(false);
  const [connecteduser,setConnectedUser]=useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const handleClick=(val)=>{
    console.log("click search")
     setShowSideDraw(val);
  }
 

  
 const SearchUser = () => {
  useEffect(() => {
    const getUsers = async () => {
      if (inputValue === '') {
        toast.warn('Please specify the name!!');
        return;
      }

      console.log(inputValue, ' is the input value');
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      try {
        const response = await axios.get(`/api/user?search=${inputValue}`, config);
        console.log('user data is', response.data);
        setConnectedUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (inputValue !== '') {
      getUsers();
    }
  }, [inputValue]);

  return (
    <div className="searchboxcomp">
      <div className="with-close">
        <div className="searchbar">
          <FaSearch />
          <input
            placeholder="Search User"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
        <button className="x-btn" onClick={() => handleClick(false)}>x</button>
      </div>
      {
        connecteduser.map((eachUser) => (
          <EachUser key={eachUser._id} user={eachUser} />
        ))
      }
    </div>
  );
};

  const navigate=useNavigate();

  const handleImageClick = (val) => {
    console.log(val)
    setShowProfileCard(val);
  };

  const Profilecard = () => {
    console.log("profilecard show");
    console.log(user.data.name);

    return (
      <div className='ProfileCard'>
        <h1>{user.data.name}</h1>
        <img src={user.data.pic} className='img2' />
        <h3>Email: {user.data.email}</h3>
        <button onClick={()=>handleImageClick(false)} className="close-btn">CLOSE</button>
      </div>
    );
  };
const logout=()=>{
  localStorage.removeItem("userInfo");
  navigate("/");
  toast(" Successfully logout...")
}
  const ProfileBox=()=>{
    return(
      <div className="profile-box">
        <button className="x-btn"  onClick={() => { handleProfileClick(false)}} >X</button>
        <div className="profile-box1">
         <button onClick={() => { handleImageClick(true); handleProfileClick(false) }}>Profile</button>
        <button onClick={logout}>Logout</button>
        </div>
      </div>
    )
  }
  const handleProfileClick=(val)=>{
    console.log("Clicked")
    setShowoption(val)
  }
  return (
    <>
      <div className="container1">
                {!showSideDraw ?  (
          <div className="searchbar">
            <FaSearch />
            <input
              placeholder="Search User"
              onClick={()=>handleClick(true)}
            />
          </div>
        ):
        <SearchUser /> 
        }
        <div  className="app-name">EASECONNECT</div>
        <div className="rightbar">
          <FaBell className="icon2" />
          <div>
            <button onClick={()=>handleProfileClick(true)}>
              <img src={user?.data?.pic} alt="userimage" className="Nav-image" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="Chat-content">
        {showoption && <ProfileBox/>}
        {showProfileCard && <Profilecard />}
      </div>
    </>
  );
};

export default Chatpage;
