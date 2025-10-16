import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  BlurOn as BlurOnIcon,
  BlurOff as BlurOffIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';

interface ThemeSwitcherProps {
  variant?: 'card' | 'inline';
  showTitle?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'card', 
  showTitle = true 
}) => {
  const { isDarkMode, isGlassMode, toggleDarkMode, toggleGlassMode } = useTheme();

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  const content = (
    <Box>
      {showTitle && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PaletteIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Theme Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Dark Mode Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" disabled>
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Dark Mode
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Switch between light and dark themes
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            color="primary"
          />
        </Box>

        <Divider />

        {/* Glass Mode Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" disabled>
              {isGlassMode ? <BlurOnIcon /> : <BlurOffIcon />}
            </IconButton>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Glass Mode
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Enable glassmorphism effects
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={isGlassMode}
            onChange={toggleGlassMode}
            color="primary"
          />
        </Box>

        {/* Theme Preview */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Current Theme Preview:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%)'
                  : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                background: 'linear-gradient(135deg, #5b6ce2 0%, #8a9eff 100%)',
              }}
            />
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                background: isGlassMode
                  ? isDarkMode
                    ? 'rgba(30, 30, 30, 0.45)'
                    : 'rgba(255, 255, 255, 0.55)'
                  : isDarkMode
                    ? '#1c1c1f'
                    : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                backdropFilter: isGlassMode ? 'blur(20px)' : 'none',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (variant === 'inline') {
    return content;
  }

  return (
    <Card sx={{ ...glassStyles }}>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default ThemeSwitcher;
