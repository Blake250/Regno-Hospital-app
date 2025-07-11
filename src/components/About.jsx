import { Box, Typography, Avatar, Grid, Button } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            About Us
          </Typography>
          <Typography sx={{ lineHeight: 1.8, color: "#555" }}>
            Welcome to our platform! We are dedicated to bridging the gap
            between patients and healthcare providers by making appointment
            booking seamless and reliable. With cutting-edge technology and a
            passionate team, we aim to transform the way people access medical
            care.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/path/to/hero-image.jpg"
          alt="Healthcare illustration"
          sx={{
            width: { xs: "100%", md: "50%" },
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Mission Section */}
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Our Mission
        </Typography>
        <Typography sx={{ lineHeight: 1.8, color: "#555" }}>
          Our mission is to provide a user-friendly, trustworthy, and
          innovative platform where individuals can connect with the best
          healthcare professionals in their region. We strive to make health
          services more accessible and inclusive for everyone.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {/* Team Member 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src="/path/to/team-member-1.jpg"
                alt="Team Member 1"
                sx={{ width: "100px", height: "100px", mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Dr. Alice Johnson
              </Typography>
              <Typography sx={{ color: "#777" }}>
                Chief Medical Officer
              </Typography>
            </Box>
          </Grid>

          {/* Team Member 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src="/path/to/team-member-2.jpg"
                alt="Team Member 2"
                sx={{ width: "100px", height: "100px", mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                John Smith
              </Typography>
              <Typography sx={{ color: "#777" }}>
                Head of Development
              </Typography>
            </Box>
          </Grid>

          {/* Add more team members as needed */}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#2979ff",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Ready to Experience the Difference?
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Join us on our journey to revolutionize healthcare accessibility.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default About;












// import { Box } from "@mui/material"


// const About = () => {
//   return (
//     <Box>
//         <Box>


//         </Box>
// </Box>
//   )
// }

// export default About