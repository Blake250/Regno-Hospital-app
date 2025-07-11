import { createAsyncThunk,createSlice  } from "@reduxjs/toolkit";
import  {adminService}  from "./adminService";  
import { toast } from "react-toastify"; 







//adding a doctor  by admin
export const addDoctor = createAsyncThunk('admin/addDoctor', async(doctorData, {rejectWithValue})=>{
    try{
        return await adminService.addDoctor(doctorData)
}catch(error){
    const message = (error.response && error.response.data && error.response.data.message ) ||
    error.message || error.toString()
    console.log(`addDoctor error is ${message}`)    
    return rejectWithValue(message)

}

  } )

// add a doctor's photo 
  export const doctorPhoto = createAsyncThunk('admin/doctorPhoto', async(docPhoto, {rejectWithValue})=>{
    try{
        return await adminService.doctorPhoto(docPhoto)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        console.log(`doctorPhoto error is ${message}`)
        return rejectWithValue(message)
    }
  }  )

  //get all doctors registered by admin
  export const getAllDoctors = createAsyncThunk('admin/getAllDoctors', async(_, {rejectWithValue})=>{
try{
  return await adminService.getAllDoctors()
}catch(error){
  const message =(error.response && error.response.data && error.response.data.message) ||
  error.message || error.toString()
  console.log(`getAllDoctors error is ${message}`)
  return rejectWithValue(message)  
}  

   }  )

//get all appointments as an admin  
export const appointmentAdmin = createAsyncThunk('admin/appointmentAdmin', async(_, {rejectWithValue})=>{
    try{
        return await adminService.appointmentAdmin()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        console.log(`appointmentAdmin error is ${message}`)
        return rejectWithValue(message)
    }
  } ) 


  // get all cancel appointments as an admin  
export const appointmentCancel = createAsyncThunk('admin/appointmentCancel', async(_, {rejectWithValue})=>{
    try{
        return await adminService.appointmentCancel()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        console.log(`appointmentCancel error is ${message}`)
        return rejectWithValue(message)
    }
  }
  )


  //initial state for admin

  const initialState = {
    isLoggedIn  : false,    
    isLoading: false,   
    isError: false, 
    isSuccess : false,  
    message: '', 
    doctor: null,  
    appointments : [],     
    cancelledAppointments: [],  
  }

  const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        RESET_ADMIN : (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''; 
            state.isLoggedIn = false;
            state.doctor = null

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addDoctor.pending, (state)=>{
          state.isLoading = true;
        })
        .addCase(addDoctor.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn= true;
            state.doctor = action.payload
            console.log(`this is the response from add doctor ${action.payload}` )  
            //toast.success(action.payload)
            toast.success(JSON.stringify(action.payload) || 'Doctor added successfully!')

     }  )
     .addCase(addDoctor.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.doctor = null;
        toast.error(action.payload)
        console.log(`this is the error from add doctor ${action.payload}` ) 
     })



     // update a doctor's photo 
     .addCase(doctorPhoto.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(doctorPhoto.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = true;
          state.doctor = action.payload;
          console.log(`this is the response from update doctor photo ${action.payload}` )  
          toast.success('Doctor photo updated successfully!')

      })
      .addCase(doctorPhoto.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
          state.doctor = null;
          toast.error(action.payload)
          console.log(`this is the error from update doctor photo ${action.payload}` ) 
      })    	

    .addCase(getAllDoctors.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isSuccess = true;
     //     state.isLoggedIn = true;
         state.doctor = action.payload || []; // Ensure doctor is an array
     
     //    console.log(`this is the response from get all doctors ${  JSON.stringify(action.payload ) }` )  
         // toast.success('Doctors fetched successfully!')

      }) 
      .addCase(getAllDoctors.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
        //  state.doctor = null;
          toast.error(action.payload)
         console.log(`this is the error from get all doctors ${action.payload}` ) 
      })


      // get all appointments as an admin 
    .addCase(appointmentAdmin.pending, (state)=>{
        state.isLoading = true;
      })  
      .addCase(appointmentAdmin.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = true;
          state.appointments = action.payload;
        //  console.log(`this is the response from get all appointments ${action.payload}` )  
     //     toast.success('Appointments fetched successfully!')

      })  
      .addCase(appointmentAdmin.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
          state.appointments  = null;
          toast.error(action.payload)
     //     console.log(`this is the error from get all appointments ${action.payload}` ) 
      })  


      // fetch all cancelled appointments as an admin 
    .addCase(appointmentCancel.pending, (state)=>{
        state.isLoading = true;
      })  
      .addCase(appointmentCancel.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = true;
          state.cancelledAppointments = action.payload; 
       //   console.log(`this is the response from get all cancelled appointments ${JSON.stringify(action.payload)}` )  
        //  toast.success('Cancelled appointments fetched successfully!')

      })  
      .addCase(appointmentCancel.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
          state.cancelledAppointments = [];
          toast.error(action.payload)
   //       console.log(`this is the error from get all cancelled appointments ${action.payload}` ) 
      })  


 

    }

  })

  export const {RESET_ADMIN} = adminSlice.actions
  export default adminSlice.reducer
