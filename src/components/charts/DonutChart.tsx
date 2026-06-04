import React from 'react';
import { View, Text as RNText } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../theme';
import { formatCurrencyCompact } from '../../services/formatters';
import type { CategoryBreakdown } from '../../types';

interface DonutChartProps {
  data: CategoryBreakdown[];
  size?: number;
  strokeWidth?: number;
}

export function DonutChart({ data, size = 160, strokeWidth = 20 }: DonutChartProps) {
  const { colors, typography } = useTheme();

  const catColors = [
    colors.brand[500],
    colors.semantic.warning,
    colors.chart.cat3,
    colors.chart.cat4,
    colors.chart.cat5,
  ];

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const totalValue = data.reduce((sum, d) => sum + d.totalPurchaseCost, 0);
  if (totalValue === 0) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <RNText style={{ color: colors.neutral.textTertiary }}>无数据</RNText>
      </View>
    );
  }

  let offset = 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const percentage = d.totalPurchaseCost / totalValue;
          const segmentLength = percentage * circumference;
          const segment = (
            <Circle
              key={d.categoryId}
              cx={center}
              cy={center}
              r={radius}
              stroke={catColors[i % catColors.length]}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          );
          offset += segmentLength;
          return segment;
        })}

        {/* Center hole */}
        <Circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill={colors.neutral.bgSurface}
        />

        {/* Center text */}
        <SvgText
          x={center}
          y={center - 2}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontFamily={typography.fontFamily.mono}
          fontSize="14"
          fontWeight="700"
          fill={colors.neutral.textSecondary}
        >
          {formatCurrencyCompact(totalValue)}
        </SvgText>
      </Svg>
    </View>
  );
}
