import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'default' | 'auth';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'default' 
}) => {
  const sizeConfig = {
    small: {
      iconSize: 32,
      fontSize: '1rem',
      captionSize: '0.75rem',
    },
    medium: {
      iconSize: 40,
      fontSize: '1.125rem',
      captionSize: '0.8rem',
    },
    large: {
      iconSize: 56,
      fontSize: '1.5rem',
      captionSize: '0.875rem',
    },
  };

  const config = sizeConfig[size];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: showText ? 2 : 0,
      justifyContent: variant === 'auth' ? 'center' : 'flex-start'
    }}>
      <Box
        sx={{
          width: config.iconSize,
          height: config.iconSize,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #5b6ce2 0%, #8a9eff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: config.fontSize,
          boxShadow: '0 4px 12px rgba(91, 108, 226, 0.3)',
        }}
      >
        F
      </Box>
      {showText && (
        <Box sx={{ textAlign: variant === 'auth' ? 'center' : 'left' }}>
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ 
              lineHeight: 1.2,
              fontSize: config.fontSize,
              background: 'linear-gradient(135deg, #5b6ce2 0%, #8a9eff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: variant === 'auth' ? 'transparent' : 'inherit',
              color: variant === 'auth' ? 'transparent' : 'inherit',
            }}
          >
            FinDash
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: config.captionSize,
              display: 'block'
            }}
          >
            Financial Dashboard
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Logo;
