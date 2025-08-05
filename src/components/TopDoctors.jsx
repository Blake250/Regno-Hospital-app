




import { Box, Typography, ImageListItem, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getAllDoctors } from "../feature/adminAuth/adminSlice";
import Loader from "./loader/Loader";
import { getAllDoctors } from "../feature/auth/authSlice";
import { useMemo } from "react";
//import CarouselItem from "../components/carousel/CarouselItem"



const TopDoctors = () => {
  const doctor = useSelector((state) => state?.auth);
  console.log(`here is the  list of doctors data ${JSON.stringify(doctor)}`)  
  //  const {user} = useSelector((state) => state?.auth);
  const  isLoading = useSelector((state) => state?.auth);
  console.log(  `is loading is ${JSON.stringify(isLoading)}`)
  



  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);


  const doctors = useMemo(() => { 
  return Array.isArray(doctor?.doctor?.doctors)
    ? doctor?.doctor?.doctors
    : [];
}   , [doctor?.doctor?.doctors]); 


  // useEffect(() => {
  //   if(user && user?.role === 'admin'){
  //     dispatch(getAllDoctors());
  //   }
   
  //  }, [dispatch, user]);
 




  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };




const openDocDetails  = (docId)=>{
  navigate(`/booking/${docId}`)
}



  return (
    <>  
    {isLoading && <Loader/>}
    <Box
      sx={{
        padding: "20px",
        textAlign: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d0e4ff 100%)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#2e3b4e", marginBottom: "16px" }}>
             Recommended For You
   
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          color: "#5a6470",
          marginBottom: "30px",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Simply browse through our curated list of trusted doctors, and book your
        appointments with ease.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {          doctors?.length > 0 ? (
          doctors.slice(0, 10)?.map((item) => (

            <Box
              key={item._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "200px",
                width: "100%",
              }}
            >
              <ImageListItem
                onClick={() => {
               //   navigate(`/booking/${item._id}`);
                  openDocDetails(item?._id)
                  scrollTo(0, 0);
                }}
                sx={{
                  width: "100%",
                  paddingBottom: "100%",
                  overflow: "hidden",
                  borderRadius: "50%",
                  position: "relative",
                  transition: "transform 0.3s ease",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <img
                  src={item?.photo}
                  alt={item?.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    objectFit: "cover",
                  }}
                />
              </ImageListItem>

              <Paper
                elevation={3}
                sx={{
                  '@media(max-width:768px)': {
                    padding: "16px",
                  },
                  width: "100%",
                  padding: "16px",
                  marginTop: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "green", fontSize: "10px", cursor: "pointer" }}
                  >
                    {item?.available ? "Available" : "Not Available"}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#34495e",
                    marginBottom: "6px",
                    fontSize: "13px",
                  }}
                >
                  {item?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#7f8c8d", marginBottom: "4px" }}
                >
                  {item?.speciality}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#7f8c8d", marginBottom: "4px" }}
                >
                  {item?.degree}
                </Typography>
              </Paper>
            </Box>
          ))
        ) : (
          <Box>
            <Typography
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              No Doctor Found....
            </Typography>
          </Box>
        )}
      </Box>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          position: "relative",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "10px",
            width: "150px",
          }}
          onClick={() => handleNavigate(`/doctors`)}
        >
          More
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default TopDoctors;



















// import { Box, Typography, ImageListItem, Paper, Button } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// //import { AppContext } from "./context/AppContext";
// import {  useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllDoctors } from "../feature/adminAuth/adminSlice";


// const TopDoctors = () => {
//   const doctor = useSelector((state)=> state?.admin)
//   console.log(`here is the  list of doctors data ${JSON.stringify(doctor)}`)

// const dispatch = useDispatch()
// const navigate = useNavigate()
// //const {doctors} = useContext(AppContext)

// useEffect(() => {

//     dispatch(getAllDoctors());
 

// }, [dispatch]);




// const handleNavigate = (path)=>{
//     navigate(path)
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   return (
//     <Box sx={{ padding: "20px", textAlign: "center", background: "linear-gradient(135deg, #f0f4ff 0%, #d0e4ff 100%)", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e3b4e", marginBottom: "16px" }}>
//         Top Doctors To Book
//       </Typography>

//       <Typography sx={{ fontSize: "16px", color: "#5a6470", marginBottom: "30px", maxWidth: "600px", mx: "auto" }}>
//         Simply browse through our curated list of trusted doctors, and book your appointments with ease.
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 3,
//         }}
//       >
//         {/* { Array.isArray(doctor) && doctor?.doctors?.length> 0 ? doctor?.doctors? */}
//         {Array.isArray(doctor?.doctor?.doctors) && doctor?.doctor?.doctors.length > 0 ?
        
//         (
//           doctor.doctor.doctors.slice(0, 10)?.map((item, index) => (
     

          
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               maxWidth: "200px",
//               width: "100%",
//             }}
//           >
//             <ImageListItem
//             onClick = {()=> {navigate(`/booking/${item._id}`); scrollTo(0,0) }}
//               sx={{
//                 width: "100%",
//                 paddingBottom: "100%",
//                 overflow: "hidden",
//                 borderRadius: "50%",
//                 position: "relative",
//                 transition: "transform 0.3s ease",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//             >
//               <img
//                 src={item?.photo}
//                 alt={item?.name}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   position: "absolute",
//                   top: "0",
//                   left: "0",
//                   objectFit: "cover",
//                 }}
//               />
//             </ImageListItem>

//             <Paper 
//               elevation={3} 
//               sx={{
//                 '@media(max-width:768px)':{
//                     padding: "16px",
//                 },
//                 width: "100%",
//                 padding: "16px",
//                 marginTop: "20px",
//                 borderRadius: "12px",
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-8px)",
//                   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "6px", 
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: "6px",
//                     height: "6px",
//                     borderRadius: "50%",
//                     backgroundColor: "green",
                   
//                   }}
//                 />
//                 <Typography variant="body2" sx={{ color: "green", fontSize: "10px", cursor:'pointer' }}>
//                  {item?.available ? 'Available': "Not Available"}
//                 </Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e", marginBottom: "6px", fontSize: '13px' }}>
//                 {item?.name}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#7f8c8d", marginBottom: "4px" }}>
//                 {item?.speciality}
//               </Typography>
//             </Paper>
           
//           </Box>
         
         
//         ))

//          :
//         (
//           </>
//           <Box>  
//           <Typography
//           sx={{
//             textTransform:'capitalize',
//            textAlign:'center',
//            fontSize:'16px',
//           }}
//           >
//             No Doctor Found....
//           </Typography>
//           </Box>
//          )
        
//          </>
// }
//       </Box>
      
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: '30px',
//           position: 'relative',
//         }}
//       >
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{
//             borderRadius: '10px',
//             width: '150px',
//           }}
//       //  onClick={()=>{navigate(`/doctors`); scrollTo(0,1)}}
//       onClick={()=> handleNavigate(`/doctors`)}
        
        
//         >
    
        
//           More
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default TopDoctors;

