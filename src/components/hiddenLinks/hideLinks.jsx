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
    const {isLoggedIn, } = useSelector((state)=> state?.auth)
 const user = useSelector((state)=> state?.auth?.user)  
 return user ? children :  <Navigate to='/login' />
}







export const ProtectedRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
 //  const user = useSelector((state)=> state?.auth?.user)  
  console.log(`ProtectedRoute - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
const dispatch = useDispatch();

 const storedUser = localStorage.getItem("profile");
//let storedUser
 


  if (!isLoggedIn && !user)
    {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected component
  return <Outlet/>;
};




// export const AdminOnlyRoute = () => {
//   const navigate = useNavigate();
//   const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!isLoading && !isLoggedIn) {
//       navigate("/login", { replace: true });
//     }
//   }, [isLoading, isLoggedIn, navigate]);

  
// };

export default  ShowOnLogin