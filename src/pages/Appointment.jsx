import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";
import { Box, Avatar, Button, Typography, Paper } from "@mui/material";
import RelatedDoctors from "../components/RelatedDoctors";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment, getAllBookings, getOneDoctor, } from "../feature/auth/authSlice";
import Loader from "../components/loader/Loader";
import { toast } from "react-toastify";
//import CarouselItem from "../components/carousel/CarouselItem";

const Appointment = () => {
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotsIndex, setSlotsIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);



  const { doctors, currencySymbol } = useContext(AppContext);
  const {isLoading,docData, user} = useSelector((state)=> state?.auth)
  console.log(`is loading is ${isLoading} `)
//const docData = useSelector((state)=> state?.auth?.fetchDoc)

  //console.log(`the doc details should be in this form ${JSON.stringify(docData)}`)
 




  const  {docId } = useParams();
  console.log(`we haver the doc ID as ${docId}`)


const navigate = useNavigate()

  const dispatch =  useDispatch()
  
  // useEffect(() => {
  //   if (docId) {
  //     dispatch(getOneDoctor(docId));
   
  //   }
  // }, [dispatch, docId]);



  useEffect(() => {
    if (docId) {
      
      setDocInfo(null);
      setDocSlots([]);
      setSlotsIndex(0);
      setSelectedTime(null);
  
      dispatch(getOneDoctor(docId));
    }
  }, [dispatch, docId]);
  


 

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // const fetchDocInfo = async () => {
  // //  const docInfo = Array.isArray(docData)  && docData?.find((doc) => doc._id === docId);
  // const docInfo = docData ? docData?.find((doc) => doc._id === docId) : docData;
  //   setDocInfo(docInfo);
  // };

  useEffect(() => {
    if (docData &&  docData?._id === docId) {
      setDocInfo(docData);
    }
  }, [docData, docId]);

  
 

  const getAvailableSlots = async () => {
    let today = new Date();

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
        currentDate.setMinutes(10);
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
    // const selectedSlotDay = docSlots?.[slotsIndex]?.[0]?.dateTime;

    const selectedSlotDay = docSlots?.[slotsIndex]?.find(
      (slot) => slot.time === selectedTime
    )?.dateTime;
  
    if (!selectedSlotDay) {
      toast.error("No slot selected or available");
      return;
    }


  
    let day = selectedSlotDay.getDay();
    let month = selectedSlotDay.getMonth() + 1;
    let year = selectedSlotDay.getFullYear();
    
  
 
    const slotDate = `${day}-${month}-${year}`;


    const minutes = selectedSlotDay.getMinutes().toString().padStart(2,0)
    const hours = selectedSlotDay.getHours().toString().padStart(2,0)
   const  slotTime = `${hours}:${minutes}`
  
     try {
  //    if(docId){

        const bookingData = { slotDate, slotTime };
        
    

        await dispatch(bookAppointment({docId, bookingData }));
       await dispatch(getAllBookings()).unwrap();
    
        toast.success("Successfully booked");
        navigate(`/my-booking`);
   //   }
   
    } catch (error) {
      console.log(`Invalid booking due to ${error.message}`);
      toast.error(`Booking not possible: ${error.message}`);
    }
  };
  

  


  useEffect(() => {
    getAvailableSlots();
  }, []);



  return (
    <> 
   {isLoading  && <Loader/>}
   { docInfo   && docInfo !== null  && (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          margin: "auto",
        padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          '@media(max-width:768px)':{
            maxWidth:'550px',
          padding: " 30px",
          }
        }}
      >
        {/* Doctor Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >


          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f4f8",
              padding: "20px",
              borderRadius: "12px",
            width:'80%',
              '@media(max-width:768px)':{
               // maxWidth:'80% !important',

              }
            }}
          >


            <Avatar
              src={docInfo?.photo}
              alt={docInfo?.user?.name}
              sx={{
                width: "300px",
                height: "300px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>

          <Box 
          sx={{ 
            flex: "2",
            marginTop:'40px' 


           }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {docInfo?.user?.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {docInfo?.user?.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#7f8c8d" }}>
              {docInfo?.degree} - {docInfo?.speciality}
            </Typography>
            <Button  
            onClick={ bookAnAppointment}
            variant="contained" sx={{ mb: 2 }}>
              Book An Appointment
            </Button>
            <Typography
          variant="h4"
          component={'h5'}
            sx={{
          //  marginTop:'40px',
            fontWeight:'600',
              color:'green'
            
            }}
            >
              Book Your Appointment  Today
            </Typography>

            <Typography
            variant="p"
            component={'p'}

            sx={{
            color:'green',
            fontWeight:'600',
            fontSize:'16px',
            }}
            >
              For Life is beautiful with the right doctor
            </Typography>
            <Typography
            sx={{
              color:'green'
            }}
            >
              Appointment Fee: {currencySymbol}
              {docInfo?.fees}
            </Typography>

       
          </Box>
        </Box>

        {/* About Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1  }}>
            About
          </Typography>
          <Typography sx={{ color: "#7f8c8d", lineHeight: 1.8,
              '@media(max-width:768px)':{
               width:'470PX'
             }
           }}>
            {docInfo?.about}
          </Typography>
        </Box>

        {/* Booking Slots */}
        <Box>
        
       
        
          <Typography variant="h6" sx={{ mb: 2 }}>
            Booking Slots
          </Typography>



          {/* Date Scrollable Section */}
      

<Box
  sx={{
    display: "flex",
    gap: 4,
    overflowX: "auto",
    scrollBehavior: "smooth",
    justifyContent: "center", 
    mb: 2,
    '&::-webkit-scrollbar': {
      height: '0px',
    },
    '&:hover::-webkit-scrollbar': {
      height: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: '10px',
    },
    '@media(max-width:768px)': {
      width: '500px',
      flexDirection: 'row',
      gap: 1,
    }
  }}
>

            {docSlots &&  docSlots?.length > 0 &&  docSlots?.map((daySlots, index) => (
              <Box
            
                key={index}
                sx={{
              //    minWidth: "10px",
                  height:'10px',
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: index === slotsIndex ? "#2979ff" : "#fff",
                  color: index=== slotsIndex ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  "&:hover": { backgroundColor: "#f4f4f4" },
                }}
                onClick={() => setSlotsIndex(index)}
               
              >
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                
                  {daySlots[0] && daysOfWeek[daySlots[0]?.dateTime?.getDay()]}
                </Typography>
                <Typography>
                  {daySlots[0] &&  daySlots[0]?.dateTime?.toLocaleDateString()}
                  {/* {daySlots[0]?.dateTime ? daysOfWeek[daySlots[0].dateTime.getDay()] : "N/A"} */}


            
                </Typography> 
       
              
              </Box>
            ))}
          </Box>

          {/* Time Slots Scrollable Section */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
     <Box
  sx={{
    display: "flex",
    gap: 1,
    overflowX: "auto",
    scrollBehavior: "smooth",
    // Show scrollbar and style it:
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
    // For Firefox:
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
  }}
>
  {docSlots[slotsIndex]?.map((slot, idx) => (
    <Box
      key={idx}
      sx={{
        minWidth: "80px",
        padding: "5px",
        textAlign: "center",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor:
          selectedTime === slot.time ? "#2979ff" : "#fff",
        color: selectedTime === slot.time ? "#fff" : "#000",
        border: "1px solid #ddd",
        "&:hover": { backgroundColor: "#eaf5fc" },
      }}
      onClick={() => setSelectedTime(slot.time)}
    >
      <Typography>{slot.time}</Typography>
    </Box>
  ))}
</Box>




            {/* {docSlots[slotsIndex]?.map((slot, idx) => (
              <Box
                key={idx}
                sx={{
                  minWidth: "80px",
                  padding: "5px",
                  textAlign: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTime === slot.time ? "#2979ff" : "#fff",
                  color: selectedTime === slot.time ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  "&:hover": { backgroundColor: "#eaf5fc" },
                }}
                onClick={() => setSelectedTime(slot.time)}
              >
                <Typography>{slot.time}</Typography>
              </Box>
            ))} */}




          </Box>
        </Box>
        <RelatedDoctors
        docId={docId}
    //  docId={docInfo?._id}
        speciality ={docInfo?.speciality}
      isLoading={isLoading}

        />
        <Box>
     
        </Box>
      
       
      </Box>
    )
  }
    </>
  );

 
};

export default Appointment;










