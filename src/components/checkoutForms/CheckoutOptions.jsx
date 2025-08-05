











import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import { toast } from "react-toastify";
import { FaStripe, FaPaypal } from "react-icons/fa";
import { updatePaymentMethod } from "../../feature/auth/authSlice";
import Loader from "../loader/Loader";

const CheckoutOptions = () => {
  const { appointmentId } = useParams();
  const { getThisAppointment, isLoading, isError, message } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  console.log("appointmentId from useParams:", appointmentId);
  console.log("getThisAppointment:", JSON.stringify(getThisAppointment));


  
useEffect(() => {
  if (!appointmentId) {
    toast.error("Invalid appointment ID");
    navigate("/my-booking");
    return;
  }

  if (!isLoading && !isError) {
    if (!getThisAppointment || getThisAppointment?._id !== appointmentId) {
      toast.error("Appointment not found");
      navigate("/my-booking");
    }
  }
}, [appointmentId, getThisAppointment, isLoading, isError, navigate]);




  const handleProceedToPayment = async () => {
    if(!appointmentId){
      toast.error("Appointment not found");
    navigate("/my-booking");
    return

    }
    if (!paymentMethod) {
      toast.warning("Please select a payment method before proceeding.");
      return;
    }

    try {
      await dispatch(updatePaymentMethod({ appointmentId, paymentMethod })).unwrap();
      toast.success("Payment method updated successfully");
      if (paymentMethod === "stripe") {
        navigate(`/checkout-stripe/${appointmentId}`);
        console.log("Navigating to:", `/checkout-stripe/${appointmentId}`);
      } else if (paymentMethod === "paypal") {
        navigate(`/checkout-paypal/${appointmentId}`);
        console.log("Navigating to:", `/checkout-paypal/${appointmentId}`);
      }
    } catch (error) {
      toast.error(`Failed to update payment method: ${error}`);
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
    <>
      {isLoading && <Loader />}
    
      <Box sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Choose a Payment Method
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2, mb: 4 }}>
          {paymentOptions.map((option) => (
            <Grid item xs={12} sm={6} key={option.value}>
              <Card
                sx={{
                  border: paymentMethod === option.value ? `2px solid ${option.color}` : "1px solid #ccc",
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
    </>
  );
};

export default CheckoutOptions;




