import React, { useEffect } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import Confetti from 'react-confetti';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // 🔹 Correct Link usage
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBooking } from '../../feature/auth/authSlice';

const CheckoutSuccess = () => {
  const {getThisAppointment, user  } = useSelector((state) => state?.auth)
  console.log(`my data is this ${JSON.stringify(getThisAppointment) }`)

     const dispatch = useDispatch()
      const { docId } = useParams()
      const navigate = useNavigate()
     

      // useEffect(() => {
      //   if (docId) {
      //     dispatch(getSingleBooking(docId))
      //   }
      // }, [docId, dispatch])
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        px={2}
      >
        <Stack
          spacing={3}
          alignItems="center"
          textAlign="center"
          sx={{
            maxWidth: 500,
            width: '100%',
            bgcolor: '#f9f9f9',
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="green">
            Checkout Successful!
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Thank you for booking your appointment. We’ve received your payment.
          </Typography>

          <Stack spacing={2} direction="column" width="100%">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={RouterLink}
              to="/"
            >
              Back to Home
            </Button>

            <Button
            onClick={ navigate(`/my-booking`)}
              variant="outlined"
              color="secondary"
              fullWidth
              component={RouterLink}
            //  to="/my-appointments"
            >
              View My Appointment
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CheckoutSuccess;
















// import React, {useEffect} from 'react'

// import {Button, Stack, Typography, Box, Link } from '@mui/material'
// import Confetti from 'react-confetti'
// import {useDispatch} from 'react-redux'
// //import { CLEAR_CART } from '../../feature/cart/cartSlice'

// const CheckoutSuccess = () => {

//   const dispatch = useDispatch()

// //   useEffect(()=>{
// //   dispatch(CLEAR_CART())
// //   },[dispatch])

//   return (
//     <> 
//     <Confetti
//      // width={800}
//       width={window.innerWidth}
//     />
//     <Stack
//      sx=
//      {{marginLeft: '50px',
//      marginTop:'40px'
       
//     }}
//     direction={'row'} 
    
//     spacing={2} >
//      <Stack>
//      <Typography
//      variant='h3'
//      component={'div'}
//      color={'green'}

//      >
//  Checkout Successful
//      </Typography>
//      <Typography
//      variant='body2'
//      component={'div'}
//      color={'green'}

//      >
// Thank you for your purchase
//      </Typography>
//      <Stack
   
//      >
//     <Button
//    variant='contained'
//     width='large'
//     component="button"
//   //  variant="body2"
//     sx={{
//      width:'180px',

   
//     }}
//     >
//     <Link
//       to={'/order-history'}
//       sx={{
//         whiteSpace:'nowrap',
//         underline:'none',
//         fontSize:'12px',
//        color:'white',
       
//       }}
//       >View Order Status
//       </Link>
//     </Button>
//      </Stack>
      
//      </Stack>
//       </Stack>
//       </>
//   )
// }

// export default CheckoutSuccess