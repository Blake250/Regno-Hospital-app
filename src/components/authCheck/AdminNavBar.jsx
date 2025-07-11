import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AdminNavBarLayer = (props) => {
  
const navigate = useNavigate()  

  return (
    <Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}> */}
      <Box
      sx={{
       display: 'flex',
       flexDirection: 'row', 
        gap: 2, 
        justifyContent:'flex-end  ',  
        alignItems:'center',  
        verticalAlign:'bottom',
       padding: 2,
      }}
      >
     <Box
     
     sx={{
      display:'flex',
      alignItems:'center'

     }}
     >
     <Typography
     sx={{
      fontSize: '18px',
     // backgroundColor: '#0033cc',
      color: '#0033cc', 
      cursor: 'pointer',
      fontWeight: '600',  
      '@media (max-width: 600px)': {
        fontSize: '16px',
      },  
      
     }}
     >
         {props.title} 
       </Typography>

     </Box>
    
       <Box
      
      onClick={() => navigate('/')} 
       >
        {props.iconBar}
       </Box>
       
        </Box>
    </Box>
  )   
}

export default AdminNavBarLayer
