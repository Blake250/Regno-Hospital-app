

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  EventNote,
  PersonAdd,
  People,
  Logout,
  Menu,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, RESET_AUTH, setUser } from '../../feature/auth/authSlice';
import { shortenText } from '../../../util';

const drawerWidth = 240;

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user, isLoggedIn, storedUserDetails } = useSelector((state) => state?.auth);
  const userImg = storedUserDetails?.photo || '';

  if (isLoggedIn && !userImg) {
    dispatch(setUser());
  }

 const logout = async () => {
   try {
     await dispatch(logOutUser()).unwrap();
 
     // ✅ Clear Redux and localStorage before navigation
     dispatch(RESET_AUTH());
   
 
     setTimeout(() => {
       navigate("/login");
       
     }, 500);
   } catch (error) {
     console.error("Logout failed:", error);
   }
 };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Dashboard', icon: <Dashboard />, to: '/admin/dashboard' },
    { label: 'Appointments', icon: <EventNote />, to: '/admin/appointments' },
    { label: 'Add Doctor', icon: <PersonAdd />, to: '/admin/add-doctor' },
    { label: 'Doctor List', icon: <People />, to: '/admin/doctors-list' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', backgroundColor: '#0d1b2a', color: 'white' }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 50, height: 50, mb: 1, bgcolor: '#bcc5d6' }} src={userImg} />
        <Typography variant="subtitle1">
          {shortenText(user?.email, 14) || 'Admin'}
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#415a77' }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={NavLink}
            to={item.to}
            onClick={() => isMobile && setMobileOpen(false)}
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#88a0cc' : 'transparent',
              color: 'white',
              textDecoration: 'none',
            })}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, }}>
        <IconButton sx={{ color: 'white' }} onClick={logout}>
          <Logout />
          <Typography variant="body2" sx={{ ml: 5 }}>
            Logout
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Icon */}
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300 }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Drawer for Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Admin;





