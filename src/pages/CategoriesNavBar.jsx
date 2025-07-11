// import { Box, Typography, ImageListItemBar, Paper } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../components/context/AppContext";
// import { doctors } from "../assets/prescripto_assets/assets/assets_frontend/assets";

// // Categories Navbar Component
// const CategoriesNavbar = ({ setSpeciality }) => {
//   // const categories = [
//   //   "General Physician",
//   //   "Gynecologist",
//   //   "Dermatologist",
//   //   "Pediatricians",
//   //   "Neurologist",
//   //   "Gastroenterologist",
//   // ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "20px",
//         padding: "10px 0",
//         backgroundColor: "#f7f7f7",
//         borderBottom: "1px solid #e0e0e0",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       {doctors.map((doctor, index) => (
//         <Typography
//           key={index}
//           onClick={() => setSpeciality(doctor)}
//           sx={{
//             cursor: "pointer",
//             fontSize: "14px",
//             fontWeight: "bold",
//             color: "#34495e",
//             padding: "5px 10px",
//             borderRadius: "8px",
//             transition: "0.3s",
//             "&:hover": {
//               backgroundColor: "#e0e7ff",
//               color: "#1e40af",
//             },
//           }}
//         >
//           {doctor}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// export default CategoriesNavbar