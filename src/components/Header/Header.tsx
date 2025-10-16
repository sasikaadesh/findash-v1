import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  BlurOn as BlurOnIcon,
  BlurOff as BlurOffIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme';
import { getGlassHeaderStyles } from '../../theme/glassThemeUtils';
import { getCurrentUser, logout } from '../../utils/auth';
import { ROUTES } from '../../utils/constants';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Financial Dashboard' }) => {
  const navigate = useNavigate();
  const { isDarkMode, isGlassMode, toggleDarkMode, toggleGlassMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const user = getCurrentUser();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality here
    console.log('Search:', searchValue);
    setMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileSearchOpen) {
      setSearchValue('');
    }
  };

  const glassStyles = getGlassHeaderStyles({ isGlassMode, isDarkMode });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...glassStyles,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Desktop Search */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: 3,
              px: 2,
              py: 0.5,
              minWidth: 250,
              maxWidth: 300,
              mr: 2,
              backdropFilter: 'blur(10px)',
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              sx={{
                flex: 1,
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: '4px 0',
                  fontSize: '0.875rem',
                },
              }}
            />
          </Box>

          {/* Mobile Search Button */}
          <Tooltip title="Search">
            <IconButton
              color="inherit"
              onClick={toggleMobileSearch}
              sx={{ display: { xs: 'flex', md: 'none' } }}
              size="small"
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          {/* Theme Controls - Hide glass mode on mobile */}
          <Tooltip title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
            <IconButton color="inherit" onClick={toggleDarkMode} size="small">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tooltip title={`${isGlassMode ? 'Disable' : 'Enable'} Glass Mode`}>
              <IconButton color="inherit" onClick={toggleGlassMode} size="small">
                {isGlassMode ? <BlurOffIcon /> : <BlurOnIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton color="inherit" size="small">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Tooltip title="Account">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ p: 0, ml: 1 }}
            >
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 200,
              ...glassStyles,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile Settings</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Mobile Search Modal */}
        <Dialog
          open={mobileSearchOpen}
          onClose={toggleMobileSearch}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              ...getGlassHeaderStyles({ isGlassMode, isDarkMode }),
              m: 2,
              maxHeight: '80vh',
            },
          }}
        >
          <DialogTitle sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1
          }}>
            <Typography variant="h6" fontWeight={600}>
              Search
            </Typography>
            <IconButton onClick={toggleMobileSearch} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 1 }}>
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 3,
                px: 2,
                py: 1.5,
                backdropFilter: 'blur(10px)',
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                autoFocus
                sx={{
                  flex: 1,
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: '4px 0',
                    fontSize: '1rem',
                  },
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
