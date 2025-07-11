
import { Box, Typography, Avatar } from "@mui/material";
import { Group, Event, Cancel } from "@mui/icons-material";
import DashBoardList from "./DashBoardList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { appointmentAdmin, appointmentCancel, getAllDoctors } from "../../feature/adminAuth/adminSlice";


const DashBoard = () => {
  const dispatch = useDispatch(); 
  const {  isLoading , doctor, appointments, cancelledAppointments} = useSelector((state) => state?.admin);  
  //const doctor = useSelector((state) => state?.admin);

  console.log(`appointments are ${JSON.stringify(doctor)}`);

 //  const doctor = useSelector((state)=> state?.admin?.doctors)
  console.log(`appointments are ${JSON.stringify(appointments)}`);

  const { user, } = useSelector((state) => state?.auth);  
  console.log(`doctor is ${JSON.stringify(user)}`); 
  console.log(`doctor is ${JSON.stringify(doctor)}`); 


useEffect(()=>{
  dispatch(appointmentCancel()) 
  //toast.success("Welcome to Admin Dashboard");
},[dispatch]);  






useEffect(() => {
  dispatch(getAllDoctors());
 
 }, [dispatch, ]);







// useEffect(() => {
//   dispatch(getAllDoctors());
//   //toast.success("Welcome to Admin Dashboard");
// }, [dispatch]);




useEffect(() => {
  dispatch(appointmentAdmin())
// toast.success("appointments fetch successfully"); 

}, [dispatch,]);

 


  return (
    <>  
    {isLoading && <Loader />} 
    <Box
    
    sx={{
      width:'100%',
    //  height:'100%'
    }}

    > 
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
       p: 2,
        pl:0,
        mt: { xs: 3, md: 2}, // Adjust this value to push below navbar
        width: "100%",
 
      display:'flex',
      flexDirection:'column',
      justifyContent:{xs:'center',md:'flex-start'},
      alignItems:{xs:'center',md:'flex-start'},

      }}
    >
      <Box
      sx={{
       pl:{xs:'20px', md:'0px'}
      }}
      >
      <Typography variant="h4" gutterBottom textAlign="center">
        { user && user?.role} Dashboard
      </Typography>
      </Box>
    

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          
          flexWrap:{xs:"wrap", md:'nowrap'},
          gap: 4,
          justifyContent: "center",
          alignItems: "center",

          mt: 4,
         width: {xs:'80%', md:'100%'},
         // width:'100%',
        }}
      >
        {/* Doctors Card */}
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            p: 3,
            boxShadow: 2,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#2196f3", width: 56, height: 56, mx: "auto" }}>
            <Group />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2 }}>
      
              {Array.isArray(doctor?.doctors) ? doctor?.doctors.length : 0
               //doctor  && doctor.length || 0
              } Doctors
           
           
          </Typography>
          {/* <Typography variant="h5" sx={{ mt: 2 }}>
          { Array.isArray(doctor.doctors) ? doctor?.doctors?.length :0} 
          
         Doctors  
            </Typography> */}

          <Typography variant="body2" color="text.secondary">
            Total Registered Doctors
          </Typography>
        </Box>

        {/* Appointments Card */}
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            backgroundColor: "#e8f5e9",
            borderRadius: 2,
            p: 3,
            boxShadow: 2,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#4caf50", width: 56, height: 56, mx: "auto" }}>
            <Event />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {/* Display the number of appointments */}  


             {Array.isArray(appointments?.appointment) ? appointments?.appointment.length : 0} appointments 
     
             <Typography variant="h5" sx={{ mt: 2 }}>
      
    
   
   
  </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Booked Appointments
          </Typography>
        </Box>

        {/* Cancelled Appointments Card */}
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            backgroundColor: "#ffebee",
            borderRadius: 2,
            p: 3,
            boxShadow: 2,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#f44336", width: 56, height: 56, mx: "auto" }}>
            <Cancel />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2 }}>

            {/* Display the number of cancelled appointments */}
            {cancelledAppointments && cancelledAppointments?.count || 0} cancelled 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cancellations Today
          </Typography>
        </Box>
      </Box>
      <Box>
        <DashBoardList/>
      </Box>
    </Box>
    </Box>

    </>
  );
};

export default DashBoard;


