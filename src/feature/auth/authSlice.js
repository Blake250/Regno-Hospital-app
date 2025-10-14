import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";




// register a user
export const register = createAsyncThunk('auth/register',async(userData,{rejectWithValue})=>{
try{
    return await authService.register(userData)
}catch(error){
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString()
    console.log(message);
    return rejectWithValue(message)
}

})


//login a user
export const login = createAsyncThunk('auth/login',  async(userData, {rejectWithValue})=>{
   try{
     return await authService.login(userData)

   }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString()
    console.log(message)
    return rejectWithValue(message)
   }
})


//logout a User
export const logOutUser = createAsyncThunk('auth/logout', async(_, {rejectWithValue})=>{
    try {
        return await authService.logout()
    } catch (error) {
       const message = (error.response  && error.response.data &&  error.response.data.message  ) ||
       error.message || error.toString()
       console.log(message)
      return  rejectWithValue(message)
    }
   
})



// getting the login status
export const getLoginStatus = createAsyncThunk('auth/getLoginStatus', async(_, {rejectWithValue})=>{
    try {
        return await authService.getLoginStatus()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        console.log(`getLoginStatus error is ${message}`)
        return rejectWithValue(message)
    }
})


//get User data
export const getUser = createAsyncThunk('auth/get-user', async(_ ,{rejectWithValue})=>{
    try {
     return   await authService.getUser()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        console.log(message)
        rejectWithValue(message)
      //  localStorage.getItem('profile')
        return
    
    }
})



//update user's Photo
export const updatedPhoto = createAsyncThunk('auth/updatedPhoto', async(userData,{rejectWithValue} )=>{
    try{
   return await authService.updatedPhoto(userData)
    }catch(error){
const message = (error.response && error.response.data && error.response.data.message) || error.message
|| error.toString()
return rejectWithValue(message)
    }
})


//update user's Data
export const updatedUser = createAsyncThunk('auth/updatedUser', async(userData, {rejectWithValue})=>{
    try {

        
        return await authService.updatedUser(userData)
    } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
      return  rejectWithValue(message)
    }
}  )

//get or fetch a single doctor bookings
export const getSingleBooking = createAsyncThunk('auth/getSingleBooking', async(docId, {rejectWithValue})=>{
    try {

        
        return await authService.getSingleBooking(docId)
    } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
      return  rejectWithValue(message)
    }
}  )



//view a doctor's details
export const getOneDoctor = createAsyncThunk('auth/getOneDoctor', async(id, {rejectWithValue})=>{
    try {

        
        return await authService.getOneDoctor(id)
    } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
      return  rejectWithValue(message)
    }
}  )




  //get all doctors registered by admin
  export const getAllDoctors = createAsyncThunk('auth/getAllDoctors', async(_, {rejectWithValue})=>{
try{
  return await authService.getAllDoctors()
}catch(error){
  const message =(error.response && error.response.data && error.response.data.message) ||
  error.message || error.toString()
  console.log(`getAllDoctors error is ${message}`)
  return rejectWithValue(message)  
}  

   }  )


//book an appointment by a user 
export const bookAppointment = createAsyncThunk(`auth/bookAppointment`, async({docId, bookingData},  {rejectWithValue} )=>{
    try {
        return await authService.bookAppointment({docId,bookingData})
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message
        || error.toString()
        return rejectWithValue(message)
        
    }
})

// get all bookings by a single user
export const getAllBookings = createAsyncThunk(`auth/getAllBookings`, async(_,{rejectWithValue} )=>{
    try {
        return await authService.getAllBookings()
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message )
        || error.message || error.toString()
        return rejectWithValue(message)
    }
})


// cancel An Appointment
export const cancelAppointment = createAsyncThunk(`auth/cancelAppointment`, async(appointmentId, {rejectWithValue} )=>{
    try {
        return await authService.cancelAppointment(appointmentId)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message )
        || error.message || error.toString()
        return rejectWithValue(message)
    }
})



//select payment method bt user
 export const updatePaymentMethod = createAsyncThunk(`auth/updatePaymentMethod`, async({appointmentId,paymentMethod},{rejectWithValue} )=>{
    try {
        return await authService.updatePaymentMethod({appointmentId,paymentMethod})
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message )
        || error.message || error.toString()
        return rejectWithValue(message)
    }


})
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";







// let userFromStorage = null;
// try {
//   const stored = localStorage.getItem("profile");
//   if (stored) {
//     userFromStorage = JSON.parse(stored);
//   }
// } catch (error) {
//   console.error("Failed to parse user from localStorage:", error);
//   localStorage.removeItem("profile"); // remove corrupted data
// }


