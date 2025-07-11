




import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import { json, NavLink, useLocation, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOutUser, RESET_AUTH, setUser, updatedUser } from '../feature/auth/authSlice';
import ShowOnLogin, { ShowOnLogOut } from './hiddenLinks/hideLinks';
import { shortenText } from '../../util';
import { AdminOnlyLinks } from './hiddenLinks/adminOnlyRoute';

//import { shortenText } from './utils';

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, isSuccess,  user,} = useSelector((state) => state?.auth);
  
  const  storedUserDetails  = useSelector((state) => state?.auth?.storedUserDetails) || {}
  // console.log(`we have the ${ JSON.stringify(storedUserDetails)}`)

 const dispatch = useDispatch();

  // const location = useLocation()
//useEffect(()=>{

//   const fetchUser = async()=>{
//     const parsed = localStorage.getItem('profile')
//     if(user && storedUserDetails === null){
//     //  await dispatch(getUser())
//     const fetchInfo = JSON.parse(parsed)
//   //    await dispatch(updatedUser(fetchInfo))
//       await dispatch(setUser())
//     }
    
 
//   }
// fetchUser()

// }, [dispatch,user])


  const userImg = storedUserDetails ? storedUserDetails?.photo:'';
 
const userData = storedUserDetails ? storedUserDetails?.name : '';


  const logout = async () => {
  
    await dispatch(logOutUser());
     // dispatch(RESET_AUTH());
   //  localStorage.removeItem('profile');
      navigate('/login');
  
       

 
   
  };

 
 
 



  const menu = [
    { id: 1, name: 'Home', path: '/' },
    { id: 4, name: 'All Doctors', path: '/doctors' },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 2, name: 'About', path: '/about' },
  //  { id: 5, name: 'Admin', path: '/admin' },
  ];

  const textStyle = {
    fontSize: '14px',
    color: '#003366',
    cursor: 'pointer',
    transition: 'color 0.8s ease',
    textAlign: 'center',
    '&:hover': { color: 'white' },
  };

  return (
    <Box sx={{
       width: '100% important',
       maxWidth:'100% !important'
    
       
       }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          px: 2,
         // width:'100%',
          height:'13vh',
        
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
       {
    isLoggedIn ? (

      <>  
      <CenterFocusStrongRoundedIcon
      onClick={() => navigate('/')}
      sx={{ fontSize: '30px', marginRight: '10px', color: '#0033cc' }}
    />
    <Typography
      onClick={() => navigate('/')}
      sx={{ fontWeight: '600', fontSize: '18px', color: '#0033cc' }}
    >
      Logoipsum
    </Typography>
    </>

    ) : (
     <>   
      <CenterFocusStrongRoundedIcon
              onClick={() => navigate('/login')}
            sx={{ fontSize: '30px', marginRight: '10px', color: '#0033cc' }}
          />
          <Typography
            onClick={() => navigate('/login')}
            sx={{ fontWeight: '600', fontSize: '18px', color: '#0033cc' }}
          >
            Logoipsum
          </Typography>

          </>

    )

   

       }
        </Box>
     
        {/* Desktop Menu */}
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              style={{ textDecoration: 'none' }}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <ShowOnLogin>
                <Typography
                  sx={{
                    whiteSpace:'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '15px',
                    padding:'0 18px',
                    color: 'inherit',
                    transition: 'transform 0.4s ease',
                    '&:hover': { color: 'black', transform: 'scale(1.2)' },
                    '@media(max-width:768px)': { display: 'none', whiteSpace:'none !important' },  
                  }}
                >
                  {item.name}
                </Typography>

              </ShowOnLogin>

        

            </NavLink>
          ))}

          <NavLink to={'admin '} 
           className={({ isActive }) => (isActive ? 'activeLink' : '')}
          >
            <AdminOnlyLinks>
             <Typography
                    sx={{
                      whiteSpace:'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '15px',
                      padding:'0 18px',
                      color: 'inherit',
                      transition: 'transform 0.4s ease',
                      '&:hover': { color: 'black', transform: 'scale(1.2)' },
                      '@media(max-width:768px)': { display: 'none', whiteSpace:'none !important' },  
                    }}
             >
               Admin
             </Typography>
             </AdminOnlyLinks>
          </NavLink>
        </Box>

        {/* Profile Image + Down Arrow + Mobile Menu Toggle */}
        <Box>
      
        {isLoggedIn ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ position: 'relative' }}
          >
             <Box
             sx={{
             paddingRight:'60px !important',
            display:'flex',
            justifyContent:'center',
           alignItems:'space-between',
           fontWeight:'600',
           color:'green',
           fontSize:'17px'
             }}
             > 
            <NavLink
            
            className={({isActive})=>(isActive ? 'activeLink' : '')}  
            to={'/profile'} 
            >  
    
            <Typography
