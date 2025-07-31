import axios from  'axios'
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


 export const API_URL = 'https://regno-hospital-api.onrender.com/api/user'
console.log(`here we come the ${API_URL}`)



// registering a user
const register = async(userData)=>{
  //  const response = await axios.post(`${API_URL}/register`,userData,{
        const response = await axios.post(`https://regno-hospital-api.onrender.com/api/user/register`,userData,{
        withCredentials: true,
        //credentials: 'include',
       headers: {"Content-Type" :'application/json'}
    })
   console.log(`this response is coming from ${response}`)
    return response.data
}



// login a user
const login = async(userData)=>{
    const response = await axios.post(`https://regno-hospital-api.onrender.com/api/user/login`, userData,{
      //     const response = await axios.post(`${API_URL}/login`, userData,{
        withCredentials: true,
        //credentials: 'include',
        headers: {'Content-Type' : 'application/json'},
       
    })

   // return response && response?.data
    return response.data
}



//logout a User
const logout = async()=>{
    const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/logout`,{
     //   const response = await axios.get(`${API_URL}/logout`,userData,{
        withCredentials: true,
        //credentials: 'include',
        headers:{'Content-Type': 'application/json'}
    })
   // return response?.data && response?.data?.message
 
   return  response.data.message
  //  localStorage.removeItem('profile');

   
}



//get user Login status
const getLoginStatus = async()=>{
    const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/get-status`, {
        // const response = await axios.get(`${API_URL}/get-status`, {
        withCredentials: true,
        //credentials: 'include',
        headers:{'Content-Type': 'application/json'} 
    })
   // return response.data
//   return response && response?.data
  return response.data.isLoggedIn
}


//get User data 
const getUser = async()=>{
     const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/get-user`, {
     //   const response = await axios.get(`${API_URL}/get-user`, {
        withCredentials:true,
        //credentials: 'include',
        headers:{'Content-Type':'application/json'}
    })
    return response.data
    // return response && response?.data
}


//update user's updatePhoto
const updatedPhoto = async(userData)=>{
    const response = await axios.patch(`https://regno-hospital-api.onrender.com/api/user/update-photo`, userData,{
       //   const response = await axios.patch(`${API_URL}/update-photo`, userData,{
        withCredentials: true,
        //credentials: 'include',
        headers:{'Content-Type' : 'application/json'}
    })
    return response.data
    //return response && response?.data
}

const updatedUser = async(userData)=>{
    const response = await axios.patch(`https://regno-hospital-api.onrender.com/api/user/update-user`, userData,{
      //  const response = await axios.patch(`${API_URL}/update-user`, userData,{
        withCredentials:true,

        //credentials: 'include',
        headers:{'Content-Type':'application/json'}

    })
    return response.data
}

// get otr fetch  A single booking or appointment with a doctor
const getSingleBooking = async(docId)=>{
    const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/appointments/${docId}`, {
        // const response = await axios.get(`${API_URL}/appointments/${docId}`, {
        withCredentials : true,
        headers:{'Content-Type':'application/json'}

    }  )
  return   response.data
}

// get a doctor's single page 
const getOneDoctor= async(id)=>{
    const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/fetch-doc/${id}`, {
    //     const response = await axios.get(`${API_URL}/fetch-doc/${id}`, {
        withCredentials : true,
        headers:{'Content-Type':'application/json'}

    }  )
  return   response.data
}



//get all doctors registered by admin   
export const  getAllDoctors = async()=>{
    const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/get-docs`, {
   //     const response = await axios.get(`${API_URL}/get-docs`, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    });
    
   // console.log(`this is the response from get all doctors ${JSON.stringify(response.data)}` );
    return response.data

}



// booking an appointment
const bookAppointment = async( {docId, bookingData} )=>{
    const response = await axios.post(`https://regno-hospital-api.onrender.com/api/user/doc-booking/${docId}`,
      //   const response = await axios.post(`${API_URL}/doc-booking/${docId}`,
        bookingData,
        {
            withCredentials:true,
            headers:{'Content-Type': 'application/json'}
        }

    )
    return response.data
}

 
// get All  bookings by a single user
const getAllBookings = async()=>{
 const response = await axios.get(`https://regno-hospital-api.onrender.com/api/user/appointments`,
   //  const response = await axios.get(`${API_URL}/appointments`,
   {
    withCredentials:true,
    headers: {'Content-Type':'application/json' }
   }
   
 )
 return response.data
}


// get All  bookings by a single user
const cancelAppointment = async(appointmentId)=>{
    const response = await axios.patch(`https://regno-hospital-api.onrender.com/api/user/cancel-doc`,
       //  const response = await axios.patch(`${API_URL}/cancel-doc`,
        appointmentId,
      {
       withCredentials:true,
       headers: {'Content-Type':'application/json' }
      }
      
    )
    return response.data
   }
   

   // get All  bookings by a single user
const updatePaymentMethod = async({appointmentId, paymentMethod})=>{
    const response = await axios.patch(`https://regno-hospital-api.onrender.com/api/user/${appointmentId}/payment-method`,
       // const response = await axios.patch(`${API_URL}/${appointmentId}/payment-method`,
        {paymentMethod},
    
      {
       withCredentials:true,
       headers: {'Content-Type':'application/json' }
      }
      
    )
    return response.data
   }









const authService = {
      register,
      login,
      logout,
      
      getLoginStatus,
      getUser,
      updatedPhoto,
      updatedUser,
      getSingleBooking,
      getOneDoctor,
      bookAppointment,
    getAllBookings,
    cancelAppointment,
    updatePaymentMethod ,
    getAllDoctors
      //updatePaymentMethod


}







 export default authService