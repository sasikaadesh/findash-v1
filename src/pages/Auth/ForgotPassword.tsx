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
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { forgotPassword } from '../../utils/auth';
import { ROUTES } from '../../utils/constants';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { isValidEmail } from '../../utils/helpers';
import Logo from '../../components/Logo/Logo';
import { usePageTitle, PAGE_TITLES } from '../../utils/pageTitle';

const ForgotPassword: React.FC = () => {
  const { isDarkMode, isGlassMode } = useTheme();

  // Set page title
  usePageTitle(PAGE_TITLES.FORGOT_PASSWORD);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
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
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your email address and we'll send you a link to reset your password
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset email sent! Check your inbox for further instructions.
            </Alert>
          )}

          {!success ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email Address"
                value={email}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mb: 3, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                sx={{ py: 1.5 }}
              >
                Send Another Email
              </Button>
            </Box>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to={ROUTES.LOGIN}
              variant="body2"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontWeight: 500,
              }}
            >
              <ArrowBackIcon fontSize="small" />
              Back to Sign In
            </Link>
          </Box>

          {/* Demo info */}
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
              Demo Mode:
            </Typography>
            <Typography variant="caption" display="block">
              This is a demo application. No actual email will be sent.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
