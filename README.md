# FinDash - Financial Dashboard Template

A modern, responsive financial dashboard built with React, TypeScript, and Material-UI featuring glassmorphism design and comprehensive theming system.

## ✨ Features

### 🎨 Design & UI
- **Glassmorphism Design**: Modern glass-like UI effects with backdrop blur
- **Dual Theme System**: Light and Dark mode with seamless switching
- **Responsive Layout**: Mobile-first design that works on all devices
- **Material-UI Integration**: Consistent design system with custom theming

### 📊 Dashboard Components
- **KPI Cards**: Interactive metric cards with trend indicators
- **Advanced Charts**: Line charts, bar charts using Nivo library
- **Data Tables**: Feature-rich tables with sorting, filtering, and pagination
- **Export Functionality**: PDF, CSV, and image export capabilities

### 🔐 Authentication
- **JWT-based Auth**: Secure authentication system
- **Protected Routes**: Route guards for authenticated users
- **Demo Credentials**: Ready-to-use demo login

### 🛠 Technical Features
- **TypeScript**: Full type safety and better developer experience
- **React Router v6**: Modern routing with nested routes
- **SCSS Support**: Advanced styling with variables and mixins
- **Error Boundaries**: Graceful error handling
- **Loading States**: Smooth loading experiences

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-dashboard-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Login
- **Email**: `demo@example.com`
- **Password**: `password`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Charts/         # Chart components (Line, Bar)
│   ├── DataTable/      # Data grid component
│   ├── ExportButtons/  # Export functionality
│   ├── Header/         # App header with navigation
│   ├── KPIBox/         # KPI metric cards
│   ├── Sidebar/        # Navigation sidebar
│   └── ThemeSwitcher/  # Theme toggle component
├── layouts/            # Layout components
│   ├── AuthLayout.tsx  # Authentication pages layout
│   └── MainLayout.tsx  # Main app layout
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Dashboard/      # Dashboard page
│   ├── Reports/        # Reports page
│   ├── Analytics/      # Analytics page
│   └── Profile/        # Profile settings
├── routes/             # Routing configuration
├── theme/              # Theme system
│   ├── lightTheme.ts   # Light theme configuration
│   ├── darkTheme.ts    # Dark theme configuration
│   └── glassThemeUtils.ts # Glassmorphism utilities
├── utils/              # Utility functions
│   ├── auth.ts         # Authentication utilities
│   ├── constants.ts    # App constants
│   ├── helpers.ts      # Helper functions
│   └── pdfExport.ts    # Export utilities
└── App.tsx             # Main app component
```

## 🎨 Theme System

### Toggle Themes & Glass Mode

The dashboard supports both Light/Dark themes and an optional Glassmorphism mode:

```typescript
import { useTheme } from './theme';

const MyComponent = () => {
  const { isDarkMode, isGlassMode, toggleDarkMode, toggleGlassMode } = useTheme();
  
  return (
    <div>
      <button onClick={toggleDarkMode}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <button onClick={toggleGlassMode}>
        {isGlassMode ? 'Disable' : 'Enable'} Glass Mode
      </button>
    </div>
  );
};
```

### Customizing Themes

#### 1. SCSS Variables
Edit `src/theme/_variables.scss` to customize colors and effects:

```scss
// Primary colors
$primary-color: #5b6ce2;
$secondary-color: #ffb347;

// Glass effects
$glass-blur: 20px;
$glass-opacity-light: 0.55;
$glass-opacity-dark: 0.45;
```

#### 2. MUI Theme Configuration
Modify `src/theme/lightTheme.ts` and `src/theme/darkTheme.ts`:

```typescript
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5b6ce2',
      // ... other colors
    },
  },
  // ... other theme options
});
```

#### 3. Glass Effects
Use the glass utility functions in your components:

```typescript
import { getGlassCardStyles } from '../theme/glassThemeUtils';

const MyCard = () => {
  const { isDarkMode, isGlassMode } = useTheme();
  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });
  
  return <Card sx={{ ...glassStyles }}>Content</Card>;
};
```

## 🔧 Adding New Pages/Components

### 1. Create a New Page

```typescript
// src/pages/NewPage/NewPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const NewPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        New Page
      </Typography>
      {/* Your content here */}
    </Box>
  );
};

export default NewPage;
```

### 2. Add Route

Update `src/routes/AppRoutes.tsx`:

```typescript
import NewPage from '../pages/NewPage/NewPage';

// Add to the protected routes section
<Route path="/new-page" element={<NewPage />} />
```

### 3. Add Navigation Item

Update `src/utils/constants.ts`:

```typescript
export const ROUTES = {
  // ... existing routes
  NEW_PAGE: '/new-page',
};

// Add to navigation items in Sidebar component
const navigationItems = [
  // ... existing items
  {
    id: 'new-page',
    label: 'New Page',
    path: ROUTES.NEW_PAGE,
    icon: <YourIcon />,
  },
];
```

## 📊 Working with Charts

### Line Chart Example

```typescript
import LineChart, { LineChartData } from '../components/Charts/LineChart';

const data: LineChartData[] = [
  {
    id: 'series1',
    color: '#5b6ce2',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 120 },
      // ... more data points
    ],
  },
];

<LineChart
  data={data}
  title="My Chart"
  height={300}
  enableArea={true}
/>
```

### Bar Chart Example

```typescript
import BarChart, { BarChartData } from '../components/Charts/BarChart';

const data: BarChartData[] = [
  { category: 'A', value1: 100, value2: 120 },
  { category: 'B', value1: 80, value2: 90 },
];

<BarChart
  data={data}
  keys={['value1', 'value2']}
  indexBy="category"
  title="My Bar Chart"
  height={300}
/>
```

## 📋 Data Tables

```typescript
import DataTable, { DataTableColumn } from '../components/DataTable/DataTable';

const columns: DataTableColumn[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 120, type: 'currency' },
  { field: 'status', headerName: 'Status', width: 100, type: 'chip' },
];

const data = [
  { id: 1, name: 'John Doe', amount: 1000, status: 'Active' },
  // ... more data
];

<DataTable
  data={data}
  columns={columns}
  title="My Table"
  height={400}
/>
```

## 🔒 Authentication

### Protecting Routes

Routes are automatically protected using the `ProtectedRoute` component. To add authentication checks:

```typescript
import { isAuthenticated, getCurrentUser } from '../utils/auth';

const MyComponent = () => {
  const user = getCurrentUser();
  const isLoggedIn = isAuthenticated();
  
  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.name}!</div>;
};
```

## 🛠 Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Material-UI v6+** - Component library
- **Nivo** - Data visualization
- **React Router v6** - Routing
- **SCSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **jsPDF + html2canvas** - Export functionality

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ for the developer community**
