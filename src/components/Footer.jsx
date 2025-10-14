import { Box, Typography } from '@mui/material';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';

const Footer = () => {
  const linkStyle = {
    '@media(max-width:768px)':{
        fontSize: '12px !important',
       },
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
    "&:hover": {
      color: '#555',
      textDecoration: 'underline',
   
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height:'100%',
     //   paddingBottom: '300px', 

      //      padding: '30px 15px',
        backgroundColor: '#f3f4f6',
        display: 'flex',
      flexGrow: '1',
        flexDirection: 'column',
        alignItems: 'center',
      
        '@media(max-width:768px)':{
          width: '95%', 
        }
      }}
    >
      {/* Content Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexGrow: '1',
          gap: '50px',
          width: '100%',
          maxWidth: '1500px',
          marginBottom: '10px',
          marginTop: '15px',
        }}
      >
        {/* Logo and Description */}
        <Box sx={{ display: 'flex' }}>
          <CenterFocusStrongRoundedIcon sx={{ fontSize: '20px', marginRight: '10px', color: '#0033cc' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#0033cc', marginBottom: '5px' }}>
              Logoipsum
            </Typography>
            <Typography sx={{fontSize: '14px', color: '#666', maxWidth: '500px', lineHeight: '1.6' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quam assumenda eos consequatur
              facere obcaecati earum voluptas fugit dolorum, voluptatibus ad nobis aut hic tempore alias.
            </Typography>
          </Box>
        </Box>

        {/* Company Links */}
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#333', marginBottom: '10px' }}>
            Company
          </Typography>
          <Typography sx={linkStyle}>Home</Typography>
          <Typography sx={linkStyle}>About Us</Typography>
          <Typography sx={linkStyle}>Contact Us</Typography>
          <Typography sx={linkStyle}>Privacy Policy</Typography>
        </Box>

        {/* Contact Info */}
        <Box>
          <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
            Get In Touch
          </Typography>
          <Typography sx={linkStyle}>+1 345 234 230</Typography>
          <Typography sx={linkStyle}>blake@gmail.com</Typography>
          <Typography sx={linkStyle}>twitterBlake@200</Typography>
        </Box>
      </Box>

      {/* Copyright Text */}
      <Typography
        sx={{
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '15px',
          width: '100%',
        }}
      >
        © 2024 Logoipsum - All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;



