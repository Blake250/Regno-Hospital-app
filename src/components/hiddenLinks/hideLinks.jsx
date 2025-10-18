import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate , Outlet} from "react-router-dom"
import { getUser, setUser } from "../../feature/auth/authSlice"


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


// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({children} )=>{
    const {isLoggedIn,  } = useSelector((state)=> state?.auth)
 const user = useSelector((state)=> state?.auth?.user)  
 return user ? children :  <Navigate to='/login' />
}






export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state)=> state?.auth?.user)  
  console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
  const storedUser = localStorage.getItem("profile");

  if (!isLoggedIn && !storedUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <p>Checking login status...</p>
      </div>
    );
  }

  if (!isLoggedIn || (!user && !storedUser)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};




// export const ProtectedRoute = () => {
//   const { isLoggedIn, user } = useSelector((state) => state?.auth);
//  //  const user = useSelector((state)=> state?.auth?.user)  
//   console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
// const dispatch = useDispatch();

//  const storedUser = localStorage.getItem("profile");
// //let storedUser
 


//   if (!isLoggedIn &&  (!storedUser || !user))
//     {
//     return <Navigate to="/login" replace />;
//   }

//   // Otherwise, show the protected component
//   return <Outlet/>;
// };





export default  ShowOnLogin