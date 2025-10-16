import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/helpers';

export interface KPIData {
  id: string;
  title: string;
  value: number;
  previousValue?: number;
  format: 'currency' | 'number' | 'percentage';
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
}

interface KPIBoxProps {
  data: KPIData;
  loading?: boolean;
  onClick?: () => void;
}

const KPIBox: React.FC<KPIBoxProps> = ({ data, loading = false, onClick }) => {
  const { isDarkMode, isGlassMode } = useTheme();

  const formatValue = (value: number, format: KPIData['format']): string => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      default:
        return value.toString();
    }
  };

  const calculateChange = (): { percentage: number; isPositive: boolean } | null => {
    if (data.previousValue === undefined) return null;
    
    const change = ((data.value - data.previousValue) / data.previousValue) * 100;
    return {
      percentage: Math.abs(change),
      isPositive: change >= 0,
    };
  };

  const change = calculateChange();
  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  if (loading) {
    return (
      <Card sx={{ ...glassStyles, height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={20} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        ...glassStyles,
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: isGlassMode 
            ? '0 12px 40px rgba(31, 38, 135, 0.5)'
            : isDarkMode
              ? '0 8px 24px rgba(0, 0, 0, 0.4)'
              : '0 8px 24px rgba(0, 0, 0, 0.15)',
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${data.color || 'primary'}.main`,
              color: `${data.color || 'primary'}.contrastText`,
            }}
          >
            {data.icon}
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          {data.title}
        </Typography>

        {/* Value */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
            lineHeight: 1.2,
          }}
        >
          {formatValue(data.value, data.format)}
        </Typography>

        {/* Subtitle */}
        {data.subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {data.subtitle}
          </Typography>
        )}

        {/* Change Indicator */}
        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
            <Chip
              icon={change.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${change.isPositive ? '+' : '-'}${formatPercentage(change.percentage)}`}
              size="small"
              color={change.isPositive ? 'success' : 'error'}
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 24,
                '& .MuiChip-icon': {
                  fontSize: '0.875rem',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              vs last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIBox;
