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
            toast('Please fill in the details ');   
            setloading(false);
           return ; 
        }
        console.log(name, email, password, pic);
        try{
            const config={
                headers:{"Content-Type":"application/json",},
            };
             console.log("test-");
            const {data}=await axios.post("/api/user",{name,email,password,pic},config);
            
             console.log("test1");
          //  localStorage.setItem("userInfo",JSON.stringify(data));
            
             console.log("test2");
            toast("registration successful");
            
             console.log("test4");
             navigate("/chat");
             console.log("navigated");
        }
        catch(error){
            console.log(error.message);
            toast("Error occured");
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
            <ToastContainer/>
            <form style={{backgroundColor:"white", border:"2px solid black",padding:"20px",
    borderRadius:"5%"}}>
            <h1 style={{textAlign:'center',fontFamily:"cursive"}} >Welcome</h1>
            <Input style={{margin:"2px"}}  type="name"  placeholder="Name" onChange={(e)=>{console.log(e.target.value); setname(e.target.value)}}/>
            <Input style={{margin:"2px"}}  type="email"  placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}/>
            <Input style={{margin:"2px"}}  type="password"  placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
            <input style={{margin:"2px",display:"none"}}  type="file" accept='image/' id="image" onChange={(e)=>postdetails(e.target.files[0])}/>
            <label htmlFor="image" style={{display:"flex",color:"cyan"}}><img style={{width:"30px",height:"30px",borderRadius:"20%",padding:"0 2px"}} src="https://media.gettyimages.com/vectors/camera-vector-illustration-vector-id466881028?b=1&k=6&m=466881028&s=170x170&h=EikGCs9NUn4pIBLV3ljW3ImXkbb0TK8hnI_dfI92E9Y=" alt='img'></img> Add an avatar</label>
            <button style={{margin:"10px auto 10px auto ",display:"flex",flexDirection:"column",alignItems:"center",background:"cyan"}} onClick={submitHandler} >Sign Up</button>
             <p> You do have an account?  <Link to="/Login">Login</Link></p>           
            </form>
           <ToastContainer position="top-center" autoClose={100000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
         </div>
    )   
};
export default Register;