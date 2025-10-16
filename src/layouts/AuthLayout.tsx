import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  BlurOn as BlurOnIcon,
  BlurOff as BlurOffIcon,
} from '@mui/icons-material';
import { useTheme } from '../theme';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isDarkMode, isGlassMode, toggleDarkMode, toggleGlassMode } = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 50%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #f5f7fa 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Theme Controls */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          gap: 1,
        }}
      >
        <Tooltip title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {isDarkMode ? (
              <LightModeIcon sx={{ color: '#fff' }} />
            ) : (
              <DarkModeIcon sx={{ color: '#000' }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title={`${isGlassMode ? 'Disable' : 'Enable'} Glass Mode`}>
          <IconButton
            onClick={toggleGlassMode}
            sx={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {isGlassMode ? (
              <BlurOffIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
            ) : (
              <BlurOnIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
