import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import LineChart, { LineChartData } from '../../components/Charts/LineChart';
import BarChart, { BarChartData } from '../../components/Charts/BarChart';
import KPIBox, { KPIData } from '../../components/KPIBox/KPIBox';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { usePageTitle, PAGE_TITLES } from '../../utils/pageTitle';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/helpers';

// Mock analytics data
const mockAnalyticsKPIs: KPIData[] = [
  {
    id: 'page-views',
    title: 'Page Views',
    value: 125847,
    previousValue: 118230,
    format: 'number',
    icon: <VisibilityIcon />,
    color: 'primary',
    subtitle: 'Last 30 days',
  },
  {
    id: 'unique-visitors',
    title: 'Unique Visitors',
    value: 8942,
    previousValue: 8156,
    format: 'number',
    icon: <PeopleIcon />,
    color: 'success',
    subtitle: 'Last 30 days',
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 3.24,
    previousValue: 2.89,
    format: 'percentage',
    icon: <ShoppingCartIcon />,
    color: 'warning',
    subtitle: 'This month',
  },
  {
    id: 'avg-order-value',
    title: 'Avg Order Value',
    value: 156.78,
    previousValue: 142.33,
    format: 'currency',
    icon: <AttachMoneyIcon />,
    color: 'info',
    subtitle: 'This month',
  },
];

const mockTrafficData: LineChartData[] = [
  {
    id: 'organic',
    color: '#5b6ce2',
    data: [
      { x: 'Mon', y: 2400 },
      { x: 'Tue', y: 1398 },
      { x: 'Wed', y: 9800 },
      { x: 'Thu', y: 3908 },
      { x: 'Fri', y: 4800 },
      { x: 'Sat', y: 3800 },
      { x: 'Sun', y: 4300 },
    ],
  },
  {
    id: 'paid',
    color: '#ffb347',
    data: [
      { x: 'Mon', y: 2400 },
      { x: 'Tue', y: 2210 },
      { x: 'Wed', y: 2290 },
      { x: 'Thu', y: 2000 },
      { x: 'Fri', y: 2181 },
      { x: 'Sat', y: 2500 },
      { x: 'Sun', y: 2100 },
    ],
  },
  {
    id: 'social',
    color: '#4caf50',
    data: [
      { x: 'Mon', y: 1200 },
      { x: 'Tue', y: 1100 },
      { x: 'Wed', y: 1400 },
      { x: 'Thu', y: 1300 },
      { x: 'Fri', y: 1500 },
      { x: 'Sat', y: 1800 },
      { x: 'Sun', y: 1600 },
    ],
  },
];

const mockDeviceData: BarChartData[] = [
  { device: 'Desktop', users: 45, sessions: 52 },
  { device: 'Mobile', users: 38, sessions: 35 },
  { device: 'Tablet', users: 17, sessions: 13 },
];

const mockTopPages = [
  { page: '/dashboard', views: 15420, change: 12.5 },
  { page: '/products', views: 8930, change: -3.2 },
  { page: '/analytics', views: 6780, change: 8.7 },
  { page: '/reports', views: 4560, change: 15.3 },
  { page: '/settings', views: 2340, change: -1.8 },
];

const AnalyticsPage: React.FC = () => {
  const { isDarkMode, isGlassMode } = useTheme();
  const [timeRange, setTimeRange] = useState('7d');

  // Set page title
  usePageTitle(PAGE_TITLES.ANALYTICS);

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: 0, sm: 0 }
      }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          Analytics Overview
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Detailed insights into your website performance and user behavior
        </Typography>
      </Box>

      {/* Time Range Selector */}
      <Box sx={{ mb: 4, display: 'flex', gap: 1 }}>
        {timeRanges.map((range) => (
          <Button
            key={range.value}
            variant={timeRange === range.value ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setTimeRange(range.value)}
          >
            {range.label}
          </Button>
        ))}
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          mb: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: '100%'
        }}
      >
        {mockAnalyticsKPIs.map((kpi) => (
          <KPIBox key={kpi.id} data={kpi} />
        ))}
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr'
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          mb: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <LineChart
            data={mockTrafficData}
            title="Traffic Sources"
            height={350}
            enableArea={false}
          />
        </Box>
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <BarChart
            data={mockDeviceData}
            keys={['users', 'sessions']}
            indexBy="device"
            title="Device Analytics"
            height={350}
          />
        </Box>
      </Box>

      {/* Analytics Details */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: '100%',
          maxWidth: '100%'
        }}
      >
        {/* Top Pages */}
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <Card sx={{ ...glassStyles }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Pages
              </Typography>
              <List>
                {mockTopPages.map((page, index) => (
                  <React.Fragment key={page.page}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'primary.main',
                            fontSize: '0.875rem',
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={page.page}
                        secondary={`${formatNumber(page.views)} views`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {page.change > 0 ? (
                          <TrendingUpIcon color="success" fontSize="small" />
                        ) : (
                          <TrendingDownIcon color="error" fontSize="small" />
                        )}
                        <Typography
                          variant="body2"
                          color={page.change > 0 ? 'success.main' : 'error.main'}
                          fontWeight={500}
                        >
                          {page.change > 0 ? '+' : ''}{formatPercentage(page.change)}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < mockTopPages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Performance Metrics */}
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <Card sx={{ ...glassStyles }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Performance Metrics
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Page Load Speed</Typography>
                  <Typography variant="body2" fontWeight={500}>2.3s</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="success"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Bounce Rate</Typography>
                  <Typography variant="body2" fontWeight={500}>32.5%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={32.5}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="warning"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Session Duration</Typography>
                  <Typography variant="body2" fontWeight={500}>4m 32s</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="primary"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">User Engagement</Typography>
                  <Typography variant="body2" fontWeight={500}>68.2%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={68.2}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="info"
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Mobile Optimization</Typography>
                  <Typography variant="body2" fontWeight={500}>92%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={92}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="success"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
