import type { Theme } from '@mui/material/styles';

export interface GlassThemeOptions {
  isGlassMode: boolean;
  isDarkMode: boolean;
}

export const getGlassStyles = (options: GlassThemeOptions) => {
  const { isGlassMode, isDarkMode } = options;

  if (!isGlassMode) {
    return {};
  }

  const baseGlassStyles = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    transition: 'all 0.3s ease',
  };

  if (isDarkMode) {
    return {
      ...baseGlassStyles,
      background: 'linear-gradient(135deg, rgba(45, 45, 55, 0.6) 0%, rgba(25, 25, 35, 0.7) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    };
  }

  return {
    ...baseGlassStyles,
    background: 'rgba(255, 255, 255, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  };
};

export const getGlassCardStyles = (options: GlassThemeOptions) => {
  const { isGlassMode, isDarkMode } = options;

  if (!isGlassMode) {
    return isDarkMode
      ? {
          backgroundColor: '#1c1c1f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }
      : {
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        };
  }

  return getGlassStyles(options);
};

export const getGlassSidebarStyles = (options: GlassThemeOptions) => {
  const { isGlassMode, isDarkMode } = options;

  if (!isGlassMode) {
    return isDarkMode
      ? {
          backgroundColor: '#1c1c1f',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }
      : {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        };
  }

  const glassStyles = getGlassStyles(options);
  return {
    ...glassStyles,
    borderRight: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.4)',
  };
};

export const getGlassHeaderStyles = (options: GlassThemeOptions) => {
  const { isGlassMode, isDarkMode } = options;

  if (!isGlassMode) {
    return isDarkMode
      ? {
          backgroundColor: '#1c1c1f',
          color: '#f5f5f7',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }
      : {
          backgroundColor: '#ffffff',
          color: '#1e1e2f',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        };
  }

  const glassStyles = getGlassStyles(options);
  return {
    ...glassStyles,
    color: isDarkMode ? '#f5f5f7' : '#1e1e2f',
  };
};

export const getGlassBackgroundStyles = (options: GlassThemeOptions) => {
  const { isDarkMode } = options;

  return {
    background: isDarkMode
      ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #f5f7fa 100%)',
    minHeight: '100vh',
    position: 'relative' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isDarkMode
        ? 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.12) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(139, 69, 219, 0.1) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none' as const,
    },
  };
};

export const createGlassTheme = (baseTheme: Theme, options: GlassThemeOptions): Theme => {
  const { isGlassMode } = options;

  if (!isGlassMode) {
    return baseTheme;
  }

  return {
    ...baseTheme,
    components: {
      ...baseTheme.components,
      MuiCard: {
        ...baseTheme.components?.MuiCard,
        styleOverrides: {
          ...baseTheme.components?.MuiCard?.styleOverrides,
          root: {
            ...baseTheme.components?.MuiCard?.styleOverrides?.root,
            ...getGlassCardStyles(options),
          },
        },
      },
      MuiPaper: {
        ...baseTheme.components?.MuiPaper,
        styleOverrides: {
          ...baseTheme.components?.MuiPaper?.styleOverrides,
          root: {
            ...baseTheme.components?.MuiPaper?.styleOverrides?.root,
            ...getGlassCardStyles(options),
          },
        },
      },
      MuiAppBar: {
        ...baseTheme.components?.MuiAppBar,
        styleOverrides: {
          ...baseTheme.components?.MuiAppBar?.styleOverrides,
          root: {
            ...baseTheme.components?.MuiAppBar?.styleOverrides?.root,
            ...getGlassHeaderStyles(options),
          },
        },
      },
      MuiDrawer: {
        ...baseTheme.components?.MuiDrawer,
        styleOverrides: {
          ...baseTheme.components?.MuiDrawer?.styleOverrides,
          paper: {
            ...baseTheme.components?.MuiDrawer?.styleOverrides?.paper,
            ...getGlassSidebarStyles(options),
          },
        },
      },
    },
  };
};
