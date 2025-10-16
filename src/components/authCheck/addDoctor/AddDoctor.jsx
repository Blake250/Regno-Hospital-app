// src/components/admin/AddDoctor.jsx

import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../../../util";

// ← You must import the *thunk* action creators (not the raw service functions)
import { addDoctor, doctorPhoto } from "../../../feature/adminAuth/adminSlice";
import Loader from "../../loader/Loader";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const {  isLoading, isSuccess, message } = useSelector(
    (state) => state?.admin
  );
 const doctor = useSelector((state)=> state?.admin?.doctor?.doctors)
 console.log(`my doc looks like this ${doctor}`)

  // Form state fields
  const [name, setName] = useState(doctor?.name || "");
  const [email, setEmail] = useState(doctor?.email || "");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState(doctor?.experience || "");
  const [fees, setFees] = useState(doctor?.fees || "");
  const [speciality, setSpeciality] = useState(doctor?.speciality || "");
  const [degree, setDegree] = useState(doctor?.degree || "");
  const [address1, setAddress1] = useState(doctor?.address?.line1 || "");
  const [address2, setAddress2] = useState(doctor?.address?.line2 || "");
  const [about, setAbout] = useState(doctor?.about || "");
  const [available, setAvailable] = useState(
    doctor?.available !== undefined ? doctor.available : true
  );
  const [role] = useState("doctor"); // role is always “doctor” here

  // Image‐upload state:
  // - `profileImage` holds the File (when selected)
  // - `imagePreview` holds a URL for preview (initially fallback or blank)
  // - `showUploadButton` toggles the “Upload Photo” button
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    localStorage.getItem("imagePreview")||"https://res.cloudinary.com/diilsfevw/image/upload/v1749098282/doc-bookinngs/mhs2yyrgaljdulea5bfp.png"
  );
  const [showUploadButton, setShowUploadButton] = useState(false);

  // Cloudinary config (Vite)
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_PRESET_NAME;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  // Whenever `doctor` in Redux changes (e.g. after a successful create/update),
  // re‐populate the form fields (except password, which we always clear).
  useEffect(() => {
    if (doctor) {
      setName(doctor.name || "");
      setEmail(doctor.email || "");
      setPassword("");
      setExperience(doctor.experience || "");
      setFees(doctor.fees || "");
      setSpeciality(doctor.speciality || "");
      setDegree(doctor.degree || "");
      setAddress1(doctor.address?.line1 || "");
      setAddress2(doctor.address?.line2 || "");
      setAbout(doctor.about || "");
      setAvailable(doctor.available ?? true);
      // If the Redux‐stored doctor has a photo URL, use it:
      if (doctor.photo) {
        setImagePreview(doctor?.photo);
        localStorage.setItem("imagePreview", doctor.photo);
      }
    }
  }, [doctor]);

  // -------------------------------
  // 1) Handle image selection (from <input type="file" />)
  // -------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      // No file chosen → clear everything
      setProfileImage(null);
      setImagePreview(localStorage.getItem("imagePreview") || "");
      setShowUploadButton(false);
      return;
    }

    // Validate basic file types if you like:
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast.error("Please select a JPG or PNG image.");
      return;
    }

    // Store the File object, show a local preview, enable Upload button
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setShowUploadButton(true);
  };



  const handleCancelImage = () => {
    setProfileImage(null);
    setImagePreview(localStorage.getItem("imagePreview") || 'https://res.cloudinary.com/diilsfevw/image/upload/v1749044672/doc-bookinngs/nsi8jqj8vkg9gkq1s46o.png');
    setShowUploadButton(false);
    toast.info("Image selection canceled");
  };
  
  // -------------------------------
  // 2) Upload the selected image to Cloudinary, then dispatch doctorPhoto()
  // -------------------------------
  const savePhoto = async () => {
    if (!profileImage) {
      return toast.error("Please select an image to upload");
    }

    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", upload_preset);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        // Dispatch the thunk that updates the doctor’s photo in the backend
        await dispatch(
          doctorPhoto({
            photo: data.secure_url,
          })
        );

        // Update local preview, save to localStorage, hide the button
        setImagePreview(data.secure_url);
        localStorage.setItem("imagePreview", data.secure_url);
        setShowUploadButton(false);
        toast.success("Image uploaded successfully");
      } else {
      

        toast.error("Cloudinary did not return a secure_url");
      }
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      toast.error("Failed to upload image. Check console for details.");
    }
  };

  // -------------------------------
  // 3) Form‐submission logic (addDoctor)
  // -------------------------------
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic front‐end validation
    if (
      !name ||
      !email ||
      !password ||
      !experience ||
      !fees ||
      !role ||
      !speciality ||
      !degree ||
      !address1 ||
      !about
    ) {
      return toast.error("Please fill all required fields.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    // Prepare doctorData exactly as your backend expects
    const doctorData = {
      name,
      email,
      password,
      experience,
      fees,
      speciality,
      degree,
      address: {
        line1: address1,
        line2: address2 || '',
      },
      about,
      photo: imagePreview ,
      available: available === true || available === "true",
      role, // Always "doctor"
    };

    try {
    const dispatchedData =  await dispatch(addDoctor(doctorData));
      toast.success("Doctor added/updated successfully");
      if(dispatchedData){
          // Reset form fields
  setName("");
  setEmail("");
  setPassword("");
  setExperience("");
  setFees("");
  setSpeciality("");
  setDegree("");
  setAddress1("");
  setAddress2("");
  setAbout("");
  setAvailable(true);

  // Reset image-related state
  setProfileImage(null);
  setImagePreview("");
  localStorage.removeItem("imagePreview");
  setShowUploadButton(false);
      }

     
    } catch (error) {
      console.error("Error adding doctor:", error?.message || error);
      toast.error("Failed to add doctor. See console for details.");
    }
  };

  return (
    <> 
   {isLoading && <Loader/>}
    <form onSubmit={onSubmitHandler}>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          my: 4,
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Add / Edit Doctor
        </Typography>

        {/* ===== Image Upload Section ===== */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={imagePreview }
            sx={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <label htmlFor="doc-img-upload">
            <Button component="span" variant="outlined">
              Choose Image
            </Button>
          </label>
          <input
            id="doc-img-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          {showUploadButton && (
            <>  
            <Button
              onClick={savePhoto}
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              Upload Photo
           </Button>


<Button
onClick={handleCancelImage}
variant="outlined"
color="error"
sx={{ ml: 2 }}
>
Cancel
</Button>
</>

          )}
        </Box>

        {/* ===== Form Fields Section ===== */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Left Column */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Min. 6 characters"
            />
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select
                value={experience}
                label="Experience"
                onChange={(e) => setExperience(e.target.value)}
              >
                {[
                  "1 Year",
                  "2 Years",
                  "3 Years",
                  "4 Years",
                  "5 Years",
                  "6 Years",
                  "8 Years",
                  "9 Years",
                  "10+ Years",
                ].map((yearText) => (
                  <MenuItem key={yearText} value={yearText}>
                    {yearText}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Fees (USD)"
              type="number"
              fullWidth
              required
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </Box>

          {/* Right Column */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <InputLabel>Speciality</InputLabel>
              <Select
                value={speciality}
                label="Speciality"
                onChange={(e) => setSpeciality(e.target.value)}
              >
                {[
                  "General Physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatrician",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Degree"
              fullWidth
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            <TextField
              label="Address Line 1"
              fullWidth
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <TextField
              label="Address Line 2"
              fullWidth
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Available</InputLabel>
              <Select
                value={available ? "true" : "false"}
                label="Available"
                onChange={(e) => setAvailable(e.target.value === "true")}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Role"
              fullWidth
              required
              value={role}
              disabled
            />
          </Box>
        </Box>

        {/* ===== About Section ===== */}
        <Box mt={3}>
          <Typography mb={1}>About Doctor</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Write about doctor"
         value={about}
        //    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(value={about}) }}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Box>

        {/* ===== Submit Button ===== */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 4,
            borderRadius: "30px",
            px: 5,
          }}
        >
          {doctor ? "Update Doctor" : "Add Doctor"}
        </Button>
      </Box>
    </form>

    </>
  );
};

export default AddDoctor;











