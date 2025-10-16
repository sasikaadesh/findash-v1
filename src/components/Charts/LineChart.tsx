import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Card, CardContent, Typography, Box, Skeleton, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../theme';
import { getGlassCardStyles } from '../../theme/glassThemeUtils';
import { useSidebar } from '../../contexts/SidebarContext';

export interface LineChartData {
  id: string;
  color?: string;
  data: Array<{
    x: string | number;
    y: number;
  }>;
}

interface LineChartProps {
  data: LineChartData[];
  title?: string;
  height?: number;
  loading?: boolean;
  showLegend?: boolean;
  enableArea?: boolean;
  curve?: 'linear' | 'monotoneX' | 'monotoneY' | 'cardinal' | 'catmullRom';
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 300,
  loading = false,
  showLegend = true,
  enableArea = false,
  curve = 'monotoneX',
}) => {
  const { isDarkMode, isGlassMode } = useTheme();
  const { sidebarKey } = useSidebar();
  const muiTheme = useMuiTheme();
  const isXs = useMediaQuery(muiTheme.breakpoints.down('sm')); // < 600px
  const isMd = useMediaQuery(muiTheme.breakpoints.down('lg')); // < 1200px
  const isBelow768 = useMediaQuery('(max-width:768px)'); // Specific 768px check

  const glassStyles = getGlassCardStyles({ isGlassMode, isDarkMode });

  // Force re-render when container size changes (for sidebar collapse/expand)
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setChartKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);

    // Also listen for sidebar state changes by observing container width changes
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(() => setChartKey(prev => prev + 1), 100);
    });

    const chartContainer = document.getElementById('chart-container-' + title?.replace(/\s+/g, '-'));
    if (chartContainer) {
      resizeObserver.observe(chartContainer);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [title]);

  // Update chart key when sidebar state changes with a small delay for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartKey(prev => prev + 1);
    }, 150); // Small delay to allow sidebar transition to complete

    return () => clearTimeout(timer);
  }, [sidebarKey]);

  // Responsive margins and settings - ensure minimum content area
  // For mobile, use extremely minimal margins to maximize chart area
  const responsiveMargins = {
    top: isXs ? 5 : isBelow768 ? 8 : 20,
    right: isXs ? 2 : isBelow768 ? 3 : isMd ? 15 : 20,
    bottom: isXs ? 15 : isBelow768 ? 20 : 50,
    left: isXs ? 10 : isBelow768 ? 15 : isMd ? 40 : 60,
  };

  // Ensure minimum content area for chart rendering
  const totalMarginHeight = responsiveMargins.top + responsiveMargins.bottom;
  const minContentHeight = 100; // Minimum height for chart content

  // Calculate responsive height ensuring enough space for chart content
  const responsiveHeight = Math.max(
    isXs ? 180 : isBelow768 ? 200 : height,
    minContentHeight + totalMarginHeight
  );

  const chartTheme = {
    background: 'transparent',
    text: {
      fontSize: isXs ? 10 : isBelow768 ? 11 : 12,
      fill: isDarkMode ? '#f5f5f7' : '#1e1e2f',
    },
    axis: {
      domain: {
        line: {
          stroke: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: isDarkMode ? '#9ca3af' : '#6b7280',
        },
      },
      ticks: {
        line: {
          stroke: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          strokeWidth: 1,
        },
        text: {
          fontSize: isXs ? 9 : isBelow768 ? 10 : 11,
          fill: isDarkMode ? '#9ca3af' : '#6b7280',
        },
      },
    },
    grid: {
      line: {
        stroke: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        strokeWidth: 1,
      },
    },
    crosshair: {
      line: {
        stroke: isDarkMode ? '#f5f5f7' : '#1e1e2f',
        strokeWidth: 1,
        strokeOpacity: 0.35,
      },
    },
    tooltip: {
      container: {
        background: isDarkMode ? '#1c1c1f' : '#ffffff',
        color: isDarkMode ? '#f5f5f7' : '#1e1e2f',
        fontSize: 12,
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      },
    },
    legends: {
      text: {
        fontSize: 12,
        fill: isDarkMode ? '#f5f5f7' : '#1e1e2f',
      },
    },
  };

  if (loading) {
    return (
      <Card sx={{ ...glassStyles, height: responsiveHeight + 100 }}>
        <CardContent>
          {title && (
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
          )}
          <Skeleton variant="rectangular" width="100%" height={responsiveHeight} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ ...glassStyles, height: responsiveHeight + 100 }}>
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {title && (
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={600}
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              mb: { xs: 1, sm: 2 }
            }}
          >
            {title}
          </Typography>
        )}
        <Box
          id={`chart-container-${title?.replace(/\s+/g, '-')}`}
          sx={{
            height: responsiveHeight,
            width: '100%',
            minWidth: isXs ? '280px' : isBelow768 ? '320px' : '100%',
            overflow: 'hidden',
            position: 'relative',
            // Ensure the container has explicit dimensions for Nivo
            '& > div': {
              width: '100% !important',
              height: `${responsiveHeight}px !important`
            }
          }}>

          <ResponsiveLine
            key={chartKey}
            data={data}
            theme={chartTheme}
            margin={responsiveMargins}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            curve={curve}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: isXs ? 2 : isBelow768 ? 3 : 5,
              tickPadding: isXs ? 2 : isBelow768 ? 3 : 5,
              tickRotation: isBelow768 ? -45 : 0,
              format: isBelow768 ? (value) => String(value).slice(0, 3) : undefined,
            }}
            axisLeft={{
              tickSize: isXs ? 2 : isBelow768 ? 3 : 5,
              tickPadding: isXs ? 2 : isBelow768 ? 3 : 5,
              tickRotation: 0,
              format: isBelow768 ? (value) => `${Number(value) / 1000}k` : undefined,
            }}
            enableGridX={false}
            enableGridY={true}
            colors={{ scheme: 'category10' }}
            pointSize={isXs ? 3 : isBelow768 ? 4 : 6}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={isXs ? 1 : isBelow768 ? 1 : 2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={enableArea}
            areaOpacity={0.1}
            useMesh={true}
            enableCrosshair={!isBelow768}
            crosshairType="cross"
            legends={
              showLegend && !isBelow768
                ? [
                    {
                      anchor: isMd ? 'bottom' : 'bottom-right',
                      direction: isMd ? 'row' : 'column',
                      justify: false,
                      translateX: isMd ? 0 : 100,
                      translateY: isMd ? 50 : 0,
                      itemsSpacing: isMd ? 10 : 0,
                      itemDirection: 'left-to-right',
                      itemWidth: isMd ? 60 : 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : []
            }
            animate={true}
            motionConfig="gentle"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
