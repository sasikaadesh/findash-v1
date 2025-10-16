import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import KPIBox from '../../components/KPIBox/KPIBox';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import DataTable from '../../components/DataTable/DataTable';
import type { KPIData } from '../../components/KPIBox/KPIBox';
import type { LineChartData } from '../../components/Charts/LineChart';
import type { BarChartData } from '../../components/Charts/BarChart';
import type { DataTableColumn } from '../../components/DataTable/DataTable';
import ExportButtons from '../../components/ExportButtons/ExportButtons';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { usePageTitle, PAGE_TITLES } from '../../utils/pageTitle';

// Mock data for the dashboard
const mockKPIData: KPIData[] = [
  {
    id: 'total-earnings',
    title: 'Total Earnings',
    value: 49229,
    previousValue: 45000,
    format: 'currency',
    icon: <AttachMoneyIcon />,
    color: 'primary',
    subtitle: 'This month',
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: 2847,
    previousValue: 2650,
    format: 'number',
    icon: <PeopleIcon />,
    color: 'success',
    subtitle: 'Last 30 days',
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 63.89,
    previousValue: 58.2,
    format: 'percentage',
    icon: <TrendingUpIcon />,
    color: 'warning',
    subtitle: 'This quarter',
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    value: 12.5,
    previousValue: 8.3,
    format: 'percentage',
    icon: <ShowChartIcon />,
    color: 'info',
    subtitle: 'Year over year',
  },
];

const mockLineChartData: LineChartData[] = [
  {
    id: 'revenue',
    color: '#5b6ce2',
    data: [
      { x: 'Jan', y: 65 },
      { x: 'Feb', y: 59 },
      { x: 'Mar', y: 80 },
      { x: 'Apr', y: 81 },
      { x: 'May', y: 56 },
      { x: 'Jun', y: 55 },
      { x: 'Jul', y: 40 },
    ],
  },
  {
    id: 'profit',
    color: '#ffb347',
    data: [
      { x: 'Jan', y: 28 },
      { x: 'Feb', y: 48 },
      { x: 'Mar', y: 40 },
      { x: 'Apr', y: 19 },
      { x: 'May', y: 86 },
      { x: 'Jun', y: 27 },
      { x: 'Jul', y: 90 },
    ],
  },
];

const mockBarChartData: BarChartData[] = [
  { month: 'Jan', revenue: 180, expenses: 120, profit: 60 },
  { month: 'Feb', revenue: 200, expenses: 140, profit: 60 },
  { month: 'Mar', revenue: 220, expenses: 130, profit: 90 },
  { month: 'Apr', revenue: 190, expenses: 110, profit: 80 },
  { month: 'May', revenue: 250, expenses: 150, profit: 100 },
  { month: 'Jun', revenue: 280, expenses: 160, profit: 120 },
];

const mockTableData = [
  {
    id: 1,
    employee: 'Judy Abbott',
    role: 'Interactions Manager',
    performance: 85,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    employee: 'Martin Feeney',
    role: 'Accountability Specialist',
    performance: 92,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    employee: 'Ellen Streich',
    role: 'Mobility Supervisor',
    performance: 78,
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    employee: 'Ella Lutzowitz',
    role: 'Product Security Engineer',
    performance: 88,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

const tableColumns: DataTableColumn[] = [
  {
    field: 'employee',
    headerName: 'Employee',
    width: 200,
    type: 'avatar',
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 250,
  },
  {
    field: 'performance',
    headerName: 'Performance',
    width: 120,
    type: 'percentage',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    type: 'chip',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    type: 'actions',
  },
];

const Dashboard: React.FC = () => {
  const { isDarkMode, isGlassMode } = useTheme();
  const [loading, setLoading] = useState(true);

  // Set page title
  usePageTitle(PAGE_TITLES.DASHBOARD);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  const handleKPIClick = (kpiId: string) => {
    console.log('KPI clicked:', kpiId);
  };

  const handleTableRowClick = (params: any) => {
    console.log('Table row clicked:', params.row);
  };

  const handleEdit = (id: string | number) => {
    console.log('Edit:', id);
  };

  const handleDelete = (id: string | number) => {
    console.log('Delete:', id);
  };

  const handleView = (id: string | number) => {
    console.log('View:', id);
  };

  return (
    <Box
      id="dashboard-content"
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: 0, sm: 0 } // Remove extra padding on mobile
      }}
    >
      {/* Header with Export Button */}
      <Box sx={{
        mb: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'flex-start' },
        gap: { xs: 2, sm: 0 }
      }}>
        {/* Title Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } // Responsive font size
            }}
          >
            Insights Overview
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' } // Responsive font size
            }}
          >
            Key financial and performance metrics
          </Typography>
        </Box>

        {/* Export Button Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mt: { xs: 0, sm: 0 }
        }}>
          <ExportButtons
            data={mockTableData}
            elementId="dashboard-content"
            chartElementId="revenue-chart"
            filename="financial-dashboard"
            variant="dropdown"
          />
        </Box>
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
        {mockKPIData.map((kpi) => (
          <KPIBox
            key={kpi.id}
            data={kpi}
            loading={loading}
            onClick={() => handleKPIClick(kpi.id)}
          />
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
        <Box>
          <LineChart
            data={mockLineChartData}
            title="Average KPI Score"
            height={350}
            loading={loading}
            enableArea={true}
          />
        </Box>
        <Box>
          <Paper
            sx={{
              ...glassStyles,
              p: 3,
              height: 350 + 100,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Top Performance
            </Typography>
            {loading ? (
              <Box sx={{ flex: 1 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ flex: 1 }}>
                {mockTableData.slice(0, 4).map((employee, index) => (
                  <Box
                    key={employee.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${['#5b6ce2', '#ffb347', '#4caf50', '#ff9800'][index]} 0%, ${['#8a9eff', '#ffc478', '#66bb6a', '#ffb74d'][index]} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {employee.employee.charAt(0)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {employee.employee}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {employee.performance}% completed
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Second Charts Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1fr 1fr'
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          mb: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <Box>
          <BarChart
            data={mockBarChartData}
            keys={['revenue', 'expenses', 'profit']}
            indexBy="month"
            title="Monthly Financial Overview"
            height={300}
            loading={loading}
          />
        </Box>
        <Box>
          <BarChart
            data={mockBarChartData}
            keys={['profit']}
            indexBy="month"
            title="Profit Trend"
            height={300}
            loading={loading}
            showLegend={false}
          />
        </Box>
      </Box>

      {/* Data Table */}
      <DataTable
        data={mockTableData}
        columns={tableColumns}
        title="Employee Performance"
        loading={loading}
        height={400}
        onRowClick={handleTableRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </Box>
  );
};

export default Dashboard;
