import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
  Print as PrintIcon,
  Image as ImageIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { exportToPDF, exportToCSV, printPage, exportChartAsImage } from '../../utils/pdfExport';

interface ExportOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => Promise<void> | void;
}

interface ExportButtonsProps {
  data?: any[];
  elementId?: string;
  chartElementId?: string;
  filename?: string;
  variant?: 'buttons' | 'dropdown';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  data = [],
  elementId = 'dashboard-content',
  chartElementId,
  filename = 'export',
  variant = 'buttons',
  size = 'medium',
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success',
    });
  };

  const showError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error',
    });
  };

  const handleExport = async (type: string, action: () => Promise<void> | void) => {
    if (disabled) return;

    setLoading(type);
    handleMenuClose();

    try {
      await action();
      showSuccess(`${type} export completed successfully!`);
    } catch (error) {
      console.error(`Error exporting ${type}:`, error);
      showError(`Failed to export ${type}. Please try again.`);
    } finally {
      setLoading(null);
    }
  };

  const exportOptions: ExportOption[] = [
    {
      id: 'pdf',
      label: 'Export as PDF',
      icon: <PictureAsPdfIcon />,
      action: () => exportToPDF(elementId, { filename }),
    },
    {
      id: 'csv',
      label: 'Export as CSV',
      icon: <TableChartIcon />,
      action: () => exportToCSV(data, filename),
    },
    {
      id: 'print',
      label: 'Print Page',
      icon: <PrintIcon />,
      action: () => printPage(),
    },
  ];

  // Add chart export option if chartElementId is provided
  if (chartElementId) {
    exportOptions.splice(2, 0, {
      id: 'chart',
      label: 'Export Chart',
      icon: <ImageIcon />,
      action: () => exportChartAsImage(chartElementId, `${filename}-chart`),
    });
  }

  if (variant === 'dropdown') {
    return (
      <>
        <Button
          variant="outlined"
          size={size}
          disabled={disabled}
          onClick={handleMenuOpen}
          endIcon={loading ? <CircularProgress size={16} /> : <ExpandMoreIcon />}
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              minWidth: 180,
            },
          }}
        >
          {exportOptions.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleExport(option.label, option.action)}
              disabled={loading === option.id}
            >
              <ListItemIcon>
                {loading === option.id ? (
                  <CircularProgress size={20} />
                ) : (
                  option.icon
                )}
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <ButtonGroup variant="outlined" size={size} disabled={disabled}>
        {exportOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleExport(option.label, option.action)}
            disabled={loading === option.id}
            startIcon={
              loading === option.id ? (
                <CircularProgress size={16} />
              ) : (
                option.icon
              )
            }
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportButtons;
