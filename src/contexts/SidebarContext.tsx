import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

interface SidebarContextType {
  isOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  close: () => void;
  sidebarKey: number; // For forcing chart re-renders
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    // Provide a fallback instead of throwing an error to prevent crashes
    console.warn('useSidebar must be used within a SidebarProvider. Using fallback values.');
    return {
      isOpen: true,
      isMobile: false,
      toggle: () => {},
      close: () => {},
      sidebarKey: 0,
    };
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [sidebarKey, setSidebarKey] = useState(0);

  // Close mobile drawer when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const toggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
      // Increment key to force chart re-renders when desktop sidebar toggles
      setSidebarKey(prev => prev + 1);

      // Also trigger a window resize event after transition completes
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  };

  const close = () => {
    setMobileOpen(false);
  };

  const isOpen = isMobile ? mobileOpen : desktopOpen;

  const contextValue: SidebarContextType = {
    isOpen,
    isMobile,
    toggle,
    close,
    sidebarKey,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
