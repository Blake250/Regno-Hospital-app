import { Box, Typography, ImageListItem, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import { getAllDoctors } from "../../feature/adminAuth/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

const DoctorList = () => {
  const doctor = useSelector((state) => state?.admin);
  const  {isLoading}  = useSelector((state) => state?.admin);

  const {user} = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  
      dispatch(getAllDoctors());

  }, [dispatch]);

  const { doctors } = useContext(AppContext);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };




  return (

    <>  
    {isLoading  && <Loader/> }
  
    <Box
      sx={{
        padding: "20px",
        textAlign: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d0e4ff 100%)",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {Array.isArray(doctor?.doctor?.doctors) &&
        doctor?.doctor?.doctors.length > 0 ? (
          doctor.doctor.doctors.slice(17, 32)?.map((item) => (
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
                  navigate(`/booking/${item._id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
                  "@media(max-width:768px)": {
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
                    sx={{
                      color: "green",
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {item && item?.available ? 'Available' : "Unavailable"}
                   
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
                  {item &&  item?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#7f8c8d", marginBottom: "4px" }}
                >
                  { item && item?.speciality}
                </Typography>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography>Loading or no doctors available...</Typography>
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

export default DoctorList;









// // import React from 'react'



// import { Box, Typography, ImageListItem, Paper, Button } from "@mui/material";

// import { useNavigate } from "react-router-dom";

// import { AppContext } from "../context/AppContext";
// import { useContext, useEffect } from "react";
// import { getAllDoctors } from "../../feature/adminAuth/adminSlice";
// import { useDispatch, useSelector } from "react-redux";

// const DoctorList = () => {

//     const doctor = useSelector((state) => state?.admin);
//     //  const {user} = useSelector((state) => state?.auth);
//     const  isLoading = useSelector((state) => state?.admin);
//     //console.log(  `is loading is ${JSON.stringify(isLoading)}`)
    
  
  
  
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       dispatch(getAllDoctors());
//     }, [dispatch]);
  


// //const navigate = useNavigate()
// const {doctors} = useContext(AppContext)


// const handleNavigate = (path)=>{
//     navigate(path)
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   return (
//     <Box sx={{ padding: "20px", textAlign: "center", background: "linear-gradient(135deg, #f0f4ff 0%, #d0e4ff 100%)", minHeight: "100vh" }}>


//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 3,
//         }}
//       >
//         {/* {doctors.slice(0, 12).map((item, index) => ( */}
//         {Array.isArray(doctor?.doctor?.doctors) &&
//         doctor?.doctor?.doctors.length > 0 ? (
//           doctor.doctor.doctors.slice(20, 30)?.map((item) => (
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
//                 src={item.image}
//                 alt={item.name}
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
//                  Available
//                 </Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e", marginBottom: "6px", fontSize: '13px' }}>
//                 {item.name}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#7f8c8d", marginBottom: "4px" }}>
//                 {item.speciality}
//               </Typography>
//             </Paper>
//           </Box>
//         ))}
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

// export default DoctorList;



















// const DoctorList = () => {
//   return (
//     <div>DoctorList</div>
//   )
// }

// export default DoctorList