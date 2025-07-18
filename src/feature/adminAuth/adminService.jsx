import axios from 'axios';  

//const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BACKEND_URL = 'https://regno-hospital-api.onrender.com'

const API_URL = `${BACKEND_URL}/api/admin`
console.log(`this is the ${API_URL}`)   


// ADD  doctor as an admin
export const addDoctor = async(doctorData )=>{
   const response = await axios.post(`${API_URL}/add-doc`,doctorData,{
    withCredentials:true,
    headers:{'Content-Type':'application/json'}
   } )
   
   console.log(`this is the response from add doctor ${response.data}` )
    return response.data


}

//update  a doctor's photo  
export const doctorPhoto = async( docPhoto)=>{
    const response = await axios.patch(`${API_URL}/doc-photo`, docPhoto, {
        withCredentials: true,
      //  headers: {'Content-Type': 'application/json'},
        headers: {'Content-Type': 'multipart/form-data'}    
    });
    
    console.log(`this is the response from update doctor photo ${response.data}` );
    return response.data;
}   

//get all doctors registered by admin   
export const  getAllDoctors = async()=>{
    const response = await axios.get(`${API_URL}/get-docs`, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    });
    
   // console.log(`this is the response from get all doctors ${JSON.stringify(response.data)}` );
    return response.data

}

// get all appointments as an admin
export const appointmentAdmin = async()=>{
    const response = await axios.get(`${API_URL}/get-booking`, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    });
    
    console.log(`this is the response from get all appointments ${JSON.stringify( response.data) }` );
    return response.data;   

}


// fetch all cancel appointments as an admin 
export const appointmentCancel = async()=>{
    const response = await axios.get(`${API_URL}/cancel`, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    });
    
    console.log(`this is the response from get all cancel appointments ${JSON.stringify(response.data)}` );
    return response.data;   

}



export const adminService = {
    addDoctor   ,
    doctorPhoto,
    getAllDoctors ,
    appointmentAdmin  ,
    appointmentCancel   
}
