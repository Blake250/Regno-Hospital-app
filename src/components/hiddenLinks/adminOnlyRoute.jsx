
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUser } from '../../feature/auth/authSlice';
//import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate, Outlet, json } from 'react-router-dom'

const AdminOnlyRoute = ({ children }) => {
  const storedUserDetails= useSelector((state) => state.auth?.storedUserDetails);
  console.log(`here we have the updated data in  his form ${JSON.stringify(storedUserDetails) }`)  
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    // Refresh user info if role is not present
    if (!storedUserDetails || !storedUserDetails.role) {
      dispatch(getUser()).then((res) => {
        if (res.payload) {
          dispatch(setUser(res.payload));
        }
      });
    }
  }, [dispatch]);

  if (storedUserDetails?.role === 'admin') {
    return children;
  }

  // Redirect or show access denied message
  return (
    <Box
                  sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#f5f5f5',
                    textAlign: 'center',
                    px: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      color="error"
                      fontWeight={700}
                      gutterBottom
                    >
                    Access Denied
                    </Typography>
            
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      sx={{ mb: 1 }}
                    >
                     For User does not  have access to this page
                    </Typography>
            
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', mb: 4 }}
                    >
                    It Is Meant For admin Only
                    </Typography>
            
                    <Button
                      component={Link}
                      to="/"
                      variant="contained"


                      color="primary"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: '30px',
                        boxShadow: 3,
                      }}
                    >
                      Back to Home
                    </Button>
                  </Box>
                </Box>
  );
};

export default AdminOnlyRoute;



export const AdminOnlyLinks = (({children})=>{
 // import { useDispatch, useSelector } from 'react-redux';
  const  storedUserDetails  = useSelector((state) => state.auth?.storedUserDetails);
  const dispatch = useDispatch()


  useEffect(() => {
    // Refresh user info if role is not present
    if (!storedUserDetails || !storedUserDetails?.role) {
      dispatch(getUser()).then((res) => {
        if (res.payload) {
          dispatch(setUser(res.payload));
        }
      });
    }
  }, [dispatch]);

  if (storedUserDetails?.role === 'admin') {
    return children;
  }

return null


})


 






