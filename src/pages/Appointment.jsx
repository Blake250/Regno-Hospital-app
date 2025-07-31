





import React, { useEffect } from "react";
//import { format } from "date-fns"; // install it with: npm install date-fns

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { appointmentAdmin } from "../../../feature/adminAuth/adminSlice";
import Loader from "../../loader/Loader";
import { shortenText } from "../../../../util";

const appointments = [
  {
    patient: "John Doe",
    age: 29,
    dateTime: "April 30, 2025 - 10:00 AM",
    doctor: "Dr. Smith",
    fees: "$100",
    action: "View"
  },
  {
    patient: "Jane Roe",
    age: 34,
    dateTime: "May 1, 2025 - 2:30 PM",
    doctor: "Dr. Adams",
    fees: "$120",
    action: "View"
  },
  {
    patient: "Mike Johnson",
    age: 41,
    dateTime: "April 29, 2025 - 11:15 AM",
    doctor: "Dr. Brown",
    fees: "$80",
    action: "Cancelled"
  }
];



const Appointments = () => {

  const {  isLoading, doctor  , appointments, cancelledAppointments} = useSelector((state) => state?.admin);  
console.log(`my appointment for the admin is like this JSON.stringify(${appointments}  & ${isLoading}`)

  
  const dispatch = useDispatch(); 


  useEffect(() => {
    dispatch(appointmentAdmin())
  // toast.success("appointments fetch successfully"); 
  
  }, [dispatch,]);
  
 

  const isCompleted = appointments?.appointment?.filter(item => item.isCompleted);
  const costAmt = appointments?.appointment?.filter(item => item.fees);
  console.log(` isCompleted is  ${isCompleted} `)








  return (

   <>
   {isLoading && <Loader/> }
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Patient</strong></TableCell>
            <TableCell><strong>user Email</strong></TableCell>
   

            <TableCell><strong>Date & Time</strong></TableCell>
            <TableCell><strong>Doctor</strong></TableCell>
            <TableCell><strong>Fees</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Array.isArray(appointments?.appointment) &&  appointments?.appointment.length > 0 &&  
          appointments?.appointment?.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{shortenText(row && row?.userId?.name, 10) } </TableCell>
              <TableCell>{shortenText(row && row?.userId?.email, 10) } </TableCell>
              {/* <TableCell>{row.slotTime}</TableCell> */}
              <TableCell>
  {row.slotDate
    ? `${new Date(row.slotDate).toLocaleDateString()} - ${row.slotTime}`
    : row.slotTime}
</TableCell>



              <TableCell>  {shortenText(row && row?.docData?.name, 10)  } </TableCell>
              <TableCell> $ {''}{ row && row?.docData?.fees}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color={ isCompleted ? "primary" : "error"}
                  size="small"
                >
                  {isCompleted ? 'completed' : 'uncompleted'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};
export default Appointments; 


