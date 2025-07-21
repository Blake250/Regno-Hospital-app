

 import { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { confirmAlert } from "react-confirm-alert";
 import "react-confirm-alert/src/react-confirm-alert.css";
 import {
   Box,
   Typography,
   Card,
   CardContent,
   Button,
   Grid,
   Avatar,
   Chip,
 } from "@mui/material";
 import { useNavigate } from "react-router-dom";
 import Loader from "../components/loader/Loader";
 import {
   cancelAppointment,
   getAllBookings,
 } from "../feature/auth/authSlice";
 import Pagination from "../components/num-page/numPage";
 import { toast } from "react-toastify";

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
 
 const MyAppointment = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, getThisAppointment } = useSelector((state) => state.auth);
 
   const itemsPerPage = 5;
   const [itemOffset, setItemOffset] = useState(0);
 
   useEffect(() => {
     dispatch(getAllBookings());
   }, [dispatch]);
 
   const isPast = (dateStr, timeStr) => {
     const appointmentISO = `${dateStr}T${timeStr}:00`;
     const appointmentDateTime = new Date(appointmentISO);
     const now = new Date();
     return appointmentDateTime.getTime() < now.getTime();
   };
 
   const sortedAppointments = Array.isArray(getThisAppointment)
     ? [...getThisAppointment].sort((a, b) => {
         const aDate = new Date(`${a.slotDate}T${a.slotTime}`);
         const bDate = new Date(`${b.slotDate}T${b.slotTime}`);
         const now = new Date();
 
         const aIsPast = aDate < now;
         const bIsPast = bDate < now;
 
         if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
         return aDate - bDate;
       })
     : [];
 
   const mostRecentBookingId = sortedAppointments?.find(
     (booking) =>
       !isPast(booking.slotDate, booking.slotTime) && !booking.payment
   )?._id;
 
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = sortedAppointments.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(sortedAppointments.length / itemsPerPage);
 
   const handlePageClick = (event) => {
     const newOffset = event.selected * itemsPerPage;
     setItemOffset(newOffset);
   };
 
   const cancelThisBooking = async (appointmentId) => {
     await dispatch(cancelAppointment(appointmentId));
     await dispatch(getAllBookings());
   };
 
   const cancelThisAppointment = (appointmentId) => {
     confirmAlert({
       title: "Confirm Deletion",
       message: "Are you sure you want to cancel this appointment?",
       buttons: [
         {
           label: "Yes",
           onClick: () => {
             cancelThisBooking(appointmentId);
             toast.success("Appointment cancelled successfully");
           },
         },
         {
           label: "No",
           onClick: () => {
             toast.info("Cancellation aborted");
           },
         },
       ],
     });
   };
 
   const goToDetailsPage = (docId) => {
     navigate(`/details/${docId}`);
   };
 
   return (
     <>
       <Box sx={{ px: 4, py: 12 }}>
         <Button
           variant="outlined"
           onClick={() => navigate("/doctors")}
           sx={{ mb: 4 }}
         >
           &larr; Back to Doctors
         </Button>
 
         <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
           My Bookings
         </Typography>
 
         {isLoading && <Loader />}
 
         {!isLoading && currentItems?.length === 0 && (
           <Typography variant="body1" color="text.secondary">
             No Appointment found.
           </Typography>
         )}
 
         {!isLoading &&
           currentItems?.map((booking) => {
             const isOld = isPast(booking.slotDate, booking.slotTime);
 
             return (
               <Card
                 key={booking._id}
                 sx={{
                   mb: 4,
                   p: 2,
                   cursor: "pointer",
                   background: isOld
                     ? "linear-gradient(135deg, #f7f7f7, #e0e0e0)"
                     : "linear-gradient(135deg, #e0f7fa, #e1f5fe)",
                   boxShadow: 3,
                   borderRadius: 3,
                   transition:
                     "background 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease",
                   ":hover": {
                     boxShadow: 6,
                     transform: "scale(1.01)",
                   },
                 }}
               >
                 <Grid container spacing={3} alignItems="center">
                   <Grid item xs={12} md={3} textAlign="center">
                     <Avatar
                       onClick={() => goToDetailsPage(booking._id)}
                       src={booking?.docId?.photo}
                       alt={booking?.docId?.user?.name}
                       sx={{ width: 120, height: 120, mx: "auto" }}
                     />
                   </Grid>
 
                   <Grid item xs={12} md={6}>
                     <CardContent>
                       <Typography variant="h6" fontWeight="bold" color="primary">
                         Doctor: {booking?.docId?.user?.name || "N/A"}
                       </Typography>





<Typography variant="body1" color="text.primary" gutterBottom>
  Date & Time:
</Typography>

<Typography component="span" fontWeight="medium" sx={{ display: "inline-block", pr: 2 }}>
    📅 {booking.slotDate}
  </Typography>
<Box

>

  <Typography component="span" fontWeight="medium" sx={{ display: "inline-block" }}>
    🕒 {booking.slotTime}
  </Typography>
</Box> 


                       <Typography variant="body1" color="text.secondary">
                         Email: {booking?.docId?.user?.email}
                       </Typography>
                       <Typography variant="body1" color="text.secondary">
                         Address: {booking?.docId?.address?.line1}
                       </Typography>
                       <Typography variant="body1" color="text.secondary">
                         Fees: <strong>${booking?.docData?.fees || "N/A"}</strong>
                       </Typography>
 
                       <Box sx={{ mt: 2 }}>
                         <Chip
                           label={isOld ? "Past" : "Upcoming"}
                           color={isOld ? "default" : "success"}
                           variant="outlined"
                           sx={{ fontWeight: "bold" }}
                         />
                       </Box>
                     </CardContent>
                   </Grid>
 
                   <Grid item xs={12} md={3} textAlign="center">





                     <Box sx={{ display: "flex", flexDirection: "column" }}>

                       {!isOld && (
                         <>
                           {!booking?.payment ? (
                             <>
                               <Button
                                 variant="contained"
                                 color="primary"
                                //  onClick={() =>
                                //    navigate(`/checkout-options/${booking._id}`)
                                //  }
                                onClick={
                                  navigate(`/checkout-options/${booking._id}`)
                                }
                                 fullWidth
                                 sx={{ mb: 1 }}
                               >
                                 Pay Now
                               </Button>
                               <Button
                                 variant="outlined"
                                 color="error"
                                 onClick={() =>
                                   cancelThisAppointment(booking._id)
                                 }
                                 fullWidth
                               >
                                 Cancel
                               </Button>
                             </>
                           ) : (


                            <Box>




                               <Button 
                               sx={{
                                marginBottom:'10px'
                               }}
                               variant="outlined" color="success" fullWidth>
                               Paid
                             </Button>
                              
                             <Chip
  label="Payment Accepted"
  color="success"
  icon={<CheckCircleIcon />}
  variant="outlined"
  />

                            </Box>


                           )}
                         </>
                       )}
 

                     </Box>
                   </Grid>
                 </Grid>
               </Card>
             );
           })}
 
         <Box
           sx={{
             mt: 6,
             display: "flex",
             justifyContent: "center",
             position: "fixed",
             bottom: 0,
             left: 0,
             width: "100%",
             backgroundColor: "#ffffff",
             py: 2,
             boxShadow: "0 -2px 5px rgba(0,0,0,0.05)",
             zIndex: 99,
           }}
         >
           <Pagination
             itemsPerPage={itemsPerPage}
             pageCount={pageCount}
             handlePageClick={handlePageClick}
             itemOffset={itemOffset}
             setItemOffset={setItemOffset}
           />
         </Box>
       </Box>
     </>
   );
 };
 
 export default MyAppointment;
 












