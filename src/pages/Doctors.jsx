import {
  Box,
  Button,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../feature/adminAuth/adminSlice";
import Pagination from "../components/num-page/numPage";
import Loader from "../components/loader/Loader";

const Doctors = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state?.admin);
  const {isLoading}= useSelector((state) => state?.admin);
console.log(`isLoading is ${isLoading}`)
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);

  // Get category from query string
  const queryParams = new URLSearchParams(location.search);
  const queryCategory = queryParams.get("category");

  // Fetch all doctors on mount
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);




 const doctors =  Array.isArray(doctor?.doctor?.doctors)
  ? doctor?.doctor?.doctors
  : []



  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(doctors?.map((doc) => doc?.speciality))];
    setCategories(uniqueCategories);
    setFilteredDoctors(doctors);

    // If category was passed from query string, filter immediately
    if (queryCategory) {
      handleCategoryClick(queryCategory);
    }
  }, [doctors]);





  // Populate categories and doctors when doctors change
// useEffect(() => {
//   const uniqueCategories = [...new Set(doctors?.map((doc) => doc?.speciality))];
//   setCategories(uniqueCategories);
//   setFilteredDoctors(doctors);
// }, [doctors]);

// // Run filtering only once on mount if queryCategory exists
// useEffect(() => {
//   if (queryCategory && doctors.length > 0) {
//     const filtered = doctors.filter(
//       (doc) => doc?.speciality?.toLowerCase() === queryCategory.toLowerCase()
//     );
//     setFilteredDoctors(filtered);
//     setSelectedCategory(queryCategory);
//   }
// }, [queryCategory, doctors]);














  // Handle resizing for showing/hiding filter
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);






  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setFilteredDoctors(doctors); // remove filter
      setSelectedCategory(null);
    } else {
      const filtered = doctors.filter(
        (doc) => doc?.speciality?.toLowerCase() === category.toLowerCase()
      );
      setFilteredDoctors(filtered); // apply filter
      setSelectedCategory(category);
    }
  };


  
    const itemsPerPage = 6
    const [itemOffset, setItemOffset] =useState(0)
    const endOffset = itemOffset + itemsPerPage
    const currentItems = filteredDoctors.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(filteredDoctors.length/ itemsPerPage)
  
  
  
    const handlePageClick = (event)=>{
  const newOffset =event.selected * itemsPerPage
  setItemOffset(newOffset)
   
    }
  


  return (
   <> 
  {isLoading && <Loader/> }

    <Box sx={{
   //   height:'200vh',
       width: { xs: "95%", md: "100vw" },
        padding: "2px",
       paddingBottom:'150px'
        
        } }>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
          marginLeft: "15%",
          marginTop: "40px",
          "@media(max-width:768px)": {
            fontSize: "16px",
            marginLeft: "0%",
          },
        }}
      >
        Browse Through The Doctors Specialist
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 3fr" },
          gap: 4,
          alignItems: "start",
          "@media(max-width:768px)": {
            marginBottom: "20px",
            width: "90%",
          },
        }}
      >
        {/* Filter Toggle Button */}
        <Box sx={{ display: { xs: "block", md: "none" }, marginBottom: "20px" }}>
          <Button
            size="small"
            variant={showFilter ? "outlined" : "contained"}
            onClick={() => setShowFilter((prev) => !prev)}
            sx={{ width: "80px", padding: "5px" }}
          >
            Filter
          </Button>
        </Box>

        {/* Category Sidebar */}
        {(showFilter || window.innerWidth >= 768) && (
          <Box
            sx={{
              backgroundColor: "#f7f7f7",
              padding: "20px",
              border: "1px solid black",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: "200px",
            }}
          >
            {categories?.map((category, index) => (
              <Typography
                key={index}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  cursor: "pointer",
                  color: "#007bff",
                  borderBottom: "1px solid black",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "4px 12px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    selectedCategory === category ? "#e8f4fd" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e8f4fd",
                    color: "#0056b3",
                  },
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        )}

        {/* Doctors List */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            justifyItems: "center",
          }}
        >
          {currentItems.length > 0 ? (
            currentItems?.map((doctor) => (
              <Box
                key={doctor._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "200px",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <ImageListItem
                  onClick={() => navigate(`/booking/${doctor._id}`)}
                  sx={{
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    borderRadius: "50%",
                    position: "relative",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <img
                    src={doctor?.photo}
                    alt={doctor?.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>

                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    padding: "16px",
                    marginTop: "10px",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {doctor?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                    {doctor?.speciality}
                  </Typography>
                  <Stack sx={{ color: "green", fontSize: "12px" }}>
                    <Typography>
                      {doctor?.available ? "Available" : "Unavailable"}
                    </Typography>
                    <Typography>{doctor?.degree}</Typography>
                  </Stack>
   
                </Paper>
                <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>
         
              </Box>
            ))
          ) : (
            <Typography>No doctors available</Typography>
          )}
        </Box>
      </Box>
    </Box>

    </>

  );
};

export default Doctors;







