import React, { useState, useEffect } from 'react';
import { View, Text as RNText, Alert } from 'react-native';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useTheme } from '../../theme';
import { useCategories } from '../../hooks/useCategories';
import type { AssetWithCategory, AssetFormData } from '../../types';

interface AssetFormProps {
  initialData?: AssetWithCategory;
  onSubmit: (data: AssetFormData) => Promise<void>;
  submitLabel: string;
}

export function AssetForm({ initialData, onSubmit, submitLabel }: AssetFormProps) {
  const { colors, typography } = useTheme();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const [form, setForm] = useState<AssetFormData>({
    name: initialData?.name ?? '',
    categoryId: initialData?.categoryId ?? categories[0]?.id ?? '',
    purchasePrice: initialData ? String(initialData.purchasePrice) : '',
    purchaseDate: initialData?.purchaseDate ?? new Date().toISOString().substring(0, 10),
    currentValuation: initialData?.currentValuation != null ? String(initialData.currentValuation) : '',
    notes: initialData?.notes ?? '',
  });

  useEffect(() => {
    if (!form.categoryId && categories.length > 0) {
      setForm((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const selectedCategory = categories.find((c) => c.id === form.categoryId);

  const handleSubmit = async () => {
    // Validation
    if (!form.name.trim()) {
      Alert.alert('请输入资产名称');
      return;
    }
    if (!form.categoryId) {
      Alert.alert('请选择分类');
      return;
    }
    const price = parseFloat(form.purchasePrice);
    if (isNaN(price) || price < 0) {
      Alert.alert('请输入有效的购入价格');
      return;
    }
    if (!form.purchaseDate) {
      Alert.alert('请输入购入日期');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        purchasePrice: form.purchasePrice,
        currentValuation: form.currentValuation,
      });
    } catch {
      Alert.alert('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof AssetFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Asset name */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textSecondary,
            }}
          >
            资产名称
          </RNText>
          <RNText style={{ color: colors.semantic.danger, fontSize: 12 }}>*</RNText>
        </View>
        <Input
          value={form.name}
          onChangeText={(v) => updateField('name', v)}
          placeholder="例如：iPhone 17 Pro Max"
        />
      </View>

      {/* Category */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textSecondary,
            }}
          >
            分类
          </RNText>
          <RNText style={{ color: colors.semantic.danger, fontSize: 12 }}>*</RNText>
        </View>
        <Select
          label={selectedCategory ? `${selectedCategory.name}` : '选择分类'}
          icon={selectedCategory?.icon}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
        />
        {showCategoryPicker && (
          <View
            style={{
              marginTop: 8,
              backgroundColor: colors.neutral.bgSurface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.neutral.borderSubtle,
              overflow: 'hidden',
            }}
          >
            {categories.map((cat) => (
              <RNText
                key={cat.id}
                onPress={() => {
                  updateField('categoryId', cat.id);
                  setShowCategoryPicker(false);
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.fontSize.lg,
                  fontWeight: form.categoryId === cat.id ? '700' : '500',
                  color: form.categoryId === cat.id ? colors.brand[600] : colors.neutral.textPrimary,
                  backgroundColor: form.categoryId === cat.id ? colors.brand[50] : 'transparent',
                }}
              >
                {cat.icon}  {cat.name}
              </RNText>
            ))}
          </View>
        )}
      </View>

      {/* Purchase price */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textSecondary,
            }}
          >
            购入价格 (¥)
          </RNText>
          <RNText style={{ color: colors.semantic.danger, fontSize: 12 }}>*</RNText>
        </View>
        <Input
          value={form.purchasePrice}
          onChangeText={(v) => updateField('purchasePrice', v)}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />
      </View>

      {/* Purchase date */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textSecondary,
            }}
          >
            购入日期
          </RNText>
          <RNText style={{ color: colors.semantic.danger, fontSize: 12 }}>*</RNText>
        </View>
        <Input
          value={form.purchaseDate}
          onChangeText={(v) => updateField('purchaseDate', v)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Current valuation */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textSecondary,
            }}
          >
            当前估值 (¥)
          </RNText>
          <RNText style={{ color: colors.semantic.danger, fontSize: 12 }}>*</RNText>
        </View>
        <Input
          value={form.currentValuation}
          onChangeText={(v) => updateField('currentValuation', v)}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />
      </View>

      {/* Notes */}
      <View style={{ paddingHorizontal: 16 }}>
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral.textSecondary,
            marginBottom: 8,
          }}
        >
          备注
        </RNText>
        <Input
          value={form.notes}
          onChangeText={(v) => updateField('notes', v)}
          placeholder="型号、配置、购买渠道等..."
          multiline
        />
      </View>

      {/* Submit */}
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <Button variant="primary" onPress={handleSubmit} loading={loading}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}
