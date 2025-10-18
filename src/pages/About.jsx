


import { Box, Typography, Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
  import { keyframes } from "@emotion/react";

const About = () => {


  const navigate = useNavigate()

const styledAnimation = keyframes`
  0% {
    transform: translateY(-5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;


  return (
    <Box
      sx={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 6,
         animation: `${styledAnimation} 0.6s ease`,
      }}
    >
      {/* Intro Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#f4f7fb",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          About Us
        </Typography>
        <Typography sx={{ color: "#555", lineHeight: 1.8, maxWidth: "800px", margin: "auto" }}>
          Welcome to our platform! Our mission is to simplify access to
          healthcare services through innovative solutions and a user-first
          approach. We’re more than a company — we’re a movement towards better
          health for everyone.
        </Typography>
      </Box>

      {/* History Section */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <Box
          component="img"
              src="./prescripto_assets/assets/assets_frontend/doc15.png"
          alt="Our history"
          sx={{
            width: { xs: "100%", md: "30%" },
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Our History
          </Typography>
          <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
            Founded in 2021, we started as a small team passionate about
            addressing the challenges in healthcare accessibility. Today, we've
            grown into a trusted platform that connects patients with top
            healthcare professionals across the country.
          </Typography>

          <Typography sx={{ color: "#555", lineHeight: 1.8, mt: 2 }}>
  At the heart of our platform lies a commitment to enhancing patient satisfaction and streamlining healthcare delivery. 
  By collaborating with experienced professionals and adopting the latest advancements, we ensure that patients receive 
  timely and effective care. Whether it's preventive consultations, diagnostics, or ongoing treatment, we are dedicated 
  to supporting healthier communities nationwide.
</Typography>


<Typography sx={{ color: "#555", lineHeight: 1.8, mt: 2 }}>
  As we continue to expand, our focus remains on empowering individuals to take charge of their health and well-being 
  through easy access to expert advice and services. Join us as we redefine healthcare accessibility for a better future.
</Typography>
        </Box>
      </Box>

      {/* Vision Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#eaf5fc",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Our Vision
        </Typography>
        <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
          To revolutionize the healthcare industry by leveraging technology and
          providing seamless solutions that empower individuals to take control
          of their health journey.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
          Meet the Team
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src="./prescripto_assets/assets/assets_frontend/doc14.png"
                alt="Team Member 1"
                sx={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  mb: 2,
                  backgroundColor:'#3333ff',
                  padding:'25px',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Dr. Sarah Lee
              </Typography>
              <Typography sx={{ color: "#777" }}>CEO & Founder</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src="./prescripto_assets/assets/assets_frontend/doc12.png"
                alt="Team Member 2"
                sx={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  mb: 2,
                  backgroundColor:'#3333ff',
                  padding:'25px',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                James Brown
              </Typography>
              <Typography sx={{ color: "#777" }}>Lead Developer</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                    src="./prescripto_assets/assets/assets_frontend/doc13.png"
                alt="Team Member 3"
                sx={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  mb: 2,
                  backgroundColor:'#3333ff',
                  padding:'25px',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Emily Carter
              </Typography>
              <Typography sx={{ color: "#777" }}>Operations Manager</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#2979ff",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Ready to Partner with Us?
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Discover how we can make healthcare simple and accessible for you.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ padding: "10px 20px", fontWeight: "bold" }}
        onClick={()=>navigate('/contact')}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default About;



