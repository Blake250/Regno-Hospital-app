
import { Avatar, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { specialityData } from "../assets/prescripto_assets/assets/assets_frontend/assets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllDoctors } from "../feature/adminAuth/adminSlice";

const SpecialtyMenu = () => {
   const doctor = useSelector((state) => state?.admin);
   //const {user} = useSelector((state) => state?.auth);
   //console.log(`my user data looks this ${JSON.stringify(user) }`)
  // console.log(`my doctors data looks this ${JSON.stringify(doctor) }`)



   const dispatch = useDispatch();
   const navigate = useNavigate();
 


   useEffect(() => {
  
      dispatch(getAllDoctors());
    
   
   }, [dispatch, ]);
 





  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        //padding: '25px',
        background: 'linear-gradient(135deg, #e0f7fa 30%, #80deea)',
        borderRadius: '12px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
   //     justifyContent:'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#006064',
            fontWeight: 'bold',
            marginBottom: '4px',
          }}
        >
          Find Specialty
        </Typography>

        <Typography
          sx={{
            fontSize: '14px',
            color: '#004d40',
            fontStyle: 'italic',
          }}
        >
          Simply browse through our extensive list of trusted doctors
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: '10px',
          padding: '10px',
          width: '100%',
          marginRight :'90px',
        gridTemplateColumns: 'repeat(6, minmax(150px, 1fr))',
        
          // Responsive styles for medium screens
          '@media(max-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)!important', 
            marginRight :'0px',// 3 items per row on medium screens
          },
        }}
      >
        {specialityData &&
          specialityData.map((item, index) => (
            <Link key={index} to={`/doctors/${item.speciality}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '5px',
         
                  '@media(max-width: 768px)': {
                    paddingRight:'50px',
                  
                  },
                }}
              >
                <Avatar
                  src={item.image}
                  alt={item.speciality}
                  sx={{
                    width: '80px',
                    height: '80px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                      
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#004d40',
                    marginTop: '8px',
                  }}
                >
                  {item.speciality}
                </Typography>
              </Box>
            </Link>
          ))}
      </Box>
    </Box>
  );
};

export default SpecialtyMenu;




// import { Avatar, Box, Typography } from "@mui/material";
// //import { specialityData } from "../../public/prescripto_assets/assets/assets_frontend/assets";
// import { Link } from "react-router-dom";
// import { specialityData } from "../assets/prescripto_assets/assets/assets_frontend/assets";

// const SpecialtyMenu = () => {
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100%',
//         padding: '25px',
//         background: 'linear-gradient(135deg, #e0f7fa 30%, #80deea)',
//         borderRadius: '12px',
//         boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//          display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         // justifyContent:'center',
//         gap: '15px',
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           // justifyContent:'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           gap: '8px',
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             color: '#006064',
//             fontWeight: 'bold',
//             marginBottom: '4px',
//           }}
//         >
//           Find Specialty
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: '14px',
//             color: '#004d40',
//             fontStyle: 'italic',
//           }}
//         >
//           Simply browse through our extensive list of trusted doctors
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           display: 'flex',
//           gap: '20px',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//           padding: '10px',
//           '@media(max-width: 768px)': {
//          //   width: '100%',
//             marginRight: '35px',
//           }
//         }}
//       >
//         {specialityData &&
//           specialityData.map((item, index) => (
//             <Link key={index} to={`/doctors/${item.speciality}`} style={{ textDecoration: 'none' }}>
//               <Box
//                 sx={{
//                   //display: 'flex',
//                   display: 'grid',
//                   flexDirection: 'column',
               
//                   alignItems: 'center !important',
//                   justifyContent:'center !important',
//                   textAlign: 'center',
//                   gap:'5px',
//                   '@media(max-width:768px)':{
//                     width:'100%',
//                     display:'flex',
                   
//                     gridTemplateColumns:'repeat(2, 1fr )',
//                 //    alignItems:'center',
                    
//                     gap: '15px',
//                      flexDirection: 'column',
                    
//                   }
//                 }}
//               >
//                 <Avatar
//                   src={item.image}
//                   alt={item.speciality}
//                   sx={{
//                     width: '60px',
//                     height: '60px',
//                     transition: 'transform 0.3s, box-shadow 0.3s',
//                     '&:hover': {
//                       transform: 'scale(1.1)',
//                       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
//                     },
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     fontSize: '14px',
//                     color: '#004d40',
//                     marginTop: '8px', // Space between avatar and text
//                   }}
//                 >
//                   {item.speciality}
//                 </Typography>
//               </Box>
//             </Link>
//           ))}
//       </Box>
//     </Box>
//   );
// };

// export default SpecialtyMenu;