let userFromStorage = null;
try {
  const stored = localStorage.getItem("profile");
  if (stored && stored !== "undefined" && stored !== "null") {
    userFromStorage = JSON.parse(stored);
  }
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
  localStorage.removeItem("profile");
}




const initialState = {

   isLoggedIn: !!userFromStorage,
  //  user:null,
   user: userFromStorage || null,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
    storedPhoto: null,  
    storedUserDetails: null,
    docData : null,
   getThisAppointment : [] ,
   doctor: []
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        RESET_AUTH :(state)=>{
            state.isLoggedIn = false;
            state.user = null;
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = false;
            state.message = '';
       state.storedUserDetails = localStorage.removeItem('profile')

        },
        setUser:(state, action)=>{
          // state.storedUserDetails = action.payload
            localStorage.setItem('profile', JSON.stringify(action.payload))
            state.isLoggedIn = true;
            state.isSuccess = true  ;
            state.isError = false;  
            state.isLoading = false;    
            state.message = ''  
            state.user = action.payload     
        },
        setUserPhoto:(state, action)=>{
            state.storedPhoto = action.payload
            state.isLoggedIn = true;
            state.isSuccess = true  ;
            state.isError = false;  
            state.isLoading = false;    
            state.message = ''  
        }
    },


    // register a user
    extraReducers: (builder)=>{
   builder
   .addCase(register.pending, (state)=>{
    state.isLoading = true
   })

 .addCase(register.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isLoggedIn = true
  state.user = action.payload;
  //  state.user = null;
    state.isSuccess = true;
   console.log(action.payload)

 })
 .addCase(register.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.user = null;
    toast.error(action.payload)
    console.log(action.payload)
 })



 //login user
 .addCase(login.pending, (state)=>{
   state.isLoading = true;
 })

 .addCase(login.fulfilled, (state, action)=>{
    state.isLoggedIn = true;
    state.isSuccess = true;
    state.user = action.payload;
    
    state.isLoading = false
   localStorage.setItem('profile', JSON.stringify(action.payload)); // 3
    toast.success(action.payload)
    console.log(action.payload)
 })
.addCase(login.rejected,(state,action)=>{
    state.isError = true;
    state.message = action.payload;
    state.user = null;
    state.isLoggedIn = false
} )


// logout user
.addCase(logOutUser.pending, (state)=>{
    state.isLoading = true
})
.addCase(logOutUser.fulfilled, (state,action)=>{
   localStorage.removeItem('profile');
    state.isLoading = false;
    state.isSuccess = true;
    state.isLoggedIn = false;
    state.user = null;
    toast.success(action.payload)
    console.log(action.payload)

})
.addCase(logOutUser.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload)
})



// get Login status
.addCase(getLoginStatus.pending, (state)=>{
    state.isLoading = true
})

.addCase(getLoginStatus.fulfilled, (state,action)=>{
    state.isSuccess = true;
    state.isLoggedIn = action.payload
    state.isLoading = false
    //toast.success(action.payload)
    console.log(action.payload)
//localStorage.setItem("profile", JSON.stringify(action.payload)); // <-- This
})



.addCase(getLoginStatus.rejected, (state,action)=>{
    state.isError = true;
    state.isLoading = false;
    state.message = action.payload
    console.log(action.payload)
})


// get user
.addCase(getUser.pending, (state)=>{
    state.isLoading = true;
})
.addCase(getUser.fulfilled, (state,action)=>{
state.isLoggedIn = true;
state.isSuccess = true;
state.user = action.payload;
console.log(action.payload);
state.isLoading = false;
//toast.success(action.payload)
//localStorage.setItem("profile", JSON.stringify(action.payload))
})
.addCase(getUser.rejected, (state,action)=>{
state.isLoading = false;
state.isError = true;
state.message = action.payload;
state.isLoggedIn = false;

})




//update user's Photo
.addCase(updatedPhoto.pending, (state)=>{
    state.isLoading = false;
})
.addCase(updatedPhoto.fulfilled, (state,action)=>{
    state.isSuccess = true;
    state.isLoggedIn = true;
    state.user = action.payload;
    //toast.success('photo uploaded successfully')
   //toast.success(action.payload)
})
.addCase(updatedPhoto.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  // toast.error(action.payload);
})

