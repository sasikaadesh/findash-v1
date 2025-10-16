import React from 'react';
import { Box, useTheme as useMuiTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useTheme } from '../theme';
import { getGlassBackgroundStyles } from '../theme/glassThemeUtils';
import { useSidebar } from '../contexts/SidebarContext';

const DRAWER_WIDTH = 280;

const MainLayout: React.FC = () => {
  const { isDarkMode, isGlassMode } = useTheme();
  const muiTheme = useMuiTheme();
  const { isOpen: sidebarOpen, isMobile, toggle: handleDrawerToggle, close: handleMobileDrawerClose } = useSidebar();

  const backgroundStyles = getGlassBackgroundStyles({ isDarkMode, isGlassMode });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        ...backgroundStyles,
      }}
    >
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar for Mobile */}
      {isMobile && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleMobileDrawerClose}
          variant="temporary"
        />
      )}

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleMobileDrawerClose}
          variant="persistent"
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          mt: '64px', // Height of AppBar
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.leavingScreen,
          }),
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden', // Prevent horizontal scroll
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
