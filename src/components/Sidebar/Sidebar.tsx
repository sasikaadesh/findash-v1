import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  ExpandLess,
  ExpandMore,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme';
import { getGlassSidebarStyles } from '../../theme/glassThemeUtils';
import { ROUTES } from '../../utils/constants';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <AssessmentIcon />,
    children: [
      {
        id: 'financial-reports',
        label: 'Financial Reports',
        path: ROUTES.REPORTS,
        icon: <TrendingUpIcon />,
      },
      {
        id: 'performance-reports',
        label: 'Performance',
        path: '/reports/performance',
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    children: [
      {
        id: 'overview-analytics',
        label: 'Overview',
        path: ROUTES.ANALYTICS,
        icon: <PieChartIcon />,
      },
      {
        id: 'detailed-analytics',
        label: 'Detailed Analysis',
        path: '/analytics/detailed',
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    id: 'profile',
    label: 'Profile Settings',
    path: ROUTES.PROFILE,
    icon: <PersonIcon />,
  },
];

const DRAWER_WIDTH = 280;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant = 'temporary' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, isGlassMode } = useTheme();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['reports', 'analytics']);

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      // Toggle expansion for items with children
      setExpandedItems(prev =>
        prev.includes(item.id)
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else if (item.path) {
      // Disable navigation for specific Reports submenu items
      const disabledItems = ['financial-reports', 'performance-reports'];
      if (disabledItems.includes(item.id)) {
        // Do nothing - navigation is disabled for these items
        return;
      }

      // Navigate to the path for all other items
      navigate(item.path);
      if (variant === 'temporary') {
        onClose();
      }
    }
  };

  const isItemActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.children) {
      return item.children.some(child => isItemActive(child.path));
    }
    return isItemActive(item.path);
  };

  const glassStyles = getGlassSidebarStyles({ isGlassMode, isDarkMode });

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isItemActive(item.path);
    const isParentItemActive = isParentActive(item);

    // Check if this item is disabled
    const disabledItems = ['financial-reports', 'performance-reports'];
    const isDisabled = disabledItems.includes(item.id);

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            disabled={isDisabled}
            sx={{
              pl: 2 + level * 2,
              py: 1.5,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isDisabled
                ? 'text.disabled'
                : isActive
                ? 'primary.contrastText'
                : 'inherit',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              '&:hover': {
                backgroundColor: isDisabled
                  ? 'transparent'
                  : isActive
                  ? 'primary.dark'
                  : isDarkMode
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isDisabled
                  ? 'text.disabled'
                  : isActive
                  ? 'primary.contrastText'
                  : isParentItemActive
                  ? 'primary.main'
                  : 'inherit',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: isActive || isParentItemActive ? 600 : 400,
              }}
            />
            {item.children && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>

        {item.children && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderNavigationItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #5b6ce2 0%, #8a9eff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.2rem',
          }}
        >
          F
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            FinDash
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Financial Dashboard
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        <Typography
          variant="overline"
          sx={{
            px: 3,
            pb: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          Main Menu
        </Typography>
        <List>
          {navigationItems.map(item => renderNavigationItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}` }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          © 2024 FinDash v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: variant === 'temporary' ? 0 : (open ? DRAWER_WIDTH : 0),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: variant === 'persistent' ? 'relative' : 'fixed',
          height: variant === 'persistent' ? 'calc(100vh - 64px)' : '100vh',
          top: variant === 'persistent' ? '64px' : 0,
          zIndex: variant === 'temporary' ? 1300 : 1200,
          transition: variant === 'persistent'
            ? 'transform 0.3s ease, width 0.3s ease'
            : 'none',
          transform: variant === 'persistent' && !open ? `translateX(-${DRAWER_WIDTH}px)` : 'translateX(0)',
          ...glassStyles,
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