//  component="span"
  sx={{
    fontWeight: '400',
    color: 'green',
    cursor: 'pointer',
    transition: 'color 0.9s  ease transform 0.9s ease',
        '&:hover': {
      transform: 'scale(1.1)',
      color: 'black',
    },
    '@media(max-width:768px)':{
      fontSize:'12px !important',
      whiteSpace:"nowrap!important",
     
              
   
     }
  }} 
   
>
<span
             style={{
              fontSize:'15px',
              marginRight:'5px',
              '@media(max-width:768px)':{
               
              
             
               }
           
             }}
         
             >Hi</span> 
  {shortenText(userData, 9)}
</Typography>
</NavLink>

  
       </Box>
            <Stack
              direction="column"
              alignItems="center"
         
              sx={{
                paddingRight:'25px',
                cursor: 'pointer',
                '@media(max-width:768px)':{
                  paddingRight:'0px !important',
                   },
                '&:hover .dropdownMenu': {
                  opacity: 1,
                  visibility: 'visible',
                },
              }}
            >
              <Avatar
                src={userImg  ? userImg : './prescripto_assets/assets/assets_frontend/profile_pic.png'}
                alt={userData || 'Profile'}
                sx={{ width: 45, height: 45 }}
              />
              <KeyboardArrowDownIcon sx={{ fontSize: '20px', marginTop: '-5px' }} />
              <Box
                className="dropdownMenu"
                sx={{
                  position: 'absolute',
                  top: '60px',
                  backgroundColor: '#5b81ce',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  zIndex: 1,
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'opacity 0.5s ease, visibility 0.5s ease',
                }}
              >
                <Typography onClick={() => navigate('/profile')} sx={textStyle}>
                  My Profile
                </Typography>
                <Typography onClick={() => navigate('/my-booking')} sx={textStyle}>
                  Appointments
                </Typography>
                <Typography onClick={logout} sx={textStyle}>
                  Logout
                </Typography>
              </Box>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={() => setShowMenu(!showMenu)}
              sx={{
                display: { xs: 'block', md: 'none' },
                outline: 'none !important',
              }}
            >
              {showMenu ? <CloseIcon /> : <MenuIcon sx={{ color: 'black' }} />}
            </IconButton>
          </Stack>
        ) : (
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={() => navigate('/login')}
            sx={{
              fontSize: '12px',
              position: 'absolute',
              right: '20px',
              top: '5%',
              '@media(max-width:768px)': {
                right: '40px',
              },
            }}
          >
            Get Started
          </Button>
        )}
      </Box>

      {/* Mobile Slide-In Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: showMenu ? 0 : '-50vw',
          height: '60vh',
        //  width: '50vw',
          backgroundColor: '#99ccff',
          zIndex: 10,
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          transition: 'left 0.3s ease-in-out',
        }}
      >
        {menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => (isActive ? 'activeText' : '')}
            style={{
              textDecoration: 'none',
              borderBottom: '1px solid black',
              padding: '5px 0px',
              width: '260px',
            }}
            onClick={() => setShowMenu(false)}
          >
            <Typography sx={textStyle}>{item.name}</Typography>
          </NavLink>
        ))}
      </Box>
      </Box>
      </Box>
   
  );
};

export default NavBar;















