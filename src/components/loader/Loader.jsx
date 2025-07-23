


import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Full viewport height
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',           // <== move flex properties here
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        style={{
          width: '15%',
        }}
        src="./spinner/spinner.jpg"
        alt="Loading..."
      />
    </Box>
  );
};

export default Loader;













// import { Box } from "@mui/material"
// //import { useSelector } from "react-redux"

// const Loader = () => {

//   //  const {isLoading} = useSelector((state)=>state?.auth)
//   return (
//     <Box
//     sx={{
//       width:'100%',
//       height:'100%',
//       backgroundColor:' rgba(0, 0, 0, 0.7)!important' ,
//       zIndex: '9',
//     position: 'fixed'
//     }}
//     >
//         <Box
//         sx={{
//           display:'flex',
//           justifyContent:'center',
//           alignItems:'center',
//       //    height:'100vh',
//           zIndex:'999'
//         }}
  
//         >
//      <img 
//      style={{
//       width:'15%',


//      }}
//      src="./spinner/spinner.jpg" alt="" />
//         </Box>
       
        
//     </Box>

//   )
// }

// export default Loader


