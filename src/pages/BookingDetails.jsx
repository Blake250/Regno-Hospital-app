
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    Divider,
    Button,
  } from '@mui/material'
  import React, { useEffect, useRef } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { useNavigate, useParams } from 'react-router-dom'
  import { getSingleBooking, login } from '../feature/auth/authSlice'
  import { toast } from 'react-toastify'
import Loader from '../components/loader/Loader'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

  
  const BookingDetails = () => {
    
    const dispatch = useDispatch()
    const { docId } = useParams()
    const { isLoading,   } = useSelector((state) => state?.auth)
    const {getThisAppointment, user,   } = useSelector((state) => state?.auth)
    console.log(`my data is this ${JSON.stringify(getThisAppointment) }`)
   // console.log(`i have a doc details coming as a ${JSON.stringify(user) } `)
   const pdfRef = useRef()
  
    useEffect(() => {
      if (docId) {
        dispatch(getSingleBooking(docId))
      }
    }, [docId, dispatch])
  


    
const downloadPDF = ()=>{
  const input = pdfRef.current
  html2canvas(input).then((canvas)=>{
   const imgData = canvas.toDataURL('image/png');
   const pdf = new jsPDF('p', 'mm', 'a4', true);
   const pdfWidth = pdf.internal.pageSize.getWidth();

   const pdfHeight = pdf.internal.pageSize.getHeight();
   const imageWidth = canvas.width
   const imageHeight = canvas.height
   const ratio = Math.min(pdfWidth / imageWidth, pdfHeight/ imageHeight);
   const imgX = (pdfWidth - imageWidth * ratio)/2;
   const imgY = 30;
   pdf.addImage(
     imgData,
     'PNG',
     imgX,
     imgY,
     imageWidth * ratio,
     imageHeight * ratio

   );
   pdf.save('Regno_Hospital.pdf')
  })
}


  
  const navigate = useNavigate()

    if (!getThisAppointment ) {
      return (
        <Typography variant="h6" align="center" sx={{ mt: 5, color: '#f44336' }}>
          Appointment not found.
        </Typography>
      )
    }
  
   const { docData, slotDate, slotTime, userId , userData} = getThisAppointment  
//   const { appointmentData } = getThisAppointment || {};
// const { userData, docData, slotDate, slotTime, userId } = appointmentData || {};

   
    
  
    return (

        <>   
        {isLoading  && <Loader/>}
      <Box
      
    ref= {pdfRef}
        sx={{
          px: { xs: 2, sm: 16 },
          py: 6,
          maxWidth: '1000px',
          mx: 'auto',
          backgroundColor: '#f9f9f9',
          borderRadius: 4,
          boxShadow: 3,
          mb:5, 
          mt:5
        }}
      >  


        {/* Gradient Heading */}
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            textAlign: 'center',
            background: 'linear-gradient(to right, #00b894, #00cec9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 5,
          }}
        >
          Appointment Summary
        </Typography>
  
        {/* Patient Info */}
        {/* <Card
          elevation={6}
          sx={{
            borderRadius: 3,
            mb: 4,
            background: '#fff',
          }}
        > */}

<Card
  elevation={6}
  sx={{
    borderRadius: 3,
    mb: 2, 
    background: '#fff',
    boxShadow: 3,
    py:2,
    transition: 'all 0.4s ease-in-out',
    transform: 'scale(1)',
    ':hover': {
      background: 'linear-gradient(135deg, #e0f7fa, #e1f5fe)',
      transform: 'scale(1.02)',
      boxShadow: 6,
    },
  }}
>



          <CardContent>
            <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
              👤 Patient Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={ userId && userId?.photo}
                  alt={userId?.name}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>
              <Grid item>
                <Typography><strong>Name:</strong> { userId && userId?.name  }</Typography>
                <Typography><strong>Email:</strong> {userId && userId?.email}</Typography>
                <Typography><strong>Phone:</strong> {userId && userId?.phone}</Typography>
                <Typography><strong>Role:</strong> {userId && userId?.role}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  
        {/* Doctor Info */}
        {/* <Card
          elevation={6}
          sx={{
            borderRadius: 3,
            mb: 4,
            background: '#fff',
          }}
        > */}

<Card
  elevation={6}
  sx={{
    borderRadius: 3,
    mb: 2, 
    background: '#fff',
    boxShadow: 3,
    p: 2,
    transition: 'all 0.4s ease-in-out',
    transform: 'scale(1)',
    ':hover': {
      background: 'linear-gradient(135deg, #e0f7fa, #e1f5fe)',
      transform: 'scale(1.02)',
      boxShadow: 6,
    },
  }}
>

          <CardContent>
            <Typography variant="h5" fontWeight={600} color="secondary" gutterBottom>
              🩺 Doctor Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={docData?.photo}
                  alt={docData?.speciality}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>
              <Grid item>
            
              {/* <Typography><strong>Name:</strong> { docData && docData?.user?.name}</Typography> */}
              <Typography><strong>Name:</strong> {getThisAppointment?.docId?.user?.name}</Typography>
              <Typography><strong>Experience:</strong> { docData &&  docData?.experience}</Typography>
              <Typography><strong>Fees:</strong> ${docData?.fees}</Typography>
                <Typography><strong>Speciality:</strong> {docData?.speciality}</Typography>
                <Typography><strong>Degree:</strong> {docData?.degree}</Typography>
                <Typography><strong>Email:</strong> {getThisAppointment?.docId?.user?.email}</Typography>
                
                
                <Typography>
                  <strong>Address:</strong> {docData?.address?.line1}, {docData?.address?.line2}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  
        {/* Appointment Slot Info */}
        {/* <Card elevation={6} sx={{ borderRadius: 3, background: '#fff' }}> */}
        <Card
  elevation={6}
  sx={{
    borderRadius: 3,
    background: '#fff',
    boxShadow: 3,
    p: 2,
    mb: 2, 
    transition: 'all 0.4s ease-in-out',
    transform: 'scale(1)',
    ':hover': {
      background: 'linear-gradient(135deg, #e0f7fa, #e1f5fe)',
      transform: 'scale(1.02)',
      boxShadow: 6,
    },
  }}
>

          <CardContent>
            <Typography variant="h5" fontWeight={600} color="success.main" gutterBottom>
              ⏰ Appointment Time
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" fontSize={18} mb={1}>
              <strong>Date:</strong> {
              slotDate
            
              }
            </Typography>
            <Typography variant="body1" fontSize={18}>
              <strong>Time:</strong> {slotTime}
            </Typography>
          </CardContent>
        </Card>


        <Box
      sx={{
        display:'flex',
        justifyContent:'space-around',
         alignItems:'center',
        // alignContent:'space-around',
       paddingTop:'10px'



      }}
      >
        <Button
        variant='outlined'
        small
       onClick={()=> navigate(`/my-booking`)}

          sx={{
            textAlign:'start',
           // marginTop:'10px',
          }}
        >
            &larr;
            previous Page
        </Button>

  {   getThisAppointment && getThisAppointment?.payment  &&

   (

        <Button
     onClick={downloadPDF}
      variant='contained'
      small
      //size='small'
      sx={{ 
        
        textAlign: 'center' }}
    >
      Download as PDF
    </Button>

      )
 }
      </Box>

    </Box>

      </>
    )

  
  }
  
  export default BookingDetails
  



