import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { AssetForm } from '../../src/components/asset/AssetForm';
import { useTheme } from '../../src/theme';
import { useAssetStore } from '../../src/stores/useAssetStore';
import type { AssetFormData } from '../../src/types';

export default function AddAssetScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const createAsset = useAssetStore((s) => s.createAsset);

  const handleSubmit = async (data: AssetFormData) => {
    const purchasePrice = parseFloat(data.purchasePrice) || 0;
    const currentValuation = data.currentValuation ? parseFloat(data.currentValuation) : null;

    await createAsset({
      name: data.name.trim(),
      categoryId: data.categoryId,
      purchasePrice,
      purchaseDate: data.purchaseDate,
      currentValuation: currentValuation != null && !isNaN(currentValuation) ? currentValuation : purchasePrice,
      notes: data.notes.trim(),
    });

    router.back();
  };

  return (
    <ScreenContainer noScroll paddingTop={insets.top}>
      {/* Custom header */}
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
          添加资产
        </RNText>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ paddingTop: 16 }}>
        <AssetForm onSubmit={handleSubmit} submitLabel="添加资产" />
      </View>
    </ScreenContainer>
  );
}
