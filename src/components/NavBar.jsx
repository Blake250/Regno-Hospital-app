import { NavLink, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { Box, Typography, Button, Avatar, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOutUser, RESET_AUTH, setUser } from '../feature/auth/authSlice';
import ShowOnLogin, { ShowOnLogOut } from './hiddenLinks/hideLinks';
import { shortenText } from '../../util';
import { AdminOnlyLinks } from './hiddenLinks/adminOnlyRoute';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, storedUserDetails } = useSelector((state) => state?.auth)
  const user = useSelector((state) => state?.auth?.user);
  console.log(`NavBar - isLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(user)}`);
  const dispatch = useDispatch();

  useEffect(() => {
  if (isLoggedIn && !user?.name) {
    dispatch(getUser());
  }
}, [isLoggedIn, user, dispatch]);

  const userImg = user?.photo || '';
  const userData = user?.name || '';

;


  const logout = async () => {
  try {
    await dispatch(logOutUser()).unwrap();

    // ✅ Clear Redux and localStorage before navigation
    dispatch(RESET_AUTH());
  

    setTimeout(() => {
  navigate("/login");
  setShowMenu(false);    
}, 500);

    toast.success("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  // Menu items
  const menu = [
    { id: 1, name: 'Home', path: '/' },
    { id: 4, name: 'All Doctors', path: '/doctors' },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 2, name: 'About', path: '/about' },
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
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          px: { xs: 1, md: 2 },
          height: { xs: '60px', md: '80px' },
          position: 'relative',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {isLoggedIn ? (
            <>
              <CenterFocusStrongRoundedIcon
                onClick={() => navigate('/')}
                sx={{ fontSize: { xs: '24px', md: '30px' }, marginRight: '10px', color: '#0033cc' }}
              />
              <Typography
                onClick={() => navigate('/')}
                sx={{ fontWeight: '600', fontSize: { xs: '16px', md: '18px' }, color: '#0033cc' }}
              >
                Logoipsum
              </Typography>
            </>
          ) : (
            <>
              <CenterFocusStrongRoundedIcon
                onClick={() => navigate('/login')}
                sx={{ fontSize: { xs: '24px', md: '30px' }, marginRight: '10px', color: '#0033cc' }}
              />
              <Typography
                onClick={() => navigate('/login')}
                sx={{ fontWeight: '600', fontSize: { xs: '16px', md: '18px' }, color: '#0033cc' }}
              >
                Logoipsum
              </Typography>
            </>
          )}
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {menu?.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              style={{ textDecoration: 'none' }}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <ShowOnLogin>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '15px',
                    padding: '0 18px',
                    color: 'inherit',
                    transition: 'transform 0.4s ease',
                    '&:hover': { color: 'black', transform: 'scale(1.2)' },
                  }}
                >
                  {item.name}
                </Typography>
              </ShowOnLogin>
            </NavLink>
          ))}
          <NavLink
            to={'/admin'}
            className={({ isActive }) => (isActive ? 'activeLink' : '')}
          >
            <AdminOnlyLinks>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px',
                  padding: '0 18px',
                  color: 'inherit',
                  transition: 'transform 0.4s ease',
                  '&:hover': { color: 'black', transform: 'scale(1.2)' },
                }}
              >
                Admin
              </Typography>
            </AdminOnlyLinks>
          </NavLink>
        </Box>

        {/* Profile Image + Down Arrow + Mobile Menu Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn ? (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  color: 'green',
                  fontSize: '17px',
                  pr: { xs: '10px', md: '60px' },
                }}
              >
                <NavLink
                  to={'/profile'}
                  className={({ isActive }) => (isActive ? 'activeLink' : '')}
                >
                  <Typography
                    sx={{
                      fontWeight: '400',
                      color: 'green',
                      cursor: 'pointer',
                      transition: 'color 0.9s ease, transform 0.9s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        color: 'black',
                      },
                      fontSize: { xs: '12px', md: '15px' },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ marginRight: '5px' }}>Hi</span>
                    {shortenText(userData, 9)}
                  </Typography>
                </NavLink>
              </Box>
              <Stack
                direction="column"
                alignItems="center"
                sx={{
                  pr: { xs: 0, md: '25px' },
                  cursor: 'pointer',
                  '&:hover .dropdownMenu': {
                    opacity: 1,
                    visibility: 'visible',
                  },
                }}
              >
                <Avatar
                  src={userImg || './prescripto_assets/assets/assets_frontend/profile_pic.png'}
                  alt={userData || 'Profile'}
                  sx={{ width: { xs: 35, md: 45 }, height: { xs: 35, md: 45 } }}
                />
                <KeyboardArrowDownIcon sx={{ fontSize: { xs: '16px', md: '20px' }, mt: '-5px' }} />
                <Box
                  className="dropdownMenu"
                  sx={{
                    position: 'absolute',
                    top: { xs: '50px', md: '60px' },
                    right: 0,
                    backgroundColor: '#5b81ce',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.5s ease, visibility 0.5s ease',
                    width: { xs: '150px', md: '200px' },
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
                aria-label={showMenu ? 'Close menu' : 'Open menu'}
                onClick={() => setShowMenu(!showMenu)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  p: 1,
                  width: { xs: '40px', md: '48px' },
                  height: { xs: '40px', md: '48px' },
                }}
              >
                {showMenu ? (
                  <CloseIcon sx={{ fontSize: '24px', color: 'black' }} />
                ) : (
                  <MenuIcon sx={{ fontSize: '24px', color: 'black' }} />
                )}
              </IconButton>
            </Stack>
          ) : (
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => navigate('/login')}
              sx={{
                fontSize: { xs: '10px', md: '12px' },
                display: { xs: 'none', md: 'block' }, // Hide on mobile, show on desktop
                position: 'absolute',
                right: { xs: '50px', md: '20px' },
                top: { xs: '15px', md: '20px' },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>

      {/* Mobile Slide-In Menu */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: showMenu ? 0 : '-100%',
          height: '50vh',
          width: { xs: '250px', sm: '300px' },
          backgroundColor: '#99ccff',
          zIndex: 1000,
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          transition: 'left 0.3s ease-in-out',
          boxShadow: showMenu ? '2px 0 5px rgba(0,0,0,0.3)' : 'none',
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
              padding: '10px 0',
              width: '80%',
              textAlign: 'center',
            }}
            onClick={() => setShowMenu(false)}
          >
            <Typography sx={textStyle}>{item.name}</Typography>
          </NavLink>
        ))}
                 <AdminOnlyLinks
                    onClick={logout}
                 >
          <NavLink
            to={'/login'}
            className={({ isActive }) => (isActive ? 'activeText' : '')}
            style={{
              textDecoration: 'none',
              borderBottom: '1px solid black',
              padding: '10px 0',
              width: '80%',
              textAlign: 'center',
            }}
          onClick={() => setShowMenu(false)}
         //   onClick={logout}
         
          >
            <Typography
            sx={textStyle}>Logout</Typography>
          </NavLink>
        </AdminOnlyLinks> 
        <ShowOnLogOut>
          <NavLink
            to={'/login'}
            className={({ isActive }) => (isActive ? 'activeText' : '')}
            style={{
              textDecoration: 'none',
              borderBottom: '1px solid black',
              padding: '10px 0',
              width: '80%',
              textAlign: 'center',
            }}
            onClick={() => setShowMenu(false)}
          >
            <Typography sx={textStyle}>Login</Typography>
          </NavLink>
        </ShowOnLogOut>
        {/* <ShowOnLogin>
          <NavLink
            to={'/login'} // Navigate to login after logout
            className={({ isActive }) => (isActive ? 'activeText' : '')}
            style={{
              textDecoration: 'none',
              borderBottom: '1px solid black',
              padding: '10px 0',
              width: '80%',
              textAlign: 'center',
            }}
            onClick={logout}
          >
            <Typography sx={textStyle}>Logout</Typography>
          </NavLink>
        </ShowOnLogin> */}
      </Box>
    </Box>
  );
};

export default NavBar;








