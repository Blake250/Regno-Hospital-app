import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import docService from "./docService";






//get A doctor Booking 
export const getAllDocsBookings = createAsyncThunk('doc/getAllDocsBookings', async(_, {rejectWithValue})=>{
    try {
        return await docService.getAllDocsBookings() 
    } catch (error) {
       const message = (error.response  && error.response.data &&  error.response.data.message  ) ||
       error.message || error.toString()
       console.log(message)
      return  rejectWithValue(message)
    }
   
})


// that same doctor canceling bookings he can't meet up
//logout a User
export const cancelAppointment = createAsyncThunk('doc/cancelAppointment', async(docAppointment, {rejectWithValue})=>{
    try {
        return await docService.cancelAppointment(docAppointment) 
    } catch (error) {
       const message = (error.response  && error.response.data &&  error.response.data.message  ) ||
       error.message || error.toString()
       console.log(message)
      return  rejectWithValue(message)
    }
   
})







const initialState = {
    
    isLoggedIn: false,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',  
    getThisAppointment : null,
 

}



const docSlice = createSlice({
    name:'doc',
    initialState,
    reducers:{
        RESET_AUTH :(state)=>{
            state.isLoggedIn = false;
            state.getThisAppointment = null;
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = false;
            state.message = '';
            
        }

       },

           // getAllDocsBookings by a doctor
    extraReducers: (builder)=>{
        builder
        .addCase(getAllDocsBookings.pending, (state)=>{
         state.isLoading = true
        })
     
      .addCase(getAllDocsBookings.fulfilled, (state, action)=>{
         state.isLoading = false;
         state.isLoggedIn = true
       state.getThisAppointment = action.payload;
       //  state.user = null;
         state.isSuccess = true;
        console.log(action.payload)


      })  

      .addCase(getAllDocsBookings.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true
        state.getThisAppointment = null
        state.message = action.payload;
        toast.error(action.payload);
         console.log(action.payload);  
      } )



      // cancelling appointments by a loggedIn doctor
      .addCase(cancelAppointment.pending, (state)=>{
        state.isLoading = true
       })
    
     .addCase(cancelAppointment.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isLoggedIn = true
      state.getThisAppointment = action.payload;
      //  state.user = null;
        state.isSuccess = true;
       console.log(action.payload)


     })  

     .addCase(cancelAppointment.rejected, (state, action)=>{
       state.isLoading = false;
       state.isError = true
       state.getThisAppointment = null
       state.message = action.payload;
       toast.error(action.payload);
        console.log(action.payload);  
     } )




     }
    })  
















      export const {RESET_AUTH } = docSlice.actions;
      
      export default docSlice.reducer

        