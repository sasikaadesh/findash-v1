import { useTheme, useMediaQuery } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    breakpoints: {
      xs: useMediaQuery(theme.breakpoints.only('xs')),
      sm: useMediaQuery(theme.breakpoints.only('sm')),
      md: useMediaQuery(theme.breakpoints.only('md')),
      lg: useMediaQuery(theme.breakpoints.only('lg')),
      xl: useMediaQuery(theme.breakpoints.only('xl')),
    },
  };
};
