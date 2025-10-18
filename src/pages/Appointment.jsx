


import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";
import { Box, Avatar, Button, Typography, Paper } from "@mui/material";
import RelatedDoctors from "../components/RelatedDoctors";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment, getAllBookings, getOneDoctor } from "../feature/auth/authSlice";
import Loader from "../components/loader/Loader";
import { toast } from "react-toastify";
  import { keyframes } from "@emotion/react";

const Appointment = () => {
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotsIndex, setSlotsIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const { doctors, currencySymbol } = useContext(AppContext);
  const { isLoading, docData, user } = useSelector((state) => state?.auth);
  const { docId } = useParams();
  console.log(`ths is my ${docId}`)
  const navigate = useNavigate();
  const dispatch = useDispatch();



    useEffect(() => {
    if (docId) {
      setDocInfo(null);
      setDocSlots([]);
      setSlotsIndex(0);
      setSelectedTime(null);
      dispatch(getOneDoctor(docId));
    }
  }, [dispatch, docId]);

  useEffect(() => {
    if (docData && docData?._id === docId) {
      setDocInfo(docData);
    }
  }, [docData, docId]);

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const getAvailableSlots = async () => {
    let today = new Date();
    setDocSlots([]); // Clear previous slots
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAnAppointment = async () => {
    const selectedSlotDay = docSlots?.[slotsIndex]?.find(
      (slot) => slot.time === selectedTime
    )?.dateTime;

    if (!selectedSlotDay) {
      toast.error("No slot selected or available");
      return;
    }

    let day = selectedSlotDay.getDate();
    let month = selectedSlotDay.getMonth() + 1;
    let year = selectedSlotDay.getFullYear();
    const slotDate = `${day}-${month}-${year}`;
    const minutes = selectedSlotDay.getMinutes().toString().padStart(2, "0");
    const hours = selectedSlotDay.getHours().toString().padStart(2, "0");
    const slotTime = `${hours}:${minutes}`;

    try {
      const bookingData = { slotDate, slotTime };
      await dispatch(bookAppointment({ docId, bookingData })).unwrap();
      await dispatch(getAllBookings()).unwrap();
      toast.success("Successfully booked");
      navigate(`/my-booking`);
    } catch (error) {
      console.error(`Invalid booking due to ${error.message}`);
      toast.error(`Booking not possible: ${error.message}`);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docId]);


  const styledAnimationDown = keyframes`
  0% {
    transform: translateX(5rem);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

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



  return (
    <>
      {isLoading && <Loader />}
      {docInfo && (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "1200px" },
            margin: "auto",
            padding: { xs: 1, md: 2 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 4 },
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            overflowX: "hidden",
          }}
        >
          {/* Doctor Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                 animation: `${styledAnimationDown} 0.6s ease`,
                flex: { xs: "none", md: 1 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f4f8",
                padding: { xs: 1, md: 2 },
                borderRadius: "12px",
                maxWidth: "100%",
              }}
            >
              <Avatar
                src={docInfo?.photo}
                alt={docInfo?.user?.name}
                sx={{
                  width: { xs: "150px", sm: "200px", md: "300px" },
                  height: { xs: "150px", sm: "200px", md: "300px" },
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
            <Box
              sx={{
                flex: { xs: "none", md: 2 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: { xs: 1, md: 2 },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {docInfo?.user?.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {docInfo?.speciality} - {docInfo?.experience} Years Experience
              </Typography>
              <Typography variant="body2">{docInfo?.about}</Typography>
              <Typography variant="h6">
                Booking Fee: {currencySymbol}
                {docInfo?.fees}
              </Typography>
            </Box>
          </Box>

          {/* Time Slots */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: { xs: 1, md: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": { height: "8px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "4px",
                },
              }}
            >
              {docSlots?.map((slots, index) => (
                <Button
                  key={index}
                  variant={slotsIndex === index ? "contained" : "outlined"}
                  onClick={() => {
                    setSlotsIndex(index);
                    setSelectedTime(null);
                  }}
                  sx={{
                     animation: `${styledAnimationDown} 0.6s ease`,
                    minWidth: "80px",
                    fontSize: { xs: "12px", md: "14px" },
                    padding: { xs: "4px 8px", md: "6px 12px" },
                  }}
                >
                  {daysOfWeek[new Date(slots[0]?.dateTime).getDay()]} <br />
                  {new Date(slots[0]?.dateTime).toLocaleDateString()}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {docSlots[slotsIndex]?.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTime === slot.time ? "contained" : "outlined"}
                  onClick={() => setSelectedTime(slot.time)}
                  sx={{
                    minWidth: "80px",
                    fontSize: { xs: "12px", md: "14px" },
                    padding: { xs: "4px 8px", md: "6px 12px" },
                  }}
                >
                  {slot.time}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={bookAnAppointment}
              disabled={!selectedTime}
              sx={{
                alignSelf: { xs: "center", md: "flex-start" },
                fontSize: { xs: "12px", md: "14px" },
                padding: { xs: "6px 12px", md: "8px 16px" },
                  animation: `${styledAnimationDown} 0.6s ease`,
              }}
            >
              Book Appointment
            </Button>
          </Box>

          {/* Related Doctors */}
          <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
        </Box>
      )}
    </>
  );
};

export default Appointment;











// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../components/context/AppContext";
// import { Box, Avatar, Button, Typography, Paper } from "@mui/material";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { useDispatch, useSelector } from "react-redux";
// import { bookAppointment, getAllBookings, getOneDoctor } from "../feature/auth/authSlice";
// import Loader from "../components/loader/Loader";
// import { toast } from "react-toastify";


// const Appointment = () => {
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotsIndex, setSlotsIndex] = useState(0);
//   const [selectedTime, setSelectedTime] = useState(null);


//   const { doctors, currencySymbol } = useContext(AppContext);
//   const { isLoading, docData, user } = useSelector((state) => state?.auth);
//   const { docId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   // Fetch doctor and reset state on docId change
//   useEffect(() => {
//     if (docId) {
//       setDocInfo(null);
//       setDocSlots([]);
//       setSlotsIndex(0);
//       setSelectedTime(null);
//       dispatch(getOneDoctor(docId));
//     }
//   }, [dispatch, docId]);


//   // Update docInfo when docData changes
//   useEffect(() => {
//     if (docData && docData?._id === docId) {
//       setDocInfo(docData);
//     }
//   }, [docData, docId]);


//   // Generate available slots when docId or docInfo changes
//   const getAvailableSlots = () => {
//     setDocSlots([]); // Clear previous slots
//     let today = new Date();
//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);


//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);


//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(
//           currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
//         );
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }


//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         timeSlots.push({
//           dateTime: new Date(currentDate),
//           time: formattedTime,
//         });
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       setDocSlots((prev) => [...prev, timeSlots]);
//     }
//   };


//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);


//   const bookAnAppointment = async () => {
//     const selectedSlotDay = docSlots?.[slotsIndex]?.find(
//       (slot) => slot.time === selectedTime
//     )?.dateTime;


//     if (!selectedSlotDay) {
//       toast.error("No slot selected or available");
//       return;
//     }


//     let day = selectedSlotDay.getDate();
//     let month = selectedSlotDay.getMonth() + 1;
//     let year = selectedSlotDay.getFullYear();
//     const slotDate = `${day}-${month}-${year}`;
//     const minutes = selectedSlotDay.getMinutes().toString().padStart(2, "0");
//     const hours = selectedSlotDay.getHours().toString().padStart(2, "0");
//     const slotTime = `${hours}:${minutes}`;


//     try {
//       const bookingData = { slotDate, slotTime };
//       const response = await dispatch(bookAppointment({ docId, bookingData })).unwrap();
//       await dispatch(getAllBookings()).unwrap();
//       toast.success("Successfully booked");
//       navigate(`/checkout-options/${docId}`);
//     } catch (error) {
//       console.error(`Invalid booking due to ${error.message}`);
//       toast.error(`Booking not possible: ${error.message}`);
//     }
//   };


//   return (
//     <>
//       {isLoading && <Loader />}
//       {!isLoading && !docInfo && (
//         <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
//           Doctor not found
//         </Typography>
//       )}
//       {docInfo && (
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: { xs: "100%", sm: "600px", md: "1200px" },
//             margin: "auto",
//             padding: { xs: 1, md: 2 },
//             display: "flex",
//             flexDirection: "column",
//             gap: { xs: 2, md: 4 },
//             backgroundColor: "#ffffff",
//             borderRadius: "12px",
//             boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
//             overflowX: "hidden",
//           }}
//         >
//           {/* Doctor Info */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               gap: { xs: 2, md: 4 },
//             }}
//           >
//             <Box
//               sx={{
//                 flex: { xs: "none", md: 1 },
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "#f0f4f8",
//                 padding: { xs: 1, md: 2 },
//                 borderRadius: "12px",
//                 maxWidth: "100%",
//               }}
//             >
//               <Avatar
//                 src={docInfo?.photo}
//                 alt={docInfo?.user?.name}
//                 sx={{
//                   width: { xs: "150px", sm: "200px", md: "300px" },
//                   height: { xs: "150px", sm: "200px", md: "300px" },
//                   boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 flex: { xs: "none", md: 2 },
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 padding: { xs: 1, md: 2 },
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {docInfo?.user?.name}
//               </Typography>
//               <Typography variant="body1" color="textSecondary">
//                 {docInfo?.speciality} - {docInfo?.experience} Years Experience
//               </Typography>
//               <Typography variant="body2">{docInfo?.about}</Typography>
//               <Typography variant="h6">
//                 Booking Fee: {currencySymbol}
//                 {docInfo?.fees}
//               </Typography>
//             </Box>
//           </Box>


//           {/* Time Slots */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               padding: { xs: 1, md: 2 },
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 overflowX: "auto",
//                 pb: 1,
//                 "&::-webkit-scrollbar": { height: "8px" },
//                 "&::-webkit-scrollbar-thumb": {
//                   backgroundColor: "#888",
//                   borderRadius: "4px",
//                 },
//               }}
//             >
//               {docSlots?.map((slots, index) => (
//                 <Button
//                   key={index}
//                   variant={slotsIndex === index ? "contained" : "outlined"}
//                   onClick={() => {
//                     setSlotsIndex(index);
//                     setSelectedTime(null);
//                   }}
//                   sx={{
//                     minWidth: "80px",
//                     fontSize: { xs: "12px", md: "14px" },
//                     padding: { xs: "4px 8px", md: "6px 12px" },
//                   }}
//                 >
//                   {new Date(slots[0]?.dateTime).toLocaleDateString([], {
//                     weekday: "short",
//                     day: "numeric",
//                     month: "short",
//                   })}
//                 </Button>
//               ))}
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 flexWrap: "wrap",
//                 justifyContent: { xs: "center", md: "flex-start" },
//               }}
//             >
//               {docSlots[slotsIndex]?.map((slot, index) => (
//                 <Button
//                   key={index}
//                   variant={selectedTime === slot.time ? "contained" : "outlined"}
//                   onClick={() => setSelectedTime(slot.time)}
//                   sx={{
//                     minWidth: "80px",
//                     fontSize: { xs: "12px", md: "14px" },
//                     padding: { xs: "4px 8px", md: "6px 12px" },
//                   }}
//                 >
//                   {slot.time}
//                 </Button>
//               ))}
//             </Box>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={bookAnAppointment}
//               disabled={!selectedTime}
//               sx={{
//                 alignSelf: { xs: "center", md: "flex-start" },
//                 fontSize: { xs: "12px", md: "14px" },
//                 padding: { xs: "6px 12px", md: "8px 16px" },
//               }}
//             >
//               Book Appointment
//             </Button>
//           </Box>


//           {/* Related Doctors */}
//           <RelatedDoctors docId={docId} speciality={docInfo?.speciality} isLoading={isLoading} />
//         </Box>
//       )}
//     </>
//   );
// };
// export default Appointment;