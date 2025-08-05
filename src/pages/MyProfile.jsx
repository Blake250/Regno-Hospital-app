

import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import {
  Avatar, TextField, Typography, Button, Paper, InputLabel,
  Select, MenuItem, FormControl
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser, setUser, setUserPhoto, updatedPhoto, updatedUser,
} from "../feature/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";

const MyProfile = () => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const PRESET_NAME = import.meta.env.VITE_PRESET_NAME;
  const url = "https://api.cloudinary.com/v1_1/diilsfevw/image/upload";

  const { isError, user, isLoading,isLoggedIn } = useSelector((state) => state?.auth);
  const storedUserDetails = useSelector((state) => state?.auth?.storedUserDetails) || {};

  const initialState = {
    photo: user?.photo || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
    address: {
      line1: user?.address?.line1 || '',
      line2: user?.address?.line2 || '',
    }
  };

  const [isEdit, setIsEdit] = useState(true);
  const [profileImage, setProfileImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(localStorage.getItem('profile')?.photo || '');
  const [showLoadButton, setShowLoadButton] = useState(false);
  const [userData, setUserData] = useState(initialState);

  const dispatch = useDispatch();

  //useEffect(() => {
  //   if (user === null) {
  //     dispatch(getUser());
  //   } else {
  //     setUserData({
  //       photo: user?.photo || '',
  //       name: user?.name || '',
  //       email: user?.email || '',
  //       phone: user?.phone || '',
  //       role: user?.role || '',
  //       dob: user?.dob || '',
  //       gender: user?.gender || '',
  //       address: {
  //         line1: user?.address?.line1 || '',
  //         line2: user?.address?.line2 || ''
  //       }
  //     });
  //   }
  // }, [dispatch, user]);




useEffect(() => {
  if (user) {
    const updatedProfile = {
      photo: user?.photo || '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || '',
      dob: user?.dob || '',
      gender: user?.gender || '',
      address: {
        line1: user?.address?.line1 || '',
        line2: user?.address?.line2 || ''
      }
    };
    setUserData(updatedProfile);
    setImagePreview(user?.photo || '');
  } else {
    setUserData(initialState); // clear the state if no user
  }
}, [user]); // ✅ only depends on user




  useEffect(() => {
    const storedDetails = localStorage.getItem('profile');


    if (user === null && storedDetails) {
      try {
        const parsed = JSON.parse(storedDetails);
     const fetchedData =    setUserData(parsed)
        dispatch(setUser(fetchedData));
      } catch (e) {
        console.error('Failed to parse stored profile JSON:', e);
        localStorage.removeItem('profile');
      }
     }
  }, [ dispatch]);
    


  // useEffect(() => {
  //   const newUserData = async () => {
  //     if ((isLoggedIn && !user) || storedUserDetails === null) {
  //       const storedDetails = localStorage.getItem('profile');
  //       if (storedDetails) {
  //         try {
  //           const parsed = JSON.parse(storedDetails);
  //           await dispatch(setUser(parsed));
  //         } catch (e) {
  //           console.error('Failed to parse stored profile JSON:', e);
  //           localStorage.removeItem('profile');
  //         }
  //       }
  //     }
  //   };
  
  //   newUserData(); // Call the async function
  // }, [isLoggedIn, user, storedUserDetails, dispatch]); // Include dependencies
  



  useEffect(() => {
    const updateUser = async () => {
      const updated = await dispatch(updatedUser(userData)).unwrap();
     dispatch(setUser(updated));
    };
    updateUser();
  }, [dispatch]);

  const saveProfile = async (e) => {
    e.preventDefault();
    const { photo, name, email, role, phone, dob, gender } = userData;
    try {
      const userInfo = {
        ...userData,
        photo: photo || '',
        name: name || '',
        email: email || '',
        role: role || '',
        phone: phone || '',
        dob: dob || '',
        gender: gender || '',
        address: {
          line1: userData?.address?.line1 || '',
          line2: userData?.address?.line2 || ''
        }
      };
      const userDetails = await dispatch(updatedUser(userInfo)).unwrap();
      if (userDetails) {
        localStorage.setItem('profile', JSON.stringify(userDetails));
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target?.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setShowLoadButton(true);
  };

  const handleCancelImage = () => {
    setProfileImage(null);
    setImagePreview(localStorage.getItem("imagePreview") || "https://i.ibb.co/b2p7x2P/dpPhoto.jpg");
    setShowLoadButton(false);
    toast.info("Image selection canceled");
  };
  

  const savePhoto = async (e) => {
    e.preventDefault();
    try {
      if (profileImage && ["image/jpeg", "image/png", "image/jpg"].includes(profileImage.type)) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("cloud_name", CLOUD_NAME);
        formData.append("upload_preset", PRESET_NAME);

        const response = await fetch(url, { method: "POST", body: formData });
        const cloudinaryData = await response.json();

        if (!cloudinaryData.secure_url) {
          toast.error("Image upload failed");
          return;
        }

        const updatedUserData = { ...userData, photo: cloudinaryData.secure_url };
        await dispatch(updatedPhoto(updatedUserData));
        setImagePreview(cloudinaryData.secure_url);
        setShowLoadButton(false);
        setUserData((prev) => ({ ...prev, photo: cloudinaryData.secure_url }));
        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile photo");
    //  console.log(we have this error ${error.message})
    }
  };

  const rowDisplay = (label, value, isEditable, editComponent) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", width: "100%" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1 }}>{label}:</Typography>
      <Box sx={{ flex: 2 }}>{isEditable ? editComponent : <Typography>{value}</Typography>}</Box>
    </Box>
  );

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ width: "100%", p: 2,
        '@media(max-width:768px)':{
          width:'85%'
        }
      }}>
        <Paper
          sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
               backgroundColor: '#8ea6f4', 
            
          }}
        >



          <Stack alignItems="center" spacing={2} sx={{
             mb: 3,
             backgroundColor: 'white', 
             padding:'7px',
          
             }}>
            <Avatar
              src={imagePreview || userData?.photo}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                border: "2px solid #ccc",
              }}
            />
            <Typography variant="subtitle1">
              Role: {typeof userData?.role === 'string' ? userData.role : JSON.stringify(userData.role)}
            </Typography>
  
            {showLoadButton && (
              <> 
              <TextField
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              
                fullWidth
                sx={{
                  maxWidth: "300px",
                  '& input': {
                    p: 1,
                    bgcolor: "#f0f0f0",
                    borderRadius: 1,
                   // display:'none'
                  },
                }}
              />

         
            </>
            )}
  
          

          {/* Upload / Change Buttons */}
<Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
  {showLoadButton && imagePreview ? (
    <>
      <Button variant="outlined" color="primary" onClick={savePhoto}>
        Upload Photo
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          setShowLoadButton(false);
          setImagePreview(userData?.photo || '');
          setProfileImage(null);
        }}
      >
        Cancel
      </Button>
    </>
  ) : (
    <Button variant="outlined" onClick={() => setShowLoadButton(true)}>
      Change Photo
    </Button>
  )}
</Box>



</Stack>





          <form onSubmit={saveProfile}>
            <Stack spacing={2}>
              {rowDisplay("Name", userData?.name || '', isEdit, (
                <TextField
                  label="Name"
                  fullWidth
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ))}
  
              {rowDisplay("Email", userData.email || '', isEdit, (
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={userData.email}
                  onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                />
              ))}
  
              {rowDisplay("Phone", userData.phone || '', isEdit, (
                <TextField
                  label="Phone"
                  type="tel"
                  fullWidth
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              ))}
  
              {rowDisplay("Address Line 1", userData.address?.line1 || '', isEdit, (
                <TextField
                  label="Address Line 1"
                  fullWidth
                  value={userData.address?.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
              ))}
  
              {rowDisplay("Address Line 2", userData.address?.line2 || '', isEdit, (
                <TextField
                  label="Address Line 2"
                  fullWidth
                  value={userData.address?.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              ))}
  
              {rowDisplay("Gender", userData.gender || '', isEdit, (
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={userData.gender}
                    label="Gender"
                    onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Not Selected">Not Selected</MenuItem>
                  </Select>
                </FormControl>
              ))}
  
              {rowDisplay("Date of Birth", userData.dob || '', isEdit, (
                <TextField
                  type="date"
                  fullWidth
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                />
              ))}
  
              <Button
              onClick={() => setIsEdit(!isEdit)}  
              type="submit" variant="contained" color="primary" fullWidth>
                {isEdit ? 'Edit Profile' : 'Save Profile'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
  




  }

export default MyProfile   