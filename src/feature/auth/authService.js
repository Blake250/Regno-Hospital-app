import axios from  'axios'
//const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BACKEND_URL = 'https://regno-hospital-api.onrender.com'

console.log(`this is the ${BACKEND_URL}`)
console.log(import.meta.env);




export const API_URL = `${BACKEND_URL}/api/user`
console.log(`here we come the ${API_URL}`)



// registering a user
const register = async(userData)=>{
    const response = await axios.post(`${API_URL}/register`,userData,{
        withCredentials: true,
        //credentials: 'include',
       headers: {"Content-Type" :'application/json'}
    })
   console.log(`this response is coming from ${response}`)
    return response.data
}



// login a user
const login = async(userData)=>{
    const response = await axios.post(`${API_URL}/login`, userData,{
        withCredentials: true,
        //credentials: 'include',
        headers: {'Content-Type' : 'application/json'},
       
    })

   // return response && response?.data
    return response.data
}



//logout a User
const logout = async()=>{
    const response = await axios.get(`${API_URL}/logout`,{
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
    const response = await axios.get(`${API_URL}/get-status`, {
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
    const response = await axios.get(`${API_URL}/getUser`, {
        withCredentials:true,
        //credentials: 'include',
        headers:{'Content-Type':'application/json'}
    })
    return response.data
    // return response && response?.data
}


//update user's updatePhoto
const updatedPhoto = async(userData)=>{
    const response = await axios.patch(`${API_URL}/update-photo`, userData,{
        withCredentials: true,
        //credentials: 'include',
        headers:{'Content-Type' : 'application/json'}
    })
    return response.data
    //return response && response?.data
}

const updatedUser = async(userData)=>{
    const response = await axios.patch(`${API_URL}/update-user`, userData,{
        withCredentials:true,
        //credentials: 'include',
        headers:{'Content-Type':'application/json'}

    })
    return response.data
}

// get otr fetch  A single booking or appointment with a doctor
const getSingleBooking = async(docId)=>{
    const response = await axios.get(`${API_URL}/appointments/${docId}`, {
        withCredentials : true,
        headers:{'Content-Type':'application/json'}

    }  )
  return   response.data
}

// get a doctor's single page 
const getOneDoctor= async(id)=>{
    const response = await axios.get(`${API_URL}/fetch-doc/${id}`, {
        withCredentials : true,
        headers:{'Content-Type':'application/json'}

    }  )
  return   response.data
}


// booking an appointment
const bookAppointment = async( {docId, bookingData} )=>{
    const response = await axios.post(`${API_URL}/doc-booking/${docId}`,
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
 const response = await axios.get(`${API_URL}/appointments`,
   {
    withCredentials:true,
    headers: {'Content-Type':'application/json' }
   }
   
 )
 return response.data
}


// get All  bookings by a single user
const cancelAppointment = async(appointmentId)=>{
    const response = await axios.patch(`${API_URL}/cancel-doc`,
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
    const response = await axios.patch(`${API_URL}/${appointmentId}/payment-method`,
        {paymentMethod},
    
      {
       withCredentials:true,
       headers: {'Content-Type':'application/json' }
      }
      
    )
    return response.data
   }




//    const handleSelectPaymentMethod = async (method) => {
//     try {
//       const { data } = await axios.patch(
//         `/api/appointments/payment-method/${appointmentId}`,
//         { paymentMethod: method },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       // Redirect to Stripe or PayPal checkout
//       window.location.href = data.redirectTo;
//     } catch (err) {
//       console.error(err.response?.data?.message || err.message);
//     }
//   };
  





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
    updatePaymentMethod 


}







 export default authService