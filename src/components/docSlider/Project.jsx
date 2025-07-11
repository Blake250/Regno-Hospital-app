import React from 'react'
import styled from 'styled-components'

import SlideComponent from './SlideComponent'
//import HomeInfo from './homeBox/HomeInfo'




const Project = () => {
  return (
    <Container>
      <Contain>   
      

           <SlideItems>
            <SlideComponent/>
           
           </SlideItems>
           <Info> 
           {/* <HomeInfo/> */}
           <LatestItem>
          
          </LatestItem>
       
           </Info>
       
      </Contain>
      </Container>
  )
}

export default Project



const Container = styled.div`
width:100% !important;
overflow-x:hidden;
height:100vh;
//width:80%;
max-width:1280px;
margin:0 auto;
@media (max-width:848px) {
  width:90%;
  
}

`
const LatestItem = styled.div`
//margin-top:-90px
//padding-bottom:80px;

`
const SlideItems = styled.div`
  

`
const Info = styled.div`
margin-bottom:60px;
//padding-top:-120px;
`



const Contain = styled.div`
//padding:3rem 0;
text-align:center;
h1{
  font-size:1.9rem;
  line-height:0.5;
}
p{
  width:28rem;
 margin:0 auto;
 padding:1rem 0;
 //padding:0.8rem 0;
 font-size:0.9rem;
 font-weight:600;
 @media (max-width: 500px) {
  width:90% !important;
  
 }
}




















// import React from 'react'
// import styled from 'styled-components'

// import SlideComponent from './SlideComponent';







// const Project = () => {
//   return (
//     <Container>
//         <Contain>
//        <h1>
//         Recent
//         <span 
//         className='green'
//         >
//         Project
//         </span>
//        </h1>

//     <p>
//         Lorem ipsum dolor sit 
//         amet consectetur adipisicing elit. Facere ducimus autem non tempore 
//         reprehenderit voluptatem nihil! Sint cum vel placeat?
//     </p>

//         </Contain>

//         { <Slide>
//             { <SlideComponent/> }
//         </Slide>   }
       
        
//         </Container>
//   )
// }

// export default Project




// const Container = styled.div`
// width:100%;
// height:100%;



// `

// const Contain = styled.div`
//   //width: 0px;
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 1rem;
//   text-align:center;

//   h1 {
//     font-size: 2rem;
//   };

//   p {
//     width: 28rem;
//     margin: 0 auto;
//     padding: 1rem;
//     font-size: 0.9rem;
//     color: green;
//   };
// `;

// const Slide = styled.div`

// `