import axios from 'axios';
import React, { useRef } from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#F0F8FF;
    width:100vw;
    height:100vh;
   font-family: 'Poppins', sans-serif;
`
const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
     margin:30px;
     width:50vw;
     height:100vh;
`
const Wrapper2=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
     
     border-radius:10px;
     width:24vw;
     min-height:30vh;
     padding:20px 40px;
     background-color:white;
`
const Heading=styled.h1`
    font-size:4rem;
    color:#1877F2;
    text-align:left;
    margin-bottom:0px;
`
const Content=styled.span`
    margin-top:0px;
    font-size:1.5rem;
    text-align:left;
`
const Input=styled.input`
    border:2px solid lightgrey;
    width:100%;
    padding:10px;
    font-size:20px;
    border-radius:10px;
    margin:10px 2px;
`
const Button=styled.button`
width:100%;
border:none;
padding:10px;
    border-radius:10px;
    background-color:#1877F2;
    color:white;
    font-size:15px;
    font-weight:bolder;
    margin:10px;
`
const Btn=styled.button`
    width:90%;
    padding:10px;
    border-radius:10px;
    background-color: #0BDA51;
    color:white;
    font-weight:bolder;
    border:none;
    font-size:15px;
`

const Form=styled.form`
    display:flex;
    min-width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const Register = () => {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordconfirm=useRef();
    const navigate=useNavigate();
   const handleSubmit = async (e) => {
        console.log("handle submit");
        e.preventDefault();    
        const user = {
            name: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        try{
            const res = await axios.post("/api/user", user);
            
            toast.success("Registeation Successfull");
        localStorage.setItem("userInfo", JSON.stringify(res));
            console.log(res);
            
            navigate("/chat");
        }
        catch(err){
            console.log(err.response.data);
            toast.warning(err.response.data);
            return;
        }
    };

  return (
    <Container>
        <Wrapper>
            {/* <Heading>Lamasocial</Heading> */}
            {/* <Content> */}
                <img src="https://du0ulnyus7r80.cloudfront.net/wp-content/uploads/2020/02/application-maintance.png"/>
            {/* </Content> */}
        </Wrapper>
        <Wrapper2>
            <Form type="submit" onSubmit={handleSubmit}>
                
            <h1 style={{fontFamily:"cursive",color:"blue"}}>EASE CHAT</h1>
                <Input type='text' placeholder='Username' ref={username}/>
                <Input type='Email' placeholder='Email' ref={email}/>
                  <Input type='password' placeholder='Password' ref={password}/>
                    <Button type="submit">
                        Sign Up
                    </Button>
                    <Link to="/login">
                    <Btn>
                       Log in with an existing account
                    </Btn>
                    </Link>
            </Form>
            </Wrapper2>
    </Container>
  )
}

export default Register;