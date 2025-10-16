import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  // Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // DatePicker,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import LineChart, { LineChartData } from '../../components/Charts/LineChart';
import BarChart, { BarChartData } from '../../components/Charts/BarChart';
import DataTable, { DataTableColumn } from '../../components/DataTable/DataTable';
import ExportButtons from '../../components/ExportButtons/ExportButtons';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { formatCurrency } from '../../utils/helpers';
import { usePageTitle, PAGE_TITLES } from '../../utils/pageTitle';

// Mock data for reports
const mockRevenueData: LineChartData[] = [
  {
    id: 'Q1',
    color: '#5b6ce2',
    data: [
      { x: 'Jan', y: 125000 },
      { x: 'Feb', y: 132000 },
      { x: 'Mar', y: 148000 },
    ],
  },
  {
    id: 'Q2',
    color: '#ffb347',
    data: [
      { x: 'Apr', y: 155000 },
      { x: 'May', y: 162000 },
      { x: 'Jun', y: 178000 },
    ],
  },
];

const mockExpenseData: BarChartData[] = [
  { category: 'Marketing', amount: 45000, budget: 50000 },
  { category: 'Operations', amount: 78000, budget: 80000 },
  { category: 'Technology', amount: 32000, budget: 35000 },
  { category: 'HR', amount: 28000, budget: 30000 },
  { category: 'Legal', amount: 15000, budget: 20000 },
];

const mockTransactionData = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Software License Renewal',
    category: 'Technology',
    amount: -2500,
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-01-14',
    description: 'Client Payment - ABC Corp',
    category: 'Revenue',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 3,
    date: '2024-01-13',
    description: 'Marketing Campaign',
    category: 'Marketing',
    amount: -8500,
    status: 'Pending',
  },
  {
    id: 4,
    date: '2024-01-12',
    description: 'Office Rent',
    category: 'Operations',
    amount: -5000,
    status: 'Completed',
  },
];

const transactionColumns: DataTableColumn[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    type: 'date',
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 130,
    type: 'chip',
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 130,
    type: 'currency',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    type: 'chip',
  },
];

const ReportsPage: React.FC = () => {
  const { isDarkMode, isGlassMode } = useTheme();
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('month');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Set page title
  usePageTitle(PAGE_TITLES.REPORTS);

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  const reportTypes = [
    { value: 'financial', label: 'Financial Reports' },
    { value: 'performance', label: 'Performance Reports' },
    { value: 'operational', label: 'Operational Reports' },
  ];

  const dateRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Financial Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive financial analysis and reporting dashboard
          </Typography>
        </Box>

        {/* Filters */}
        <Card sx={{ ...glassStyles, mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    {reportTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    {dateRanges.map((range) => (
                      <MenuItem key={range.value} value={range.value}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {dateRange === 'custom' && (
                <>
                  <Grid item xs={12} sm={6} md={2}>
                    <MuiDatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <MuiDatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} md={2}>
                <ExportButtons
                  data={mockTransactionData}
                  filename="financial-report"
                  variant="dropdown"
                  size="large"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ ...glassStyles }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'success.contrastText',
                    }}
                  >
                    <TrendingUpIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {formatCurrency(495000)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue
                    </Typography>
                  </Box>
                </Box>
                <Chip label="+12.5%" color="success" size="small" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ ...glassStyles }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'error.contrastText',
                    }}
                  >
                    <AssessmentIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {formatCurrency(198000)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Expenses
                    </Typography>
                  </Box>
                </Box>
                <Chip label="+3.2%" color="error" size="small" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ ...glassStyles }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.contrastText',
                    }}
                  >
                    <CalendarIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {formatCurrency(297000)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Net Profit
                    </Typography>
                  </Box>
                </Box>
                <Chip label="+18.7%" color="primary" size="small" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ ...glassStyles }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'warning.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'warning.contrastText',
                    }}
                  >
                    <DownloadIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      60.1%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Profit Margin
                    </Typography>
                  </Box>
                </Box>
                <Chip label="+5.3%" color="warning" size="small" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={8}>
            <LineChart
              data={mockRevenueData}
              title="Revenue Trend"
              height={350}
              enableArea={true}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <BarChart
              data={mockExpenseData}
              keys={['amount', 'budget']}
              indexBy="category"
              title="Expense vs Budget"
              height={350}
              layout="horizontal"
            />
          </Grid>
        </Grid>

        {/* Transactions Table */}
        <DataTable
          data={mockTransactionData}
          columns={transactionColumns}
          title="Recent Transactions"
          height={400}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ReportsPage;
