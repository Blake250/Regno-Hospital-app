



import AdminNavBarLayer from './AdminNavBar';
import Admin from './Admin';
import { Box } from '@mui/material';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import { Outlet } from 'react-router-dom';

const BarLayOut = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Admin />

      {/* Main content area (header + page content) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: 'calc(100% - 240px)', // Sidebar is 240px wide
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header bar */}
        <Box
          sx={{
            height: '64px',
            backgroundColor: 'white',
            color: '#0033cc',
            p: 2,
            borderBottom: '1px solid #ddd',
          }}
        >
          <AdminNavBarLayer
            iconBar={<CenterFocusStrongRoundedIcon sx={{ fontSize: 30, color: '#0033cc' }} />}
            title="Admin Panel"
          />
        </Box>

        {/* Page content rendered via <Outlet /> */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default BarLayOut;





// import AdminNavBarLayer from './AdminNavBar'
// import Admin from './Admin'
// import { Box } from '@mui/material'
// import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
// import DashBoard from '../dashBoard/DashBoard';



// const BarLayOut = () => {
//   return (
//     <Box sx={{
//        height: '100%',
//      display: 'flex', 
//      width:'100%',
//      flexDirection: 'column',
//   //  calc:uu("100%"- '20%'),

//      }}>
//       {/* Header bar */}
//       <Box sx={{ 
//         height: '64px',
//          backgroundColor: '#white',
//          color:'#0033cc',
//          p: 2,


        
//          }}>
//         <AdminNavBarLayer 
//         iconBar={<CenterFocusStrongRoundedIcon sx={{ fontSize: 30, color: '#0033cc' }} />}
//         title="Admin Panel" 
//         />
//       </Box>

//       {/* Main body: sidebar + content */}
//       <Box sx={{ flex: 1, display: 'flex' }}>
//         <Admin /> {/* Sidebar */}
        
     
//        </Box>
//     </Box>
//   )
// }

// export default BarLayOut





