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





export const ProtectedRoute = () => {
  const { isLoggedIn,  isLoading,user } = useSelector((state) => state?.auth);
 // const user = useSelector((state)=> state?.auth?.user)  

  // Show loading state only while auth is being verified
  const storedUser = localStorage.getItem("profile");
  if ( isLoading && !isLoading ) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <p>Checking login status...</p>
      </div>
    );
  }

  // If not logged in or user data is missing, redirect to home
  if (!isLoggedIn || !storedUser ) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render protected route
  return <Outlet />;
};




// export const ProtectedRoute = () => {
//   const { isLoggedIn, isAuthLoaded } = useSelector((state) => state?.auth);
// const user = useSelector((state)=> state?.auth?.user)  
//   console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
//   const storedUser = localStorage.getItem("profile");

//   if (isAuthLoaded && !user) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "4rem" }}>
//         <p>Checking login status...</p>
//       </div>
//     );
//   }

//   if (!isLoggedIn && !storedUser ) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };





export default  ShowOnLogin