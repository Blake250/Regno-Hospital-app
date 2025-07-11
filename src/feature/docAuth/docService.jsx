import axios from  'axios'





const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const API_URL = `${BACKEND_URL}/api/docOnly`
console.log(`this is the ${API_URL}`)   




const getAllDocsBookings = async(docId)=>{
    const response = await axios.get(`${API_URL}/doc-booked/${docId}`,{
        withCredentials: true,
        //credentials: 'include',
       headers: {"Content-Type" :'application/json'}
    })
   console.log(`this response is coming from ${response}`)
    return response.data
}


const cancelAppointment = async(docAppointment)=>{
    const response = await axios.patch(`${API_URL}/cancel-appointment`, docAppointment,
        {
        withCredentials: true,
        //credentials: 'include',
       headers: {"Content-Type" :'application/json'}
    })
   console.log(`this response is coming from ${response}`)
    return response.data
}














 const docService = {

    getAllDocsBookings,
    cancelAppointment
}






export default docService