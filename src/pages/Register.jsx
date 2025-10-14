
import { Box, Button, Typography, TextField, Paper, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import{ useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import { validateEmail } from "../../util";
import { register, RESET_AUTH } from "../feature/auth/authSlice";
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {IconButton,InputAdornment } from "@mui/material";
import Loader from "../components/loader/Loader";



const Register = () => {
//  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
   const {message, isLoading, isSuccess, isError} = useSelector((state)=> state?.auth)
  //console.log(`loading is ${isLoading} $ is isloggedin is ${isLoggedIn} `)



  
useEffect(() => {
  if (isError) {
    // If the backend says the user already exists
    if (message && message.toLowerCase().includes("exists")) {
      toast.error("You already have an account. Please log in.");
      navigate("/login");
    } else {
      toast.error(message || "Registration failed");
    }
    dispatch(RESET_AUTH());
  }

  if (isSuccess) {  
    toast.success("Registration successful. Please log in.");
    navigate("/login");
 //   dispatch(RESET_AUTH());
  }
}, [isError, isSuccess, message, dispatch, navigate]);




  const handleTogglePassword = ()=>{
    setShowPassword((prev)=> !prev)
  }
  



const registerUser = (async(e)=>{
  e.preventDefault()
if(!name || !email || !password){
   toast.error(`invaLid login details`) 
 return 
}
if(!validateEmail(email)){
  toast.error(`invalid Email`)
  return 
}

if(password.length < 6){
  toast.error(`password  must not be less than 6`)
  return 
  
} 

try{
const userData = {name, email, password}
 await dispatch(register(userData))

 // toast.success( 'registration is successful')
   navigate("/login");



}catch(error){
  toast.error(error.message || "Registration failed");
}

})






  return (
    <>  
    {isLoading && <Loader/>}
    <Box
    
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('./prescripto_assets/assets/assets_frontend/about_image.png')",
     backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      overflow: "hidden",
    }}
    > 
  

   
    
    
      {/* Semi-transparent container for the form */}
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          
            Create Account
          </Typography>
          <Typography sx={{ mt: 1, color: "#616161" }}>
         
            Sign up to get started
          </Typography>
        </Box>


        <Box
       onSubmit={registerUser}
       component="form" 
           >
          {/* {state === "Sign Up" && (   )} */}
            <Box 
            
            sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Full Name</Typography>
              <TextField
                label="Enter your name"
                variant="outlined"
                fullWidth
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
        

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Email Address</Typography>
            <TextField
              label="Enter your email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

          
            />
          </Box>

          <Box
          
          sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Password</Typography>
            <TextField
              label="Enter your password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              InputProps={{
                endAdornment :(
              <InputAdornment position="end">
            
            <IconButton
            sx={{
              border:'none !important',
              outline: 'none  !important'
            }}
            onClick={handleTogglePassword}  edge='end'>
            {showPassword ? <VisibilityOff/>  : <Visibility/> }
            </IconButton>
              
              
              </InputAdornment>
                )
              }}
            />
          </Box>

          <Button
       
          type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              textTransform: "capitalize",
              fontWeight: "bold",
            border:'none !important',
              outline:'none !important'
            }}
          >
         
            Register
   
          </Button>
        </Box>
       
  <Box
  sx={{
    fontSize:'12px !important',
    color:'blue',
    display:'flex',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    padding:'10px'
   // flexDirection:'column'

  }}
  >
  <Typography
  sx={{fontSize:'14px'}}>
Already have an account?
</Typography>
  <Link  to={'/login'} >
  <Typography
   sx={{fontSize:'14px', paddingLeft:'4px'}}
  >
  Login
   </Typography>
  </Link>
  </Box>


      </Paper>
   
    </Box>
    </>
  );
};

export default Register;




















