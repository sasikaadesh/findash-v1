// Authentication utilities for JWT token management

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const TOKEN_KEY = 'auth_tokens';
const USER_KEY = 'user_data';

// Mock user data for demo purposes
const MOCK_USER: User = {
  id: '1',
  email: 'carla.sanford@example.com',
  name: 'Carla Sanford',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
};

// Token management
export const setAuthTokens = (tokens: AuthTokens): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

export const getAuthTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

export const removeAuthTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// User data management
export const setUserData = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const tokens = getAuthTokens();
  if (!tokens) return false;
  
  // Check if token is expired
  return Date.now() < tokens.expiresAt;
};

// Mock login function
export const login = async (email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in real app, this would be an API call
  if (email === 'demo@example.com' && password === 'password') {
    const tokens: AuthTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };
    
    setAuthTokens(tokens);
    setUserData(MOCK_USER);
    
    return { user: MOCK_USER, tokens };
  }
  
  throw new Error('Invalid credentials');
};

// Mock signup function
export const signup = async (name: string, email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user: User = {
    id: Date.now().toString(),
    email,
    name,
  };
  
  const tokens: AuthTokens = {
    accessToken: 'mock_access_token_' + Date.now(),
    refreshToken: 'mock_refresh_token_' + Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  };
  
  setAuthTokens(tokens);
  setUserData(user);
  
  return { user, tokens };
};

// Mock forgot password function
export const forgotPassword = async (email: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In real app, this would send a reset email
  console.log(`Password reset email sent to ${email}`);
};

// Logout function
export const logout = (): void => {
  removeAuthTokens();
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (!isAuthenticated()) return null;
  return getUserData();
};

// Mock token refresh
export const refreshToken = async (): Promise<AuthTokens> => {
  const currentTokens = getAuthTokens();
  if (!currentTokens) {
    throw new Error('No refresh token available');
  }
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTokens: AuthTokens = {
    accessToken: 'mock_access_token_' + Date.now(),
    refreshToken: currentTokens.refreshToken,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  };
  
  setAuthTokens(newTokens);
  return newTokens;
};
