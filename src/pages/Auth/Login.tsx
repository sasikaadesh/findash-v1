import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { login } from '../../utils/auth';
import { ROUTES } from '../../utils/constants';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import Logo from '../../components/Logo/Logo';
import { usePageTitle, PAGE_TITLES } from '../../utils/pageTitle';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, isGlassMode } = useTheme();

  // Set page title
  usePageTitle(PAGE_TITLES.LOGIN);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 50%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #f5f7fa 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(91, 108, 226, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          zIndex: 1,
          ...glassStyles,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Logo size="large" variant="auth" />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to={ROUTES.FORGOT_PASSWORD}
                variant="body2"
                sx={{ display: 'block', mb: 2 }}
              >
                Forgot your password?
              </Link>
              
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link component={RouterLink} to={ROUTES.SIGNUP} fontWeight={500}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Demo credentials info */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 1,
              backgroundColor: isDarkMode ? 'rgba(91, 108, 226, 0.1)' : 'rgba(91, 108, 226, 0.05)',
              border: `1px solid ${isDarkMode ? 'rgba(91, 108, 226, 0.2)' : 'rgba(91, 108, 226, 0.1)'}`,
            }}
          >
            <Typography variant="caption" display="block" gutterBottom fontWeight={500}>
              Demo Credentials:
            </Typography>
            <Typography variant="caption" display="block">
              Email: demo@example.com
            </Typography>
            <Typography variant="caption" display="block">
              Password: password
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
