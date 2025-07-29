

import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  appointmentAdmin,
  //getAllDoctors,
  appointmentCancel,
  getAllDocsByAdmin,
} from "../../feature/adminAuth/adminSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../num-page/numPage";
import Loader from "../loader/Loader";
import { getAllDoctors } from "../../feature/auth/authSlice";

const statusColor = {
  Scheduled: "success",
  Cancelled: "error",
};

const DashBoardList = () => {
  const { isLoading, doctor, appointments, cancelledAppointments } = useSelector((state) => state?.admin);
 // const { user, } = useSelector((state) => state?.auth);  
  //console.log(`user is ${JSON.stringify(user)}`); 
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch(appointmentCancel());
    toast.success("Welcome to Admin Dashboard");
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDocsByAdmin());
    toast.success("Welcome to Admin Dashboard");
  }, [dispatch]);



  

  useEffect(() => {
    dispatch(appointmentAdmin());
    toast.success("Appointments fetched successfully");
  }, [dispatch]);

  const allAppointments = [
    ...(appointments?.appointment || []),
    ...(cancelledAppointments?.data || []),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));


  const itemsPerPage = 6
  const [itemOffset, setItemOffset] =useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = allAppointments.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(allAppointments.length/ itemsPerPage)



  const handlePageClick = (event)=>{
const newOffset =event.selected * itemsPerPage
setItemOffset(newOffset)
 
  }
  return (
    <>   
    {isLoading && <Loader/>}
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 4 },
        py: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", md: "60vw" },
          maxWidth: "1000px",
          borderRadius: 3,
          p: 3,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          📋 Recent Appointments
        </Typography>

        {currentItems.length > 0 ? (
          currentItems.map((item, index) => {
            const isCancelled = item.cancelled === true || item.status === "Cancelled";
            const statusLabel = isCancelled ? "Cancelled" : "Scheduled";
            const chipColor = isCancelled ? "error" : "success";

            return (
              <Box
                key={item._id || index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  pl: 2,
                  borderLeft: "4px solid",
                  borderColor: chipColor === "error" ? "red" : "green",
                }}
              >
                {/* Number Circle */}
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#fff",
                    border: "2px solid",
                    borderColor: chipColor === "error" ? "red" : "green",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {index + 1}
                </Box>

                {/* Appointment Details */}
                <Stack spacing={0.5}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "15px", md: "20px" },
                      color: "#0033cc",
                    }}
                  >
                    {item?.userData?.name || "Unknown User"}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "15px", md: "17px" } }}
                  >
                    Appointment with {item?.docData?.name || "Unknown Doctor"} on{" "}
                    <span style={{ color: "brown", fontWeight: "600" }}>
                      {new Date(item?.date).toLocaleDateString()}
                    </span>
                  </Typography>

                  {/* Status Text */}
                  <Typography
                    sx={{
                      color: isCancelled ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {statusLabel}
                  </Typography>

                  {/* Chip */}
                  <Chip
                    label={statusLabel}
                    color={chipColor}
                    size="small"
                    sx={{ mt: 1, width: "fit-content" }}
                  />
                </Stack>
              </Box>
            );
          })
        ) : (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No appointments found.
          </Typography>
        )}
      </Paper>
      <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>
    </Box>
    </>
  );
};

export default DashBoardList;















