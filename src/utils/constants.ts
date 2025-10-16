// Application constants

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKENS: 'auth_tokens',
  USER_DATA: 'user_data',
  THEME_MODE: 'isDarkMode',
  GLASS_MODE: 'isGlassMode',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
} as const;

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'Dashboard',
  },
  {
    id: 'reports',
    label: 'Reports',
    path: ROUTES.REPORTS,
    icon: 'Assessment',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: 'Analytics',
  },
  {
    id: 'profile',
    label: 'Profile Settings',
    path: ROUTES.PROFILE,
    icon: 'Person',
  },
] as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#5b6ce2',
  SECONDARY: '#ffb347',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3',
  GRADIENT: ['#5b6ce2', '#8a9eff', '#ffb347', '#4caf50'],
} as const;

// KPI Card Types
export const KPI_TYPES = {
  TOTAL_EARNINGS: 'total_earnings',
  POPULAR_STOCK: 'popular_stock',
  ACTIVE_USERS: 'active_users',
  CONVERSION_RATE: 'conversion_rate',
} as const;

// Data Grid Configuration
export const DATA_GRID_CONFIG = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  DENSITY: 'standard' as const,
} as const;

// Export Formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  EXCEL: 'xlsx',
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching MUI breakpoints)
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
} as const;

// Z-Index Values
export const Z_INDEX = {
  DRAWER: 1200,
  APP_BAR: 1100,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const;
