
import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          color="error"
          fontWeight={700}
          gutterBottom
        >
          404
        </Typography>

        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4 }}
        >
          It looks like the page you're trying to reach doesn’t exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: '30px',
            boxShadow: 3,
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;














// import { Box, Typography } from '@mui/material'
// import React from 'react'
// import { Link } from 'react-router-dom'

// const ErrorPage = () => {
//   return (
//     <Box
//     sx={{
//         width:'100%',
//         height:'100%'
//     }}
    
//     >
//       <Box
//      sx={{
//         display:'flex',
//         justifyContent:'center',
//         flexDirection:'column',
//         alignItems:'center',
//          marginTop:'100px'
     

//      }}

//       >
// <Typography
// sx={{
//     fontSize:'14px',
//     textAlign:'center',
//     textTransform:'capitalize',
//     color:'green',
//     fontWeight:'14px',

// }}
// >
//     Page Not Found
// </Typography>
// <Typography>
//   It Looks Like The Page You Are Looking For Can Not Be Found
// </Typography>
// <Link
// to={'/'}
// >
// <Typography>
//  Back To Home
// </Typography>
// </Link>

//       </Box>
//         </Box>
//   )
// }

// export default ErrorPage