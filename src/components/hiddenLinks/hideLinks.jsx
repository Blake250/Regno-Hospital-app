import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate , Outlet} from "react-router-dom"
import Loader from "../loader/Loader"



 // eslint-disable-next-line react/prop-types
 const ShowOnLogin = ({children}) => {
    const {isLoggedIn} = useSelector((state)=> state?.auth)

    if(isLoggedIn){
    return(
        children
    )
    }
    else{
    return (
        null
    )
    }
  
}

// eslint-disable-next-line react/prop-types
export const ShowOnLogOut = ({children})=>{
    const {isLoggedIn} = useSelector((state)=> state?.auth)
    if(!isLoggedIn){
        return(
             children
        )
    }else{
      return  (
           null
        )
    }
}








// export const ProtectedRoute = () => {
//   const { isLoggedIn,  isLoading,user } = useSelector((state) => state?.auth);
//    //const user = useSelector((state)=> state?.auth?.user)  

//   // 1️⃣ Still loading from Redux — show loader just once
//   if (isLoading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "4rem" }}>
//        <p>Checking login status...</p>
//       </div>
//     );
//   }

//   // 2️⃣ Not logged in — go to login
//   if (!isLoggedIn || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3️⃣ Logged in — continue to route
//   return <Outlet />;
// };





export const ProtectedRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
//  const user = useSelector((state)=> state?.auth?.user)  
  console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
  const storedUser = localStorage.getItem("profile");

  if (   isLoggedIn && !user) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <p>Checking login status...</p>
      </div>
    );
  }

  if (!isLoggedIn && (!storedUser || !user)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};





export default  ShowOnLogin