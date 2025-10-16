import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5b6ce2',
      light: '#8a9eff',
      dark: '#3f4caf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1c1c1f',
      light: '#2a2a2d',
      dark: '#0f0f10',
      contrastText: '#f5f5f7',
    },
    background: {
      default: '#121212',
      paper: '#1c1c1f',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#9ca3af',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#f5f5f7',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#f5f5f7',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#f5f5f7',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#f5f5f7',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#f5f5f7',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#f5f5f7',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#f5f5f7',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#9ca3af',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(91, 108, 226, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1c1c1f',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1c1c1f',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'transparent !important',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5b6ce2',
            },
            '& input': {
              backgroundColor: 'transparent !important',
              color: '#f5f5f7 !important',
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                WebkitTextFillColor: '#f5f5f7 !important',
                backgroundColor: 'transparent !important',
                transition: 'background-color 5000s ease-in-out 0s',
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                WebkitTextFillColor: '#f5f5f7 !important',
                backgroundColor: 'transparent !important',
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                WebkitTextFillColor: '#f5f5f7 !important',
                backgroundColor: 'transparent !important',
              },
              '&:-webkit-autofill:active': {
                WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                WebkitTextFillColor: '#f5f5f7 !important',
                backgroundColor: 'transparent !important',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#5b6ce2',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1c1f',
          color: '#f5f5f7',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#1c1c1f',
        },
      },
    },
  },
});
