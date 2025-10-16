import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { useTheme } from '../../theme';

interface LoadingScreenProps {
  message?: string;
  size?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...', 
  size = 60 
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(249, 249, 251, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: 4,
            borderRadius: 3,
            backgroundColor: isDarkMode ? 'rgba(28, 28, 31, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #5b6ce2 0%, #8a9eff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '2rem',
              mb: 2,
            }}
          >
            F
          </Box>
          
          <CircularProgress 
            size={size} 
            thickness={4}
            sx={{
              color: 'primary.main',
            }}
          />
          
          <Typography 
            variant="h6" 
            color="text.primary"
            fontWeight={500}
            textAlign="center"
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default LoadingScreen;
