import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


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
    const {isLoggedIn} = useSelector((state)=> state?.auth)

 return isLoggedIn ? children :  <Navigate to='/login' />
}



export const ProtectedRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
  console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected component
  return <Outlet/>;
};




export default  ShowOnLogin
