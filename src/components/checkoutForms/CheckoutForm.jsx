import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Box, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const CheckoutForm = ({ appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      console.log("Stripe is not loaded. Please try again later.");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) {
     console.log("Client secret not found. Please try again.");
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success/${appointmentId}`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      navigate(`/checkout-success`);
    }

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Checkout
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={!stripe || !elements || loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <Loader size={24} /> : "Pay Now"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CheckoutForm;
























// // CheckoutForm.jsx
// import React, { useEffect, useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// //import PropTypes from "prop-types";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { bookAppointment, getAllBookings, getSingleBooking, updatePaymentMethod } from "../../feature/auth/authSlice";
// import { Search } from "@mui/icons-material";
// import Loader from "../loader/Loader";
// import CheckoutOptions from "./checkoutOptions";



// const CheckoutForm = ({appointmentId }) => {
//  // console.log("✅ appointmentId passed to CheckoutForm:", appointmentId);
 
// // const { appointmentId : paramId} = useParams();

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
  
 
//   //     const { getThisAppointment, user } = useSelector((state) => state?.auth);
//   //     console.log(`getThisAppointment is: ${JSON.stringify(getThisAppointment)}`);  
  
//   //   useEffect(()=>{
//   //     if(!appointmentId){
//   //      toast.error('No appointmentId Found')
//   //     }
//   //     dispatch(getSingleBooking(appointmentId))
//   //   }, [appointmentId, dispatch]); 
  
//   // const dispatch = useDispatch();
//     // Update payment method in Redux store


// // useEffect(()=>{
// //   if (!appointmentId) {
// //     toast.error("Appointment ID is required to proceed with payment.");
// //     return;
// //   }
// //   dispatch(getAllBookings());   
// // },[appointmentId, dispatch]); 




// // const saveBookedAppointment = async () => {
// // const today = new Date();
// // const formattedDate = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
// // const formattedTime = today.toTimeString().split(" ")[0];


// //   const appointmentData = {
// //  //   userId : user?._id.toString(),
// //  //   appointmentId: appointmentId.toString(),
// //     slotDate :getThisAppointment?.slotDate || formattedDate,
// //     slotTime: getThisAppointment?.slotTime || formattedTime, 
// //     paymentMethod : getThisAppointment?.paymentMethod ,
    
// //   };

// // await dispatch(bookAppointment(appointmentData)); 
// // navigate(`/checkout-success`); // Redirect to success page after booking

// //}
  
 


//  useEffect(()=>{
//   if(!stripe){
//     toast.error("Stripe is not loaded. Please try again later.");
//     return; 
//   }

//   const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
//   if (!clientSecret) {
//     toast.error("Client secret not found. Please try again.");
//     return;
//   }

//  },[stripe])


//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//      if (!stripe || !elements) return;

//     setLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/checkout-success/${appointmentId}`,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       toast.error(error.message);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       toast.success("Payment successful!");
//       navigate(`/checkout-success`);
//     //saveBookedAppointment();  

//     }

//     setLoading(false);
//   };
//   const paymentElementOptions = {
//     layout: "tabs"
//   }


//   return (
//     <>    
 
//     <form onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" 
//       options={
//         paymentElementOptions
         

//       }
//       />
//       <Button 
//       variant="contained"
//       color="primary"
//       type="submit" 
//       disabled={!elements ||  !stripe ||  loading }>
//         {loading ? <Box> <Loader/> </Box> : "Pay Now"}
//       </Button>
//     </form>
//     </>
//   );
// };
// // CheckoutForm.propTypes = {
// //   appointmentId: PropTypes.shape({
// //     _id: PropTypes.string.isRequired,
// //   }).isRequired,
// // };


// export default CheckoutForm;





