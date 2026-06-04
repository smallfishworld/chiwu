import React from 'react';
import { View, Text as RNText } from 'react-native';
import Svg, { Polygon, Polyline, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../../theme';
import { formatCurrency } from '../../services/formatters';
import type { ChartDataPoint } from '../../services/calculations';

interface ValueChangeChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
}

export function ValueChangeChart({ data, width = 300, height = 160 }: ValueChangeChartProps) {
  const { colors, typography } = useTheme();

  if (data.length < 2) {
    return (
      <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
        <RNText style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.md,
          color: colors.neutral.textTertiary,
        }}>
          数据不足，无法绘制图表
        </RNText>
      </View>
    );
  }

  const padding = { top: 20, right: 20, bottom: 30, left: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;
  const valRange = maxVal - minVal || 1;

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
  const yScale = (v: number) => padding.top + chartH - ((v - minVal) / valRange) * chartH;

  // Build chart path points
  const areaPoints: string[] = [];
  const linePoints: string[] = [];
  data.forEach((d, i) => {
    const x = xScale(i);
    const y = yScale(d.value);
    areaPoints.push(`${x},${y}`);
    linePoints.push(`${x},${y}`);
  });
  // Close area polygon
  const lastX = xScale(data.length - 1);
  const firstX = xScale(0);
  const bottomY = padding.top + chartH;
  areaPoints.push(`${lastX},${bottomY}`);
  areaPoints.push(`${firstX},${bottomY}`);

  const areaPolygon = areaPoints.join(' ');
  const linePolyline = linePoints.join(' ');

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={colors.brand[500]} stopOpacity="0.2" />
          <Stop offset="100%" stopColor={colors.brand[500]} stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {/* Area fill */}
      <Polygon points={areaPolygon} fill="url(#areaGrad)" />

      {/* Line */}
      <Polyline
        points={linePolyline}
        fill="none"
        stroke={colors.brand[500]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {data.map((d, i) => {
        const cx = xScale(i);
        const cy = yScale(d.value);
        const isLast = i === data.length - 1;
        return (
          <Circle
            key={i}
            cx={cx}
            cy={cy}
            r={isLast ? 5 : 4}
            fill={isLast ? colors.semantic.success : colors.brand[500]}
            stroke={isLast ? '#fff' : 'none'}
            strokeWidth={isLast ? 2 : 0}
          />
        );
      })}

      {/* X-axis labels */}
      {data.map((d, i) => {
        const showLabel = i === 0 || i === data.length - 1 || data.length <= 5;
        if (!showLabel) return null;
        return (
          <SvgText
            key={`label-${i}`}
            x={xScale(i)}
            y={height - 8}
            fill={i === data.length - 1 ? colors.neutral.textSecondary : colors.neutral.textTertiary}
            fontSize="10"
            fontFamily={typography.fontFamily.sans}
            fontWeight={i === data.length - 1 ? '700' : '600'}
            textAnchor="middle"
          >
            {d.label}
          </SvgText>
        );
      })}
    </Svg>
  );
}
