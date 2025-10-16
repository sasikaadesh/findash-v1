import { useEffect } from 'react';

// Application title constant
export const APP_TITLE = 'Financial Dashboard';

// Page title mapping
export const PAGE_TITLES = {
  DASHBOARD: 'Insights Overview',
  REPORTS: 'Financial Reports',
  ANALYTICS: 'Analytics Overview',
  PROFILE: 'Profile Settings',
  LOGIN: 'Sign In',
  SIGNUP: 'Sign Up',
  FORGOT_PASSWORD: 'Reset Password',
} as const;

// Utility function to set document title
export const setDocumentTitle = (pageTitle?: string) => {
  if (pageTitle) {
    document.title = `${APP_TITLE} - ${pageTitle}`;
  } else {
    document.title = APP_TITLE;
  }
};

// Custom hook to set page title
export const usePageTitle = (pageTitle: string) => {
  useEffect(() => {
    setDocumentTitle(pageTitle);
    
    // Cleanup: reset to default title when component unmounts
    return () => {
      document.title = APP_TITLE;
    };
  }, [pageTitle]);
};

// Helper function to get full page title for display
export const getPageTitle = (pageKey: keyof typeof PAGE_TITLES): string => {
  return PAGE_TITLES[pageKey];
};

// Helper function to get full document title
export const getDocumentTitle = (pageKey: keyof typeof PAGE_TITLES): string => {
  return `${APP_TITLE} - ${PAGE_TITLES[pageKey]}`;
};
