import Input from '@mui/joy/Input';
import Login from './login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";
import { useState,useEffect } from 'react';
const Register=()=>{
   // console.log("hey");
    let styles={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto ",
        padding:"3%",
        alignContent:'center'
    }   
    const navigate=useNavigate();
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [loading,setloading]=useState(false);
    const [pic,setpic]=useState();
    const submitHandler=async()=>{
        console.log("handing submit");
        setloading(true);
        if(!name || !email || !password){
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
        console.log(name, email, password, pic);
        try{
            const config={
                headers:{"Content-Type":"application/json",},
            };
             console.log("test-");
            
            const data=await axios.post("/api/user/",{name:name,email:email,password:password,pic:pic},config);
             toast.warning('waiting for submission', {
            position: 'top',
            autoClose: 12000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            // console.log("data is",data);
             console.log("test1");
        
          //  localStorage.setItem("userInfo",JSON.stringify(data));
            
             console.log("test2");
           toast.warning('REGISTRATION SUCCESSFUL', {
            position: 'top',
            autoClose: 12000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            
             console.log("test4");
             navigate("/chat");
             console.log("navigated");
        }
        catch(error){
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
    const postdetails=async(pic)=>{
        console.log(pic);
        if(pic.type==="image/jpeg" || pic.type==="image/png"){
            const data=new FormData();  //to deal with the form
            data.append("file",pic);
            data.append("upload_preset","chatapp");
            data.append("cloud_name","dtqwwb1ou");
           await fetch("https://api.cloudinary.com/v1_1/dtqwwb1ou/image/upload",{method:"post",body:data,}).then((res)=>res.json()).then(data=>{
                console.log(data.url);
                setpic(data.url.toString());
                setloading(false);
           })
            .catch((err)=>{
                console.log(err);
                setloading(false);
            });
            console.log("photo uploaded");
        }
        else{
           console.log("wrong image selected");
            toast("their is an error while selecting the image");
            setloading(false);
            return ;
        }
    }
    return(
        <div style={styles}>
            <form style={{backgroundColor:"white", border:"2px solid black",padding:"20px",
    borderRadius:"5%"}}>
            <h1 style={{textAlign:'center',fontFamily:"cursive"}} >Welcome</h1>
            <Input style={{margin:"2px"}}  type="name"  placeholder="Name" onChange={(e)=>{console.log(e.target.value); setname(e.target.value)}}/>
            <Input style={{margin:"2px"}}  type="email"  placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}/>
            <Input style={{margin:"2px"}}  type="password"  placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
            <input style={{margin:"2px",display:"none"}}  type="file" accept='image/' id="image" onChange={(e)=>postdetails(e.target.files[0])}/>
            <label htmlFor="image" style={{display:"flex",color:"cyan"}}><img style={{width:"30px",height:"30px",borderRadius:"20%",padding:"0 2px"}} src="https://media.gettyimages.com/vectors/camera-vector-illustration-vector-id466881028?b=1&k=6&m=466881028&s=170x170&h=EikGCs9NUn4pIBLV3ljW3ImXkbb0TK8hnI_dfI92E9Y=" alt='img'></img> Add an avatar</label>
            <button style={{margin:"10px auto 10px auto ",display:"flex",flexDirection:"column",alignItems:"center",background:"cyan"}} onClick={submitHandler} >Sign Up</button>
             <p> You do have an account?  <Link to="/login">Login</Link></p>           
            </form>
         </div>
    )   
};
export default Register;