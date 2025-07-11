
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate()


  const handleNavigate = (path)=>{
    navigate(path)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    
        height: "80vh", 
        backgroundColor: "#f7f9fc", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 51, 204, 0.1)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
        }}
      >
        {/* Left Section: Text */}
        <Box
          sx={{
            flex: 1,
            paddingRight: "30px",
            textAlign: "left",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0033cc" }}>
            Book an Appointment
          </Typography>
          <Typography variant="h6" sx={{ color: "#555", mt: 1, mb: 2 }}>
            with 100+ trusted doctors
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleNavigate('/login')}
       
            sx={{
              backgroundColor: "#0033cc",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor:'pointer !important',
              transition:'transform 0.5s ease ',
              "&:hover": { backgroundColor: "#002299",
                transform:'scale(1.05)',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
               },
            }}
          >
            Create Account
          </Button>
        </Box>

        {/* Right Section: Image */}
        <Avatar
          src="./prescripto_assets/assets/assets_frontend/profile_pic.png"
          alt="Doctor Image"
          sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
















