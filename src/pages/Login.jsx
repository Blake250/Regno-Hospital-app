import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import {  Link,  useNavigate } from "react-router-dom";
import{ useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import { validateEmail } from "../../util";
import {getLoginStatus, getUser, login, RESET_AUTH, setUser } from "../feature/auth/authSlice";
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {IconButton,InputAdornment } from "@mui/material";
import Loader from "../components/loader/Loader";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
   const {isLoading, isSuccess, isError, message, isLoggedIn } = useSelector((state)=> state?.auth)
  // const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  
   const user = useSelector((state)=> state?.auth?.user)  
  console.log(`loading is ${isLoading} ${isLoggedIn} is ${user} `)
//  const storedUserDetails = useSelector((state)=> state?.auth?.storedUserDetails)
 //  console.log(`here we have the updated date like this ${JSON.stringify(storedUserDetails) }`)

  
useEffect(() => {
  if (isError) {
    toast.error(message || "Login failed");
    dispatch(RESET_AUTH());
  }


  if (isSuccess) {
    toast.success(message || "Login successful");
    dispatch(getUser());
  }
}, [isError, isSuccess, message, dispatch]);


const styledAnimation = {
  '@keyframes slide-down': {
      '0%': {
        transform: 'translateY(-5rem)', 
      opacity: 0, 
      },
      '100%': {
        transform: 'translateY(0)', 
        opacity: 1, 
      },
    },
}



const loginUser = async (e) => {
  e.preventDefault();
  if (!email || !password) return toast.error("Please fill all fields");
  if (!validateEmail(email)) return toast.error("Invalid email");
  if (password.length < 6) return toast.error("Password too short");

  try {
    const userData = { email, password };
    const user = await dispatch(login(userData)).unwrap();
    dispatch(setUser(user));
    localStorage.setItem("profile", JSON.stringify(user));
    toast.success("Login successful!");
    navigate("/");
  } catch (err) {
    toast.error(err?.message || "Login failed");
  }
};










  

  const handleTogglePassword = ()=>{
    setShowPassword((prev)=> !prev)
  }



  return (

    <>  
    {isLoading  && <Loader/>}
    <Box
      sx={{
        styledAnimation,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "88vh",
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
          animation: 'slideDown 0.6s ease',
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 ,
          
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          
           
           Already have an account?
          </Typography>
          <Typography sx={{ mt: 1, color: "#616161" }}>
         
         Sign in Now!!!
          </Typography>
        </Box>


        <Box
       onSubmit={loginUser}
       component="form" 
           >
          
        

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
               outline: 'none  !important',
            }}
          >
         
         Login
   
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
      Don't have an account?
      </Typography>
        <Link  to={'/register'} >
        <Typography
      
         sx={{fontSize:'14px', paddingLeft:'4px'}}
       
        >
      
         Register
         </Typography>
        
         </Link>
        </Box>
      
      </Paper>
    </Box>
    </>
  );
};

export default Login;









