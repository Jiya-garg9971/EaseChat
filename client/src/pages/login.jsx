import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Register from './register';
 import { useNavigate, Link } from "react-router-dom";
const Login=()=>{
    let style={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto ",
        padding:"3%",
        alignContent:'center'
    }
    return(
        <div style={style}>
        <form style={{backgroundColor:"white", border:"2px solid black",padding:"20px",
    borderRadius:"5%"}}>
         <h1 style={{textAlign:'center',fontFamily:"cursive"}}>Login</h1>
            <Input style={{margin:"2px"}}  type="email"  placeholder="Email"/>
            <Input style={{margin:"2px"}}  type="password"  placeholder="Password"/>
            <button style={{margin:"20px",background:"lightcyan"}}  type="submit" >Sign In</button>
            <p> You don't have an account? <Link to="/register">Register</Link></p>
        </form>
         </div>
          

    )

}
export default Login;