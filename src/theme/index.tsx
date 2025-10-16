import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { createGlassTheme } from './glassThemeUtils';
import type { GlassThemeOptions } from './glassThemeUtils';

export interface ThemeContextType {
  isDarkMode: boolean;
  isGlassMode: boolean;
  toggleDarkMode: () => void;
  toggleGlassMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme states from localStorage or defaults
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [isGlassMode, setIsGlassMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('isGlassMode');
    return saved ? JSON.parse(saved) : true; // Default to glass mode
  });

  // Persist theme preferences to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('isGlassMode', JSON.stringify(isGlassMode));
  }, [isGlassMode]);

  // Apply dark mode class to body for scrollbar styling
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleGlassMode = () => {
    setIsGlassMode(prev => !prev);
  };

  // Create the appropriate theme based on current settings
  const baseTheme = isDarkMode ? darkTheme : lightTheme;
  const glassOptions: GlassThemeOptions = { isGlassMode, isDarkMode };
  const currentTheme = createGlassTheme(baseTheme, glassOptions);

  const contextValue: ThemeContextType = {
    isDarkMode,
    isGlassMode,
    toggleDarkMode,
    toggleGlassMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export themes for direct use if needed
export { lightTheme, darkTheme };
export * from './glassThemeUtils';
