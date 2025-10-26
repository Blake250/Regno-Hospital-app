













import { Box } from "@mui/material"
//import { useSelector } from "react-redux"

const Loader = () => {

  //  const {isLoading} = useSelector((state)=>state?.auth)
  return (
    <Box
    sx={{
      width:'100%',
      height:'100%',
      backgroundColor:' rgba(0, 0, 0, 0.7)!important' ,
      zIndex: '9',
    position: 'fixed'
    }}
    >
        <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
      //    height:'100vh',
          zIndex:'999',
          marginTop:'20%',
         
        }}
  
        >
     <img 
     style={{
      width:'15%',
     // height:'15%',

     }}
     src="./spinner/spinner.jpg" alt="" />
        </Box>
       
        
    </Box>

  )
}

export default Loader


