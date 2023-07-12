import { useNavigate } from "react-router";
import Register from "../pages/register";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from "react";
import Login from "../pages/login";
const Home=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        const userDetails=JSON.parse(localStorage.getItem("userInfo"));
        if(userDetails){
            console.log(userDetails)
            navigate("/chat");
        }
    },[navigate])
    return(
        <>
        <Login/>
        </>
    )
}
export default Home;