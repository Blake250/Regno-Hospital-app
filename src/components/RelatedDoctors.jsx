import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { useState } from 'react'
import { Box, Button, ImageListItem, Paper, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllDoctors } from '../feature/adminAuth/adminSlice'

const RelatedDoctors = ({speciality,docId, isLoading  }) => {
  const   {doctor}   = useSelector ((state) => state?.admin)
 // console.log('doctor data  looks like this :', JSON.stringify(doctor))
  

const dispatch  = useDispatch()


useEffect(() => {
  dispatch(getAllDoctors());
}, [dispatch]);

const navigate = useNavigate()  
const [relDocs, setRelDocs] = useState([])   






    useEffect(()=>{
      console.log('useEffect triggered with doctor:', doctor, 'docId:', docId, 'speciality:', speciality)
        if(  doctor?.doctors?.length > 0 && speciality){
          const doctors = doctor?.doctors?.filter((doc)=> doc?.speciality === speciality && doc?._id.toString() !== docId.toString() )
          setRelDocs(doctors)
       }
           
   },[doctor, docId,speciality])

    if (!relDocs || relDocs?.length === 0) {
  //    toast.error('No related doctors found') 
      return <p>No related doctors available.</p>;
    }

    if (!relDocs && !relDocs?.speciality) {
     // toast.error('No related doctors found')
     // console.log('No related doctors found')
      return  <Box>No Doctors  related Found </Box>; // or a loading spinner
    }
    
    

  return (
    <>   
    {isLoading && <Loader/>}
    <Box>
        <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          '@media(max-width:768px)':{
         //   gap:2,
          //  justifyContent: "start",
          marginRight:'80px'
          }
        }}
      >
        { Array.isArray(relDocs) && relDocs?.length > 0 &&  relDocs?.slice(0 ,4)?.map((item, index) => (
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
            onClick = {()=> {navigate(`/booking/${item?._id}`);scrollTo(0,0) }}
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
              src={ item &&  item?.photo } alt={ item  && item?.user?.name} 

                // src={item?.user?.photo}
                // alt={item?.user?.name}
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
                '@media(max-width:768px)':{
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
                  display:'flex',


                   
                  }}
                />
                 <Typography variant="body2" sx={{ color: "green", fontSize: "10px", cursor:'pointer' }}>
                 Available
                </Typography>

                 </Box>
                <Box
                sx={{
                  display:'flex',
                 flexDirection: "column",
                 justifyContent:"center",
                  alignItems:"center"
                }}
                >  
               
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e", marginBottom: "3px", fontSize: '13px' }}>
                {item && item?.user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d", marginBottom: "4px" }}>
                {item && item?.speciality}
              </Typography>
              
              
              </Box>
            
            </Paper>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          position: 'relative',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '10px',
            width: '150px',
          }}
        onClick={()=>{navigate(`/doctors`  )
          
         window.scrollTo({ top: 0, behavior: "smooth" })

         }   }>     
      
       
          More
        </Button>
      </Box>    
    </Box>

    </>
  )
}

export default RelatedDoctors