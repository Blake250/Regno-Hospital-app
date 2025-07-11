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
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
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
                        backgroundColor: "#f1f1f1"
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











// import React, { useEffect } from "react";
// //import { format } from "date-fns"; // install it with: npm install date-fns

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { appointmentAdmin } from "../../../feature/adminAuth/adminSlice";
// import Loader from "../../loader/Loader";
// import { shortenText } from "../../../../util";

// const appointments = [
//   {
//     patient: "John Doe",
//     age: 29,
//     dateTime: "April 30, 2025 - 10:00 AM",
//     doctor: "Dr. Smith",
//     fees: "$100",
//     action: "View"
//   },
//   {
//     patient: "Jane Roe",
//     age: 34,
//     dateTime: "May 1, 2025 - 2:30 PM",
//     doctor: "Dr. Adams",
//     fees: "$120",
//     action: "View"
//   },
//   {
//     patient: "Mike Johnson",
//     age: 41,
//     dateTime: "April 29, 2025 - 11:15 AM",
//     doctor: "Dr. Brown",
//     fees: "$80",
//     action: "Cancelled"
//   }
// ];



// const Appointments = () => {

//   const {  isLoading, doctor  , appointments, cancelledAppointments} = useSelector((state) => state?.admin);  
// console.log(`my appointment for the admin is like this JSON.stringify(${appointments}  & ${isLoading}`)

  
//   const dispatch = useDispatch(); 


//   useEffect(() => {
//     dispatch(appointmentAdmin())
//   // toast.success("appointments fetch successfully"); 
  
//   }, [dispatch,]);
  
 

//   const isCompleted = appointments?.appointment?.filter(item => item.isCompleted);
//   const costAmt = appointments?.appointment?.filter(item => item.fees);
//   console.log(` isCompleted is  ${isCompleted} `)








//   return (

//    <>
//    {isLoading && <Loader/> }
//     <TableContainer component={Paper} sx={{ mt: 4 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Patient</strong></TableCell>
//             <TableCell><strong>user Email</strong></TableCell>
   

//             <TableCell><strong>Date & Time</strong></TableCell>
//             <TableCell><strong>Doctor</strong></TableCell>
//             <TableCell><strong>Fees</strong></TableCell>
//             <TableCell><strong>Action</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           { Array.isArray(appointments?.appointment) &&  appointments?.appointment.length > 0 &&  
//           appointments?.appointment?.map((row) => (
//             <TableRow key={row._id}>
//               <TableCell>{shortenText(row && row?.userId?.name, 10) } </TableCell>
//               <TableCell>{shortenText(row && row?.userId?.email, 10) } </TableCell>
//               {/* <TableCell>{row.slotTime}</TableCell> */}
//               <TableCell>
//   {row.slotDate
//     ? `${new Date(row.slotDate).toLocaleDateString()} - ${row.slotTime}`
//     : row.slotTime}
// </TableCell>



//               <TableCell>  {shortenText(row && row?.docData?.name, 10)  } </TableCell>
//               <TableCell> $ {''}{ row && row?.docData?.fees}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="outlined"
//                   color={ isCompleted ? "primary" : "error"}
//                   size="small"
//                 >
//                   {isCompleted ? 'completed' : 'uncompleted'}
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </>
//   );
// };

// export default Appointments;


