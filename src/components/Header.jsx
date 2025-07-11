
//import React from 'react'
import { Box, Typography, Button } from "@mui/material";
//import { useSelector } from "react-redux";


const Header = () => {
//const {isLoggedIn, user, isSuccess } = useSelector((state)=>state?.auth)
  

  return (
    // <> { user ? ('') : (
   
    
    <Box
   
      sx={{
        width: '100%',
        height: '100vh',
     
       backgroundImage: 'url(./prescripto_assets/assets/assets_frontend/header_img.png)',  // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media(max-width:768px)': {

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          textAlign: 'center',
          width: '97%',
          height: '100vh', 
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
         
          padding: '20px',
          borderRadius: '8px',
          width: '80%',
          '@media(max-width:768px)': {
            width: '90%', 
          }
        }}
      >

        <Box>
          <Typography variant="h4" color="white" gutterBottom>
            Book An Appointment With Trusted Doctors
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            color: 'white',
            fontSize: '13px',
            paddingLeft: '10px',
          }}
        >
          <img
            src="./prescripto_assets/assets/assets_frontend/group_profiles.png"
            alt=""
            style={{ width: '100px' }}
          />
          <Typography>
            Simply browse through our extensive list of trusted doctors.
            <br />
            <span>Schedule An Appointment Today</span>
          </Typography>
        </Box>
    <a href="#specialty">
        <Button
      
          
          variant="contained"
          color="warning"
          sx={{
            color: 'white',
            fontSize: '14px',
            borderRadius: '50px',
            paddingX: '16px',
            paddingY: '8px',
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            marginTop: '16px', 
          }}
        >
          Book Appointment
          <img
            src="./prescripto_assets/assets/assets_frontend/arrow_icon.svg"
            alt=""
            style={{ marginLeft: '8px', width: '16px', height: '16px' }}
          />
        </Button>
        </a>
        
      </Box>
    </Box> 
  
//     )   
// }
//     </>
  );
}

export default Header;



