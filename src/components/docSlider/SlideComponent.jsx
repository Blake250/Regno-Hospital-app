





// SlideComponent.js
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import HomeSlider from './HomeSlider'; // Your individual slide component
import { sliderData } from './slideData';

// Import required slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
//import { getAllDoctors } from '../../feature/adminAuth/adminSlice';
import { useNavigate } from 'react-router-dom';


const SlideComponent = () => {
  const sliderRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const doctor = useSelector((state)=> state?.admin)

    const { user, } = useSelector((state) => state?.auth);  
    // console.log(`user is ${JSON.stringify(user)}`); 
 
//console.log(`The doctors data  look like this ${JSON.stringify(doctor) }`)


  //const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //const sliderRef = useRef(null); 
  const containRef = useRef(null)
 const dispatch = useDispatch()


 

//  useEffect(() => {
//   if(user && user?.role === 'admin'){
//     dispatch(getAllDoctors());
//   }
 
//  }, [dispatch, user]);



// useEffect(()=>{
//   dispatch(getAllDoctors())

// } ,[dispatch] )




  
    const changeImage = (currentSlide, nextSlide) => {
      setCurrentImageIndex(nextSlide);
    };
  


    useEffect(() => {
    
      const interval = setInterval(() => {

    
      
     const nextSlide = (currentImageIndex + 1) % sliderData.length;
     
    //const nextSlide = setCurrentImageIndex((currentImageIndex)=> (currentImageIndex + 1)% sliderData.length )
      // sliderRef.current?.slickGoto(nextSlide)
       if(sliderRef.current){

          sliderRef.current?.slickGoTo(nextSlide ); 
        }

        if(containRef.current){  
           containRef.current?.slickGoTo(nextSlide ); 

        }
     
     
      }, 5000);
     
     
      return () => clearInterval(interval);
   
    
   }, [ currentImageIndex  ] );








  var settings = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    
  beforeChange:  (currentSlide, nextSlide) => changeImage(currentSlide, nextSlide), // Use beforeChange
    responsive: [
            

      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: false,
          arrows:true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }



    ],
  };

let sliderItem ;


sliderItem = sliderData?.map((item, id)=>(
  <HomeSlider  item={item}  key={id}/>
))


  return (
    <SlideContainer>
      <Background image={sliderData[currentImageIndex].image} />


      <TextOverlay>
      <h1 style={{color:'black'}} >Book <span className="green">Now</span></h1>
      <p>
      Regno Hospital is a digital platform that lets you easily book appointments with trusted doctors.
       From general check-ups to specialist care,
       we connect you to the right medical help on your schedule. Fast, simple, and secure healthcare at your fingertips.
      </p>
    </TextOverlay>



      <StyledSlider ref={sliderRef} {...settings}>
       {
        sliderItem
       }
  
 
      </StyledSlider>
    </SlideContainer>
  );
};

export default SlideComponent;

// Styled components
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height:100vh;
  padding: 2rem 0;
  overflow: hidden;
 // margin-bottom: 0!important;

`;

const Background = styled.div`
  position: absolute;
top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  filter: brightness(1);
  z-index:-1;
`;

const StyledSlider = styled(Slider)`
  .slick-slider{
    padding: 0 10px;
   /* padding-bottom:40px; */
    display:flex;
   
  }

  .slick-prev {
    left: 10px !important;  
 }
  .slick-next {
    right: 20px !important; 
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
 
  }

  .slick-prev:before,
  .slick-next:before {
    color: white;
    font-size: 30px;
  }
`;



const TextOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-52%);
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 90%;
 // padding: 1rem;
  @media(max-width:768px) {
    padding:0px;
  };

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .green {
    color: #00ff90;
  }

  p {
    font-size: 1rem;

    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    background: rgba(0,0,0,0.4); /* Optional: adds contrast */
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    width:400px;
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.85rem;
    }
  }
`;
