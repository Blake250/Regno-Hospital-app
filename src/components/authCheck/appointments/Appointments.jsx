import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { appointmentAdmin } from "../../../feature/adminAuth/adminSlice";
import Loader from "../../loader/Loader";
import { shortenText } from "../../../../util";
import Pagination from "../../num-page/numPage";
import { keyframes } from "@emotion/react";

const Appointments = () => {
  const { isLoading,  appointments, cancelledAppointments } = useSelector(
    (state) => state?.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appointmentAdmin());
  }, [dispatch]);

  // const isCompleted = appointments?.appointment?.filter((item) => item.isCompleted);
  // const costAmt = appointments?.appointment?.filter((item) => item.fees);

  
  const itemsPerPage = 11
  const [itemOffset, setItemOffset] =useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = appointments?.appointment?.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(appointments?.appointment?.length/ itemsPerPage)



  const handlePageClick = (event)=>{
const newOffset =event.selected * itemsPerPage
setItemOffset(newOffset)
 
  }


  const styledAnimation = keyframes`
  0% {
    transform: translateY(-5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;



  return (
    <>
      {isLoading && <Loader />}

      <Box sx={{  height:'100vh', mt: 4, p: 3, backgroundColor: "#f4f6f8", borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          Admin Appointments Overview
        </Typography>

        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{
                 backgroundColor: "#1976d2",
                 animation: `${styledAnimation} 0.6s ease`,
                 }}>
                {[
                  "Patient",
                  "User Email",
                  "Date & Time",
                  "Doctor",
                  "Fees",
                  "Action"
                ].map((header) => (
                  <TableCell key={header}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#fff"
                    >
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(currentItems) &&
                currentItems?.length > 0 &&
                currentItems?.map((row) => (
                  <TableRow
                    key={row._id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f1f1f1",
                        
                      }
                    }}
                  >
                    <TableCell>
                      {shortenText(row?.userId?.name, 10)}
                    </TableCell>
                    <TableCell>
                      {shortenText(row?.userId?.email, 10)}
                    </TableCell>
                    <TableCell>
                      {row.slotDate
                        ? `${new Date(row.slotDate).toLocaleDateString()} - ${row.slotTime}`
                        : row.slotTime}
                    </TableCell>
                    <TableCell>
                      {shortenText(row?.docData?.name, 10)}
                    </TableCell>
                    <TableCell>
                      <Typography color="success.main">
                        ${row?.docData?.fees}
                    
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color={row?.isCompleted ? "success" : "warning"}
                        sx={{ borderRadius: 20, textTransform: "capitalize" }}
                      >
                 
                        {row?.isCompleted ? "Completed" : "Uncompleted"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        
        </TableContainer>
        <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>
      </Box>
    </>
  );
};

export default Appointments;













