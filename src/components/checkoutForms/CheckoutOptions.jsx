



import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";
import { FaStripe, FaPaypal } from "react-icons/fa";
import { updatePaymentMethod } from "../../feature/auth/authSlice";
  import { keyframes } from "@emotion/react";

const CheckoutOptions = () => {

  const {appointmentId } = useParams()

  const getThisAppointment = useSelector((state)=> state?.auth)
  console.log(`i am getting this data ${JSON.stringify(getThisAppointment?.paymentMethod)}`)
  //const { appointmentId  } = useParams({appointmentId:propAppointmentId});
  



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(getThisAppointment?.paymentMethod || '');

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


    console.log("appointmentId from props:", paymentMethod);
  console.log("Final appointmentId used:", appointmentId);

  useEffect(() => {
    console.log(`i have the ${appointmentId}`)
    if (!appointmentId) {
      
      toast.error("This appointment is not available");
      navigate(`/my-booking`);
    }
  }, [appointmentId, navigate]);

  const handleProceedToPayment = async () => {
    if (!paymentMethod) {
      toast.warning("Please select a payment method before proceeding.");
      return;
    }

    try {
     await dispatch(updatePaymentMethod({ appointmentId, paymentMethod })).unwrap();

      if (paymentMethod === "stripe") {
        navigate(`/checkout-stripe/${appointmentId}`);
        console.log("Navigating to:", `/checkout-stripe/${appointmentId}`);

      } else if (paymentMethod === "paypal") {
        navigate(`/checkout-paypal/${appointmentId}`);
      }
    } catch (error) {
      toast.error("Failed to update payment method: " + error);
      console.error("Dispatch error:", error);
    }
  };

  const paymentOptions = [
    {
      label: "Stripe",
      value: "stripe",
      icon: <FaStripe size={30} />,
      color: "#635BFF",
    },
    {
      label: "PayPal",
      value: "paypal",
      icon: <FaPaypal size={30} />,
      color: "#003087",
    },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Choose a Payment Method
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2, mb: 4 }}>
        {paymentOptions.map((option) => (
          <Grid item xs={12} sm={6} key={option.value}>
            <Card
              sx={{
                  animation: `${styledAnimation} 0.6s ease`,
                border:
                  paymentMethod === option.value
                    ? `2px solid ${option.color}`
                    : "1px solid #ccc",
                borderRadius: 3,
                boxShadow: paymentMethod === option.value ? 6 : 1,
                transition: "all 0.3s ease",
              }}
            >
              <CardActionArea onClick={() => setPaymentMethod(option.value)}>
                <CardContent sx={{ py: 3 }}>
                  <Box sx={{ color: option.color }}>{option.icon}</Box>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {option.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        
      </Grid>

      <Button variant="contained" size="large" onClick={handleProceedToPayment}>
        Proceed to Payment
      </Button>
    </Box>
  );
};

export default CheckoutOptions;


// CheckoutOptions.propTypes = {
//   appointmentId: PropTypes.string,
// };








