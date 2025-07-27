import { Box, Typography, Button, Paper, ImageListItem } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./carouselStyles/Res";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//import { getAllDoctors } from "../../feature/adminAuth/adminSlice";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../../feature/auth/authSlice";

const CarouselItem = () => {
  const doctor = useSelector((state) => state?.auth);
  console.log(`we have all the doctors data like this ${JSON.stringify(doctor)} `)
  //console.log(we have all the doctors data like this ${JSON.stringify(doctor)}
  const {user} = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);


  

 


  const openDocDetails = (docId) => {
    navigate(`/booking/${docId}`);
    scrollTo(0, 0);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ py: 6, px: 2, background: "#f0f4f8" }}>
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          fontWeight={700}
          sx={{ color: "#333" }}
        >
          Top Rated Doctors
        </Typography>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          customTransition="all 0.5s ease"
          transitionDuration={700}
          arrows
        >
          {Array.isArray(doctor?.doctor?.doctors) &&
            doctor?.doctor?.doctors?.slice(18, 26)?.map((doc, i) => (
              doc && Object.keys(doc).length > 0 && (
                <Box key={i} sx={{ width: "100%", margin: "5px 0" }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      mx: 1.5,
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      textAlign: "center",
                      minHeight: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ImageListItem
                      onClick={() => openDocDetails(doc?._id)}
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
                        src={doc?.photo}
                        alt={doc?.name}
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

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: "black", fontSize: "18px" }}
                      >
                        {doc?.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, fontStyle: "italic" }}
                      >
                        {doc?.specialty}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: "#00796b", fontWeight: 500 }}
                      >
                        Consulted: {doc?.amount || 0} times
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mt: 2,
                        borderRadius: 5,
                        textTransform: "none",
                        borderColor: "#00796b",
                        color: "#00796b",
                        "&:hover": {
                          backgroundColor: "#e0f2f1",
                        },
                      }}
                      onClick={() => alert(`Viewing ${doc?.name}`)}
                    >
                      View Profile
                    </Button>
                  </Paper>
                </Box>
              )
            ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default CarouselItem;









// import { Box, Typography, Button, Paper, ImageListItem } from "@mui/material";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { responsive } from "./carouselStyles/Res";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getAllDoctors } from "../../feature/adminAuth/adminSlice";
// import { useNavigate } from "react-router-dom";

// const CarouselItem = () => {
//   const doctor = useSelector((state) => state?.admin);
//   //console.log(we have all the doctors data like this ${JSON.stringify(doctor)} )
//   const dispatch = useDispatch();
//   const navigate = useNavigate()


//   useEffect(() => {
//     dispatch(getAllDoctors());
//   }, [dispatch]);


//   const openDocDetails  = (docId)=>{
//     navigate(`/booking/${docId}`)
//   }
  

//   return (
//     <Box
//     sx={{
//        width:"100%",
//     height :"100%"
//     }}
//     > 
//     <Box
//       sx={{
//         py: 6,
//         px: 2,
//         background: "#f0f4f8",
//     //    minHeight: "100%",
   
//       }}
//     >
//       <Typography
//         variant="h4"
//         textAlign="center"
//         mb={4}
//         fontWeight={700}
//         sx={{ color: "#333" }}
//       >
//         Top Rated Doctors
//       </Typography>

//       <Carousel
//        // showDots
//         responsive={responsive}
//         infinite
//         autoPlay
//         autoPlaySpeed={4000}
//         customTransition="all 0.5s ease"
//         transitionDuration={700}
//         arrows
//       >
//         {Array.isArray(doctor?.doctor?.doctors) &&
//           doctor?.doctor?.doctors?.slice(18, 26)?.map((doc, i) => (
//             doc && Object.keys(doc).length > 0 && (

        
//             <Box
//               key={i}
//             sx={{
//               width:"100%",
//               margin:"5px 0",
//             //  height:"120vh"
//             }}
//             >  
//             <Paper
            
//               elevation={2}
//               sx={{
//                 p: 3,
//                 mx: 1.5,
//                 borderRadius: "12px",
//                 backgroundColor: "#fff",
//                 textAlign: "center",
//                 minHeight: 100,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >



// <ImageListItem
                
                
//                onClick={() => {
//                   //navigate(/booking/${doc._id});
//                   openDocDetails(doc?._id)
//                   scrollTo(0, 0);
//                 }}
//                 sx={{
//                   width: "100%",
//                   paddingBottom: "100%",
//                   overflow: "hidden",
//                   borderRadius: "50%",
//                   position: "relative",
//                   transition: "transform 0.3s ease",
//                   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
//                   },
//                 }}
//               >
//                 <img
//                   src={doc?.photo}
//                   alt={doc?.name}
//                   style={{
//                     width: '100%',
//                     height: "100%",
//                     position: "absolute",
//                     top: "0",
//                     left: "0",
//                     objectFit: "cover",
//                   }}
//                 />
//               </ImageListItem>
        

//         <Box
//         sx={{
//         //  position:'relative',

//         }}
//         > 
          
//               <Box
//               sx={{
//                 width:"100%",
//                 height:'100%',
//               //  zIndex:'999'

//               }}
//               >
//               <Typography 
//                   sx={{
//                     color:"black",
//                     fontSize:'18px',
//                     // zIndex:'999'
    
    
//                   }}
//               variant="h6" fontWeight={600}>
//                 {doc && doc?.name}
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mt: 0.5, fontStyle: "italic" }}
//               >
//                 {doc?.specialty}
//               </Typography>

//               <Typography
//                 variant="body2"
//                 sx={{ mt: 1, color: "#00796b", fontWeight: 500 }}
//               >
//                 Consulted: {doc.amount || 0} times
//               </Typography>


//               </Box>
//               </Box>
           

//               <Button
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   mt: 2,
//                   borderRadius: 5,                 
//                    textTransform: "none",
//                   borderColor: "#00796b",
//                   color: "#00796b",
//                   "&:hover": {
//                     backgroundColor: "#e0f2f1",
//                   },
//                 }}
//                 onClick={() => alert(Viewing ${doc?.name})}
//               >
//                 View Profile
//               </Button>
//             </Paper>
//             </Box>
          
    
//          )
           
//           ))}
          
//       </Carousel>
//     </Box>
//     </Box>
//   );
// };

// export default CarouselItem;







