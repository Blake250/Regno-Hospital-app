

// import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
// import Home from "./pages/Home"
// import Doctors from "./pages/Doctors"
// import Login from "./pages/Login"
// import About from "./pages/About"
// import Contact from "./pages/Contact"
// import MyAppointment from "./pages/MyAppointment"
// import Appointment from "./pages/Appointment"
// import MyProfile from "./pages/MyProfile"
// import NavBar from "./components/NavBar" 
// import Footer from "./components/Footer"
// import 'react-toastify/dist/ReactToastify.css'
// import { toast, ToastContainer } from 'react-toastify'
// import { useDispatch, useSelector } from "react-redux"
// import { Box, Typography } from "@mui/material"
// import { useEffect } from "react"
// import { getLoginStatus, getUser, RESET_AUTH, setUser, setUserPhoto, updatedUser } from "./feature/auth/authSlice"
// //import Admin from "./components/authCheck/Admin"
// import Register from "./pages/Register"
// import Admin from "./components/authCheck/Admin"
// import BarLayOut from "./components/authCheck/BarLayOut"

// //port AdminBlock from "./components/authCheck/Routing/AdminBlock"
// import Appointments from "./components/authCheck/appointments/Appointments"
// import DashBoard from "./components/dashBoard/DashBoard"
// import AddDoctor from "./components/authCheck/addDoctor/AddDoctor"
// import DoctorList from "./components/doctorList/DoctorList"
// import ErrorPage from "./components/ErrorPage"
// import AdminOnlyRoute from "./components/hiddenLinks/adminOnlyRoute"
// import BookingDetails from "./pages/BookingDetails"

// // import CheckoutForm from "./components/CheckoutForms/CheckoutForm"
// import CheckoutWithPaypal from "./components/checkoutForms/CheckoutWithPaypal"
// import CheckoutWithStripes from "./components/checkoutForms/CheckoutWithStripes"

// import CheckoutSuccess from "./components/checkoutForms/CheckoutSuccess"
// //import CheckoutOptions from "./components/checkoutForms/CheckoutOptions"
// import CheckoutOptions from "./components/checkoutForms/CheckoutOptions" 
// import axios from 'axios';
// import { useState } from "react"
// import Loader from "./components/loader/Loader"

// const App = () => {
//   const { isLoggedIn, user, isError, message, isLoading } = useSelector((state) => state?.auth);
//   const storedUserDetails = useSelector((state) => state.auth.storedUserDetails);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [authLoading, setAuthLoading] = useState(true);

//   axios.defaults.withCredentials = true;
// const navigate = useNavigate();
//   // Axios interceptor for 401 errors
//   // useEffect(() => {
    
//   //   const interceptor = axios.interceptors.response.use(
//   //     (response) => response,
//   //     (error) => {
//   //       if (error.response?.status === 401) {
//   //         dispatch(RESET_AUTH());
//   //         localStorage.removeItem('token');
//   //         toast.error('Session expired. Please log in again.');
//   //         navigate('/login');
//   //       }
//   //       return Promise.reject(error);
//   //     }
//   //   );
//   //   return () => axios.interceptors.response.eject(interceptor);
//   // }, [dispatch, navigate]);

//   // Check login status and fetch user
//   useEffect(() => {
//     dispatch(getLoginStatus())
//       .unwrap()
//       .then((isLoggedIn) => {
//         if (isLoggedIn && !user) {
//           dispatch(getUser())
//             .unwrap()
//             .then((userData) => {
//               dispatch(setUser(userData));
//             })
//             .catch((error) => {
//               console.error('getUser error:', error);
//               dispatch(RESET_AUTH());
//               toast.error('Failed to fetch user data. Please log in.');
//               navigate('/login');
//             });
//         }
//         setAuthLoading(false);
//       })
//       .catch((error) => {
//         console.error('getLoginStatus error:', error);
//         setAuthLoading(false);
//       });
//   }, [dispatch, user, navigate]);

//   // Display error messages
//   useEffect(() => {
//     if (isError && message) {
//       toast.error(message);
//     }
//   }, [isError, message]);

//   const isAdminRoute = location.pathname.startsWith('/admin');
//   const hideFooterOnRoutes = ['/doctors', '/doctors/'];
//   const shouldHideFooter =
//     hideFooterOnRoutes.includes(location.pathname) ||
//     location.pathname.startsWith('/admin') ||
//     location.pathname.startsWith('/my-booking');

//   if (authLoading) {
//     return <Loader />;
//   }

//   console.log(`App.jsx - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//       }}
//     >
//       {!isAdminRoute && <NavBar />}
//       {isLoading && !isAdminRoute && <Loader />}
//       {isError && !isAdminRoute && (
//         <Typography sx={{ textAlign: 'center', mt: 2, color: 'error.main' }}>
//           Error: {message}
//         </Typography>
//       )}
//       <ToastContainer />
//       <Box sx={{ flexGrow: 1 }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/doctors" element={<Doctors />} />
//           <Route path="/doctors/:speciality" element={<Doctors />} />
//           <Route path="/register" element={isLoggedIn && user ? <Navigate to="/" /> : <Register />} />
//           <Route path="/login" element={isLoggedIn && user ? <Navigate to="/" /> : <Login />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/profile" element={<MyProfile />} />
//           <Route path="/my-booking" element={<MyAppointment />} />
//           <Route path="/booking/:docId" element={<Appointment />} />
//           <Route path="/details/:docId" element={<BookingDetails />} />
//           <Route path="/checkout-options/:appointmentId" element={<CheckoutOptions />} />
//           <Route path="/checkout-success" element={<CheckoutSuccess />} />
//           <Route path="/checkout-paypal/:appointmentId" element={<CheckoutWithPaypal />} />
//           <Route path="/checkout-stripe/:appointmentId" element={<CheckoutWithStripes />} />
//           <Route
//             path="/admin"
//             element={
//               <AdminOnlyRoute>
//                 <BarLayOut />
//               </AdminOnlyRoute>
//             }
//           >
//             <Route path="dashboard" element={<DashBoard />} />
//             <Route path="appointments" element={<Appointments />} />
//             <Route path="add-doctor" element={<AddDoctor />} />
//             <Route path="doctors-list" element={<DoctorList />} />
//           </Route>
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//       </Box>
//       {isLoggedIn && !shouldHideFooter && <Footer />}
//     </Box>
//   );
// };

