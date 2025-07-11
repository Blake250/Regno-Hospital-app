
import { Box } from "@mui/material"
import Header from "../components/Header"
import SpecialtyMenu from "../components/SpecialtyMenu"
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"

import CarouselItem from "../components/carousel/CarouselItem"
import Project from "../components/docSlider/Project"
import SlideComponent from "../components/docSlider/SlideComponent"







const Home = () => {
 // const {isLoggedIn, isLoading, isSuccess, user} = useSelector((state)=> state?.auth)

//const dispatch = useDispatch()

  // useEffect(()=>{
  //   if(isLoggedIn && user === null){
  //     dispatch(getUser())
  //   }
  // },[dispatch, user, isLoggedIn])


  //   useEffect(()=>{
  //     //if(isLoggedIn && is)
  //    dispatch(getLoginStatus())
  //   },[dispatch])


  return(
    <>  
    
    <Box
   
    
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