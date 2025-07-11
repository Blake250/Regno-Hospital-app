import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { shortenText } from "../../../util"





const HomeSlider = (props) => {
    const {image, heading, desc, } = props.item
    const navigate = useNavigate()


    const openDocDetails = () => {
      navigate(`/doctors`);
      scrollTo(0, 0);
    };
  
  





  return (
    <Container  className='project'>
        

        <img src={image} alt="" />
    
        <div className='desc' >

            <h1>{heading}</h1>
            <p>
              {shortenText(desc, 95) }
             
              <hr></hr>
              </p> 
            
             
              <h4 
              
              onClick={()=>openDocDetails()}
              >
             
                 <a
                 style={{
                  marginLeft:'-20px !important'
                 }}
                 >
             Find A Doctor
                 </a>
                 </h4>  
          
      
          

        </div>
    </Container>
  )
}

export default HomeSlider



const Wrapper = styled.div`

`



const Container = styled.div`
  position: relative;
  height: 14rem;
  background-color: #4e5156;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease-in-out;
    border-radius: 5px;
  }

  &:hover img {
    transform: scale(1.2);
    filter: brightness(0.7); /* Optional: darken for better contrast with overlay */
  }

  .desc {
    position: absolute;
    top: 100%; /* Initially hidden just below */
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: top 0.4s ease, opacity 0.4s ease;
    z-index: 2; /* Ensure it's above the image */
    
    width: 90%;
    height: 120px;
    background: linear-gradient(
      rgba(185, 170, 170, 0.1),
      rgba(177, 183, 188, 0.8)
    );
    color: white;
    text-align: center;
    padding: 0.5rem;
    border-radius: 5px;

    h1 {
      margin-bottom: 0.1rem;
      font-size: 16px;
      color: #009933;
      white-space: nowrap;
    }

    p {
      width: 90%;
      font-size: 0.8rem;
      color: white;
      font-style: italic;
      text-align: start;

      hr {
        margin-top: 8px;
        padding-top: 5px;
        background-color: darkgrey;
      }
    }

    h4 {
      background-color: darkblue;
      padding: 1px;
      border-radius: 5px;
      text-align: center !important;
      width: 75%;
     // margin: 0.5rem auto 0;
    margin: -10px auto 100px;
    margin-left:25px;
    @media (max-width:768px) {
      margin-left:30px !important; 
    }


      a {
        color: white;
        text-decoration: none;
    // margin-left:'-80px'
      }
    }

    &::before {
      content: " ";
      position: absolute;
      width: 10px;
      height: 2px;
      border-radius: 5px;
      background-color: #fff;
      animation: moveLine 6s linear infinite;
    }
  }

  &:hover .desc {
    top: 50%; /* Reveal centered overlay */
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 150px;

    .desc {
      top: 110%;
    }

    &:hover .desc {
      top: 50%;
    }
  }

  @keyframes moveLine {
    0%, 100% {
      left: 0;
      top: 0;
    }
    25% {
      left: calc(100% - 1vw);
      top: 0;
    }
    50% {
      left: calc(100% - 1vw);
      top: 100%;
    }
    75% {
      left: 0;
      top: 100%;
    }
  }
`;



