import FormControl from '@mui/joy/FormControl';

import { ToastContainer, toast } from 'react-toastify';
import Input from '@mui/joy/Input';
import Register from './register';
 import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
const Login=()=>{
    let style={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto ",
        padding:"3%",
        alignContent:'center'
    }
    const navigate=useNavigate();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [loading,setloading]=useState(false);
    const submitHandler=async()=>{
        console.log("handing submit");
        setloading(true);
        if( !email || !password){
            toast.warning('Please fill in the details', {
            position: 'top',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setloading(false);
           return ; 
        }
        console.log(email+" ---------"+ password);
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            console.log('test-');
            console.log('test-');console.log('test-');console.log('test-');console.log('test-');console.log('test-');
            const { data } = await axios.post('/api/user/login', { email, password }, config);
            console.log(data);
            console.log('test1');
            localStorage.setItem('userInfo', JSON.stringify(data));
            console.log('test2');
            toast.warning('login SUCCESSFUL', {
            position: 'top',
            autoClose: 12000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            console.log('test4');
             navigate('/chat');
            console.log('navigated');
    } catch (error) {
            console.log(error.message);
             toast.error('Error Occurred', {
            position: 'top-right',
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    };
    return(
        <div style={style}>
        <form style={{backgroundColor:"white", border:"2px solid black",padding:"20px",
    borderRadius:"5%"}}>
         <h1 style={{textAlign:'center',fontFamily:"cursive"}}>Login</h1>
            <Input style={{margin:"2px"}}  type="email"  placeholder="Email" onChange={(e)=>{console.log(e.target.value); setemail(e.target.value)}}/>
            <Input style={{margin:"2px"}}  type="password"  placeholder="Password" onChange={(e)=>{console.log(e.target.value); setpassword(e.target.value)}}/>
            <button style={{margin:"20px",background:"lightcyan"}}  type="submit" onClick={submitHandler} >Sign In</button>
            <p> You don't have an account? <Link to="/register">Register</Link></p>
        </form>
         </div>
          

    )

}
export default Login;