
import { Box } from "@mui/material"
import Header from "../components/Header"
import SpecialtyMenu from "../components/SpecialtyMenu"
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"

import CarouselItem from "../components/carousel/CarouselItem"
import Project from "../components/docSlider/Project"
import SlideComponent from "../components/docSlider/SlideComponent"
//import SlideComponent from "../components/docSlider/SlideComponent"
  import { keyframes } from "@emotion/react";


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







const Home = () => {

  return(
    <>  
    
    <Box
   sx={{
       animation: `${styledAnimation} 0.6s ease`,
   }}
    
    >
    
  <Header/> 
  <Box

  >
  {/* <Project/> */}
    <SlideComponent/>
  <SpecialtyMenu/>
  <TopDoctors/>
  </Box>
<CarouselItem/>
  <Banner/>

    </Box>

    </>
  )
}

export default Home