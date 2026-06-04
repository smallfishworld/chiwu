import React from 'react';
import { View, Text as RNText, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../../src/components/layout/ScreenContainer';
import { AssetForm } from '../../../src/components/asset/AssetForm';
import { useTheme } from '../../../src/theme';
import { useAssetStore } from '../../../src/stores/useAssetStore';
import { useAssetDetail } from '../../../src/hooks/useAssetDetail';
import type { AssetFormData } from '../../../src/types';

export default function EditAssetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const { asset, reload } = useAssetDetail(id);
  const updateAsset = useAssetStore((s) => s.updateAsset);

  const handleSubmit = async (data: AssetFormData) => {
    const purchasePrice = parseFloat(data.purchasePrice) || 0;
    const currentValuation = data.currentValuation ? parseFloat(data.currentValuation) : null;

    await updateAsset(id, {
      name: data.name.trim(),
      categoryId: data.categoryId,
      purchasePrice,
      purchaseDate: data.purchaseDate,
      currentValuation: currentValuation != null && !isNaN(currentValuation) ? currentValuation : purchasePrice,
      notes: data.notes.trim(),
    });

    router.back();
  };

  if (!asset) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neutral.bgBase }}>
        <ActivityIndicator size="large" color={colors.brand[500]} />
      </View>
    );
  }

  return (
    <ScreenContainer noScroll paddingTop={insets.top}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.borderSubtle,
          backgroundColor: colors.neutral.bgBase,
        }}
      >
        <RNText
          onPress={() => router.back()}
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.lg,
            color: colors.neutral.textSecondary,
          }}
        >
          取消
        </RNText>
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.textPrimary,
          }}
        >
          编辑资产
        </RNText>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ paddingTop: 16 }}>
        <AssetForm initialData={asset} onSubmit={handleSubmit} submitLabel="保存修改" />
      </View>
    </ScreenContainer>
  );
}
