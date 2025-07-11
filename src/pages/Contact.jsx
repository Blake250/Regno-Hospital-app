import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all the fields.");
      toast.error('Please fill in all the fields')
      return;
    }

    window.Email.send({
      // Host: "smtp.elasticemail.com", 
      // Username: 'blake200@yopmail.com',
      // Password: "6ADF7FA162609894D17E8B46827C98EF5EBE", 
      secureToken:' c2f02f67-3981-4365-8cc3-aec7979d8110',
      port:2525,
      To: "blakechristian246@gmail.com",
      From: formData.email,
      Subject: `Message from ${formData.name}`,
      Body: formData.message,
    })
      .then((message) => {
        setStatus("Message sent successfully!");
        toast.success("Message sent successfully!")
        console.log(message);
        setFormData({ name: "", email: "", message: "" }); 
      })
      .catch((error) => {
        console.error(error);
        setStatus("Failed to send the message. Please try again.");
        toast.error("Failed to send the message. Please try again.")
      });
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Contact Us
        </Typography>
        <Typography sx={{ color: "#7f8c8d" }}>
          We'd love to hear from you! Whether you have a question or need
          assistance, reach out to us.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
            >
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                type="email"
                sx={{ mb: 2 }}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 2 }}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
            {status && (
              <Typography
                sx={{ color: status.includes("success") ? "green" : "red", mt: 2 }}
              >
                {status}
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#e8f5fe",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
            >
              Reach Us At
            </Typography>
            <Typography sx={{ mb: 1, color: "#555" }}>
              <strong>Address:</strong> 123 Healthcare Lane, Wellness City, US
            </Typography>
            <Typography sx={{ mb: 1, color: "#555" }}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
            <Typography sx={{ mb: 1, color: "#555" }}>
              <strong>Email:</strong> contact@yourclinic.com
            </Typography>
            <Typography sx={{ color: "#555" }}>
              <strong>Working Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;











