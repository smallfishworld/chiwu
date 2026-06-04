import React from 'react';
import { View, Text as RNText, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/theme';
import { useAssetDetail } from '../../src/hooks/useAssetDetail';
import { useAssetStore } from '../../src/stores/useAssetStore';
import { valuationRepository } from '../../src/db';
import { PriceComparison } from '../../src/components/asset/PriceComparison';
import { StatsGrid } from '../../src/components/asset/StatsGrid';
import { ValueChangeChart } from '../../src/components/charts/ValueChangeChart';
import { computeChartData } from '../../src/services/calculations';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { Divider } from '../../src/components/ui/Divider';
import { formatCurrency, formatDate, formatDuration } from '../../src/services/formatters';

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, typography, radii } = useTheme();
  const { asset, valuations, derived, reload } = useAssetDetail(id);
  const deleteAsset = useAssetStore((s) => s.deleteAsset);
  const markAsSold = useAssetStore((s) => s.markAsSold);
  const markAsRetired = useAssetStore((s) => s.markAsRetired);

  if (!asset || !derived) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neutral.bgBase }}>
        <RNText style={{ color: colors.neutral.textTertiary }}>加载中...</RNText>
      </View>
    );
  }

  const handleAddValuation = async () => {
    Alert.prompt
      ? Alert.prompt('添加估值记录', '输入当前估值 (¥)', [
          { text: '取消', style: 'cancel' },
          {
            text: '保存',
            onPress: async (value?: string) => {
              if (value) {
                const num = parseFloat(value);
                if (!isNaN(num) && num >= 0) {
                  await valuationRepository.create(asset.id, num, new Date().toISOString().substring(0, 10));
                  reload();
                }
              }
            },
          },
        ])
      : Alert.alert('提示', '此功能需要原生 Alert.prompt 支持');
  };

  const handleMarkSold = () => {
    Alert.alert('标记为已售出', '请输入售出价格和日期', [
      { text: '取消', style: 'cancel' },
      {
        text: '确认售出',
        style: 'destructive',
        onPress: async () => {
          const price = asset.currentValuation ?? asset.purchasePrice;
          const date = new Date().toISOString().substring(0, 10);
          await markAsSold(asset.id, price, date);
          router.back();
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('删除资产', `确定要删除「${asset.name}」吗？此操作不可撤销。`, [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          await deleteAsset(asset.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.neutral.bgBase }} bounces={false}>
      {/* Detail Hero */}
      <LinearGradient
        colors={['#c9a97e', '#8b6f4e', '#6b5338']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 4,
          padding: 12,
          paddingBottom: 20,
          borderBottomLeftRadius: radii['2xl'],
          borderBottomRightRadius: radii['2xl'],
        }}
      >
        {/* Decorative circle */}
        <View
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        />

        {/* Nav */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <RNText
            onPress={() => router.back()}
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textInverse,
            }}
          >
            ← 资产
          </RNText>
          <RNText
            onPress={() => router.push(`/asset/edit/${asset.id}`)}
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textInverse,
            }}
          >
            编辑
          </RNText>
        </View>

        {/* Product info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: radii.lg,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RNText style={{ fontSize: 36 }}>{asset.categoryIcon}</RNText>
          </View>
          <View>
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.extrabold,
                color: colors.neutral.textInverse,
                marginBottom: 4,
              }}
            >
              {asset.name}
            </RNText>
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.medium,
                color: colors.neutral.textInverse,
                opacity: 0.9,
              }}
            >
              {asset.categoryName} · 已使用{formatDuration(derived.daysUsed)}
            </RNText>
            <View style={{ marginTop: 8 }}>
              <Badge status={asset.status as 'active' | 'retired' | 'sold'} />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={{ padding: 16, gap: 12 }}>
        {/* Price comparison */}
        <PriceComparison
          purchasePrice={asset.purchasePrice}
          purchaseDate={asset.purchaseDate}
          currentValuation={asset.currentValuation ?? asset.purchasePrice}
        />

        {/* Stats grid */}
        <StatsGrid
          items={[
            { label: '持有时间', value: formatDuration(derived.daysUsed) },
            { label: '日均成本', value: `${formatCurrency(derived.dailyCost)}/天`, color: 'warning' as const },
            { label: '月均折旧', value: `${formatCurrency(derived.monthlyDepreciation)}/月` },
            {
              label: '未实现盈亏',
              value: derived.unrealizedPnL >= 0 ? `+${formatCurrency(derived.unrealizedPnL)}` : `-${formatCurrency(Math.abs(derived.unrealizedPnL))}`,
              color: derived.unrealizedPnL >= 0 ? 'success' as const : 'danger' as const,
            },
          ]}
        />

        {/* Chart */}
        <View
          style={{
            backgroundColor: colors.neutral.bgSurface,
            borderRadius: radii.xl,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.neutral.borderSubtle,
          }}
        >
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral.textPrimary,
              marginBottom: 16,
            }}
          >
            价值变化 ›
          </RNText>
          <View style={{ height: 160, borderRadius: radii.md, overflow: 'hidden' }}>
            <ValueChangeChart
              data={computeChartData(asset, valuations)}
              width={300}
              height={160}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.neutral.borderSubtle }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand[500] }} />
              <RNText style={{ fontFamily: typography.fontFamily.sans, fontSize: 12, fontWeight: '600', color: colors.neutral.textSecondary }}>购入价</RNText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.semantic.success }} />
              <RNText style={{ fontFamily: typography.fontFamily.sans, fontSize: 12, fontWeight: '600', color: colors.neutral.textSecondary }}>当前估值</RNText>
            </View>
          </View>
        </View>

        {/* Add valuation */}
        <Button variant="ghost" onPress={handleAddValuation}>
          + 添加估值记录
        </Button>

        {/* Notes */}
        {asset.notes ? (
          <View
            style={{
              backgroundColor: colors.neutral.bgSurface,
              borderRadius: radii.xl,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.neutral.borderSubtle,
            }}
          >
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral.textTertiary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              备注
            </RNText>
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.medium,
                color: colors.neutral.textSecondary,
                lineHeight: 24,
              }}
            >
              {asset.notes}
            </RNText>
          </View>
        ) : null}

        {/* Actions */}
        {asset.status === 'active' && (
          <Button variant="danger" onPress={handleMarkSold}>
            标记为已售出
          </Button>
        )}
        <Button variant="primary" onPress={() => router.push(`/asset/edit/${asset.id}`)}>
          编辑资产
        </Button>
        <Button variant="outline" onPress={handleDelete}>
          删除资产
        </Button>

        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
}
