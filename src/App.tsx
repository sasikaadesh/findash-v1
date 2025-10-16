// import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { SidebarProvider } from './contexts/SidebarContext';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <AppRoutes />
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
