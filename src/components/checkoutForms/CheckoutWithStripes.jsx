

// CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Adjust path if necessary
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, getSingleBooking, updatePaymentMethod } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";  

console.log(`Backend URL is: ${BACKEND_URL}`); // Log the backend URL for debugging 
const CheckoutWithStripes = () => {

 // Extract appointmentId from URL parameters
  const { appointmentId} = useParams();
//   const location = useLocation();
// const appointmentId = location.state?.appointmentId;

  console.log("appointmentId type:", typeof appointmentId); 
  console.log(`my appointmentID is ${appointmentId}`)


  


  //console.log(`Appointment ID from URL is: ${JSON.stringify(appointmentId)}`); // Log the appointmentId for debugging

  const [clientSecret, setClientSecret] = useState("");
  const [message,setMessage] = useState("initializing checkout...");


const dispatch = useDispatch();
  // Update payment method in Redux store
 



 

  useEffect(() => {
    console.log("Current path:", window.location.pathname);   
  //  toast.success("Current path:", window.location.pathname)
    if (!appointmentId){
      console.log(`no booking Id found`)
      return;
    }
  
     
  
    fetch(`https://regno-hospital-api.onrender.com/api/payment/stripe-pay/${appointmentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
   
     
    })
      .then((response) => {
        if (!response.ok) {
        console.log("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if ( data && data?.clientSecret) {
          setClientSecret(data?.clientSecret);
        } else {
          console.log("Failed to retrieve clientSecret");
        }
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        toast.error("Error initializing Stripe checkout");
        setMessage("Failed to initialize checkout");
      });
  }, [appointmentId]);
  
  

 
  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (

    <>  
    <section>
     <div style={{
       display:'flex',
       flexDirection:'column',
       alignItems:'center'
     }} >
    
   { !clientSecret && <h3>{message} </h3>    }
     </div>
    </section>
   <>
     {clientSecret && (
       <Elements options={options} stripe={stripePromise}>
         <CheckoutForm   />
       </Elements>
     )}
   </>
   </>


  
   );
};

export default CheckoutWithStripes







