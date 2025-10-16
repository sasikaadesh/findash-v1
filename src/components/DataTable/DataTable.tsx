import React from 'react';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import type {
  GridColDef,
  GridRowsProp,
} from '@mui/x-data-grid';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { formatCurrency, formatPercentage } from '../../utils/helpers';

export interface DataTableColumn extends Omit<GridColDef, 'renderCell'> {
  field: string;
  headerName: string;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage' | 'avatar' | 'chip' | 'actions';
  renderCell?: (params: any) => React.ReactNode;
}

interface DataTableProps {
  data: GridRowsProp;
  columns: DataTableColumn[];
  title?: string;
  loading?: boolean;
  height?: number;
  pageSize?: number;
  onRowClick?: (params: any) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onView?: (id: string | number) => void;
  showToolbar?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  loading = false,
  height = 400,
  pageSize = 10,
  onRowClick,
  onEdit,
  onDelete,
  onView,
  showToolbar = true,
}) => {
  const { isDarkMode, isGlassMode } = useTheme();

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  // Enhanced column rendering
  const enhancedColumns: GridColDef[] = columns.map((col) => {
    const baseColumn: GridColDef = {
      ...col,
      headerAlign: 'left',
      align: col.type === 'number' || col.type === 'currency' || col.type === 'percentage' ? 'right' : 'left',
    };

    // Custom render cell based on type
    if (!col.renderCell) {
      switch (col.type) {
        case 'currency':
          baseColumn.renderCell = (params) => (
            <Typography variant="body2" fontWeight={500}>
              {formatCurrency(params.value)}
            </Typography>
          );
          break;

        case 'percentage':
          baseColumn.renderCell = (params) => (
            <Typography variant="body2" fontWeight={500}>
              {formatPercentage(params.value)}
            </Typography>
          );
          break;

        case 'avatar':
          baseColumn.renderCell = (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={params.row.avatar}
                alt={params.value}
                sx={{ width: 32, height: 32 }}
              >
                {params.value?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2">{params.value}</Typography>
            </Box>
          );
          break;

        case 'chip':
          baseColumn.renderCell = (params) => {
            const getChipColor = (value: string) => {
              switch (value.toLowerCase()) {
                case 'active':
                case 'completed':
                case 'success':
                  return 'success';
                case 'pending':
                case 'warning':
                  return 'warning';
                case 'inactive':
                case 'failed':
                case 'error':
                  return 'error';
                default:
                  return 'default';
              }
            };

            return (
              <Chip
                label={params.value}
                color={getChipColor(params.value)}
                size="small"
                variant="outlined"
              />
            );
          };
          break;

        case 'actions':
          baseColumn.type = 'actions';
          baseColumn.getActions = (params) => {
            const actions = [];
            
            if (onView) {
              actions.push(
                <GridActionsCellItem
                  icon={
                    <Tooltip title="View">
                      <VisibilityIcon />
                    </Tooltip>
                  }
                  label="View"
                  onClick={() => onView(params.id)}
                />
              );
            }
            
            if (onEdit) {
              actions.push(
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Edit">
                      <EditIcon />
                    </Tooltip>
                  }
                  label="Edit"
                  onClick={() => onEdit(params.id)}
                />
              );
            }
            
            if (onDelete) {
              actions.push(
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Delete">
                      <DeleteIcon />
                    </Tooltip>
                  }
                  label="Delete"
                  onClick={() => onDelete(params.id)}
                />
              );
            }

            return actions;
          };
          break;

        default:
          break;
      }
    }

    return baseColumn;
  });

  return (
    <Card sx={{ ...glassStyles }}>
      <CardContent>
        {title && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
        )}
        
        <Box sx={{ height, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={enhancedColumns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { pageSize: pageSize },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            onRowClick={onRowClick}
            slots={{
              toolbar: showToolbar ? GridToolbar : null,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-main': {
                borderRadius: 2,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                '&:focus': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                },
                '&.Mui-selected': {
                  backgroundColor: isDarkMode ? 'rgba(91, 108, 226, 0.1)' : 'rgba(91, 108, 226, 0.05)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(91, 108, 226, 0.15)' : 'rgba(91, 108, 226, 0.08)',
                  },
                },
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: '12px 12px 0 0',
              },
              '& .MuiDataGrid-columnHeader': {
                '&:focus': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              },
              '& .MuiDataGrid-toolbarContainer': {
                padding: '16px',
                borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DataTable;