.addCase(updatedUser.pending, (state)=>{
    state.isLoading = true
})
.addCase(updatedUser.fulfilled, (state,action)=>{
    state.isLoggedIn = true;
    state.isSuccess = true;
    state.user = action.payload;
    state.isLoading = false;
   // localStorage.setItem("profile", JSON.stringify(action.payload))
  //  toast.success("data saved successfully")
    console.log(action.payload);
})
.addCase(updatedUser.rejected, (state, action)=>{
state.isLoading = false;
state.isError = true;
state.message = action.payload;
//toast.error(action.payload);

})

// get a specific doctor's booking
.addCase(getSingleBooking.pending, (state)=>{
    state.isLoading = true;
})
.addCase(getSingleBooking.fulfilled, (state,action)=>{
state.isLoggedIn = true;
state.isSuccess = true;
state.getThisAppointment = action.payload?.appointmentData;
console.log(action.payload);
state.isLoading = false;
//toast.success(action.payload)
//localStorage.setItem("profile", JSON.stringify(action.payload))
})
.addCase(getSingleBooking.rejected, (state,action)=>{
state.isLoading = false;
state.isError = true;
state.message = action.payload;
state.isLoggedIn = false;

})



//view a doctor's details
// get a specific doctor's booking
.addCase(getOneDoctor.pending, (state)=>{
    state.isLoading = true;
})
.addCase(getOneDoctor.fulfilled, (state,action)=>{
state.isLoggedIn = true;
state.isSuccess = true;
state.docData = action.payload.fetchedDoc;
console.log(action.payload);
state.isLoading = false;
//toast.success(action.payload)
//localStorage.setItem("profile", JSON.stringify(action.payload))
})
.addCase(getOneDoctor.rejected, (state,action)=>{
state.isLoading = false;
state.isError = true;
state.message = action.payload;
state.isLoggedIn = false;

})




    .addCase(getAllDoctors.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isSuccess = true;
         state.isLoggedIn = true;
         state.doctor = action.payload || []; // Ensure doctor is an array

     //    console.log(`this is the response from get all doctors ${  JSON.stringify(action.payload ) }` )  
         // toast.success('Doctors fetched successfully!')

      }) 
      .addCase(getAllDoctors.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
          state.isSuccess = false;
        //  state.doctor = null;
         // toast.error(action.payload)
         console.log(`this is the error from get all doctors ${action.payload}` ) 
      })



// booking an appointment as a user 
.addCase(bookAppointment.pending, (state)=>{
    state.isLoading = false;

   
})
.addCase(bookAppointment.fulfilled, (state,action)=>{
state.isLoggedIn = true;
state.isSuccess = true;
state.user = action.payload.appointment
console.log(action.payload);
state.isLoading = false;
//toast.success(action.payload)

}) 


.addCase(bookAppointment.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload
    state.isLoggedIn = false;
    state.user = null
    console.log(action.payload.appointment);
   // toast.success(action.payload.message || "Success");

    
    })


  // fetch all appointments  for a specific user 
    .addCase(getAllBookings.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(getAllBookings.fulfilled, (state,action)=>{
    state.isLoggedIn = true;
    state.isSuccess = true;
    state.getThisAppointment = action.payload.bookedData;
    console.log(action.payload);
    state.isLoading = false;
    //toast.success(action.payload)
  //localStorage.setItem("profile", JSON.stringify(action.payload))
    })
    .addCase(getAllBookings.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.isLoggedIn = false;
    
    })


    // cancel an appointment
    .addCase(cancelAppointment.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(cancelAppointment.fulfilled, (state,action)=>{
    state.isLoggedIn = true;
    state.isSuccess = true;
    state.getThisAppointment = action.payload.message;
    console.log(action.payload);
    state.isLoading = false;
    //toast.success(action.payload)
   // localStorage.setItem("profile", JSON.stringify(action.payload))
    })
    .addCase(cancelAppointment.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.isLoggedIn = false;
    
    })

    // update payment method
    .addCase(updatePaymentMethod.pending, (state)=>{
        state.isLoading = true;	    
           })
           .addCase(updatePaymentMethod.fulfilled, (state,action)=>{
          //  state.isLoggedIn = true;
            state.isSuccess = true;
            state.getThisAppointment = action.payload.updated
            //.updated;
            console.log(action.payload);
            state.isLoading = false;
            //toast.success(action.payload.message)
            console.log(action.payload)
          //  localStorage.setItem("profile", JSON.stringify(action.payload))
           }    )
           .addCase(updatePaymentMethod.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isLoggedIn = false;
            toast.error(action.payload);
            console.log(action.payload);    
           }                
)   
 


    }
})




export const {RESET_AUTH,setUser,setUserPhoto } = authSlice.actions;

export default authSlice.reducer