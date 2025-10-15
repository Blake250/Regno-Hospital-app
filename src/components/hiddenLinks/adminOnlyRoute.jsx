








// // src/components/hiddenLinks/adminOnlyRoute.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser, setUser } from "../../feature/auth/authSlice";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const AdminOnlyRoute = () => {
  const { isLoading} = useSelector((state) => state?.auth);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  console.log(`AdminOnlyRoute - isLoggedIn: ${isLoggedIn}`);
 const user = useSelector((state) => state?.auth?.user);
  console.log(`User: ${JSON.stringify(user)} isLoggedIn: ${isLoggedIn}`);
 
 

  if (isLoading)  {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          color: "#555",
        }}
      >
       <Loader/>
      </Box>
    );
  }

  // 🔒 Not logged in → redirect to login
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // 🔒 Logged in but not admin → access denied
  if ( user && user?.role !== "admin") {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <Typography variant="h3" color="error" fontWeight={700} gutterBottom>
            Access Denied
          </Typography>

          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            This user does not have access to this page
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            It is meant for admins only.
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              boxShadow: 3,
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    );
  }

  // ✅ If admin → render nested routes
  return <Outlet />;
};




export const AdminOnlyLinks = ({ children }) => {
  const dispatch = useDispatch();
   const { isLoggedIn,isLoading } = useSelector((state) => state?.auth);
  //const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state?.auth?.user);
  console.log(`AdminOnlyLinks - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);

  

  if (isLoading) return null; // Avoid flicker
  if (user  && user?.role === "admin") return children;

  return null;
};



export default AdminOnlyRoute;

