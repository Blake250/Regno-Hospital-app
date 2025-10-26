
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBooking } from '../../feature/auth/authSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const CheckoutWithPaypal = () => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { isLoading, getThisAppointment, user } = useSelector((state) => state?.auth);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (docId) {
      dispatch(getSingleBooking(docId));
    }
  }, [docId, dispatch]);
  const appointmentId = docId ||  getThisAppointment._id

  const initialOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb:'15px',
          px: 2,
        }}
      >
        <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: "100%", textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Pay with PayPal
          </Typography>

          {isLoading ? (
            <CircularProgress />
          ) : getThisAppointment ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Amount to Pay: <strong>${getThisAppointment?.amount || '10.00'}</strong>
              </Typography>

              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: getThisAppointment?.amount?.toString() || "10.00",
                        },
                      },
                    ],
                  });
                }}
             

                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order.capture();
                    const orderID = data.orderID;
                    toast.success("Payment successful!");
                
                    // Send orderID and appointmentId to your backend for verification
                  //  const res = await fetch(`https://regno-hospital-api.onrender.com/api/payment/paypal-verify/${appointmentId}`, {
                    const res = await fetch(`${BACKEND_URL}/api/payment/paypal-verify/${appointmentId}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      credentials: 'include', // include cookies if needed
                      body: JSON.stringify({
                        orderID,
                     //  appointmentId: appointmentId,
                      }),
                    });
                
                 
                 const result = await res.json();
                
                    if (!result.ok) {
                    //  throw new Error(result.message || "Payment verification failed");
                    toast.error(result.message || "Payment verification failed");
                    }
                
                    toast.success("Payment verified and appointment updated!");
                    navigate("/checkout-success");
                  } catch (error) {
                    console.error("Verification error:", error);
                   // toast.error("Payment verification failed.");
                  }
                }}
                


              />
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No appointment found.
            </Typography>
          )}
        </Paper>
      </Box>
    </PayPalScriptProvider>
  );
};

export default CheckoutWithPaypal;