// export default App;



import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyAppointment from "./pages/MyAppointment"
import Appointment from "./pages/Appointment"
import MyProfile from "./pages/MyProfile"
import NavBar from "./components/NavBar" 
import Footer from "./components/Footer"
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { getLoginStatus, getUser, setUser, setUserPhoto, updatedUser } from "./feature/auth/authSlice"
//import Admin from "./components/authCheck/Admin"
import Register from "./pages/Register"
import Admin from "./components/authCheck/Admin"
import BarLayOut from "./components/authCheck/BarLayOut"

//port AdminBlock from "./components/authCheck/Routing/AdminBlock"
import Appointments from "./components/authCheck/appointments/Appointments"
import DashBoard from "./components/dashBoard/DashBoard"
import AddDoctor from "./components/authCheck/addDoctor/AddDoctor"
import DoctorList from "./components/doctorList/DoctorList"
import ErrorPage from "./components/ErrorPage"
import AdminOnlyRoute from "./components/hiddenLinks/adminOnlyRoute"
import BookingDetails from "./pages/BookingDetails"

// import CheckoutForm from "./components/CheckoutForms/CheckoutForm"
import CheckoutWithPaypal from "./components/checkoutForms/CheckoutWithPaypal"
import CheckoutWithStripes from "./components/checkoutForms/CheckoutWithStripes"

import CheckoutSuccess from "./components/checkoutForms/CheckoutSuccess"
//import CheckoutOptions from "./components/checkoutForms/CheckoutOptions"
import CheckoutOptions from "./components/checkoutForms/CheckoutOptions"
import axios from "axios"


const App = () => {
  const { isLoggedIn, user, isError, isSuccess , } = useSelector((state) => state?.auth)
  console.log(`isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`)
  const storedUserDetails = useSelector((state) => state?.auth?.storedUserDetails)

    const dispatch = useDispatch()
  const location = useLocation()  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])





  useEffect(() => {
    if (isError) {
      toast.error(isError)
    }
  }, [isError])



  // useEffect(() => {
  //   if (isLoggedIn && user === null) {
  //     dispatch(getUser());
  //   }
  // }, [isLoggedIn, user, dispatch]);


 

  useEffect(() => {
    if (isLoggedIn && user=== null) {
      dispatch(getUser()).then((res) => {
        if (res.payload) {
          dispatch(setUser(res.payload)); // ✅ Correctly update Redux state
        }
      });
    }
  }, [dispatch, isLoggedIn, user]);
  



  const isAdminRoute = location.pathname.startsWith('/admin')

  const hideFooterOnRoutes = ['/doctors', '/doctors/'];
  //const myBookingsRoute = location.pathname.startsWith('/my-booking')

  //const detailsPage = location.pathname.startsWith("/details/:docId")

const shouldHideFooter =
  hideFooterOnRoutes.includes(location.pathname) ||
  location.pathname.startsWith('/admin')
    ||  location.pathname.startsWith('/my-booking')  
   



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      minHeight: '100vh',
      }}
    >
    { !isAdminRoute  && <NavBar />        }  
     
      {/* Toast notifications */}
      <ToastContainer />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={ <Doctors/>} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/register" element={ isLoggedIn   && user ? <Navigate to="/login" /> :  <Register />} />
          <Route path="/login" element={   isLoggedIn   && user ? <Navigate to="/" /> : <Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/my-booking" element={<MyAppointment />} />
          <Route path="/booking/:docId" element={<Appointment />} />
          <Route path="/details/:docId" element={<BookingDetails />} />
         

        

        
          <Route path="/checkout-options/:appointmentId" element={<CheckoutOptions />} />

         {/* <Route path='/checkout-success' element={<CheckoutSuccess/>} /> */}

        <Route path='/checkout-success' element={<CheckoutSuccess/>} /> 
          <Route path= "/checkout-paypal/:appointmentId" element={<CheckoutWithPaypal />} />
          <Route path="/checkout-stripe/:appointmentId" element={<CheckoutWithStripes />} />     

        <Route path="/admin" element={    
          <>   
         <AdminOnlyRoute >
         
          <BarLayOut />
          </AdminOnlyRoute >
         
          </>
       }>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="doctors-list" element={<DoctorList />} />
      

        </Route>
     
          
            
           
        <Route path="*" element={<ErrorPage />} />
       
        </Routes>
      </Box>

      {/* Sticky footer at the bottom */}
      {isLoggedIn  && !shouldHideFooter  && <Footer />}
    </Box>
  )
}

export default App













