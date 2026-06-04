import React from 'react';
import { View, Text as RNText, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Button } from '../../src/components/ui/Button';
import { useTheme } from '../../src/theme';
import { useCategories } from '../../src/hooks/useCategories';
import { useSettingsStore } from '../../src/stores/useSettingsStore';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, typography, radii } = useTheme();
  const { categories } = useCategories();
  const addCategory = useSettingsStore((s) => s.addCategory);
  const removeCategory = useSettingsStore((s) => s.removeCategory);

  const handleAddCategory = () => {
    Alert.prompt
      ? Alert.prompt('添加分类', '输入分类名称和图标（emoji）', [
          { text: '取消', style: 'cancel' },
          {
            text: '添加',
            onPress: async (name?: string) => {
              if (name) {
                const id = 'cat-' + Date.now().toString(36);
                await addCategory(id, name, '📦');
              }
            },
          },
        ])
      : Alert.alert('提示', '添加分类功能需要原生支持');
  };

  return (
    <ScreenContainer noScroll paddingTop={insets.top}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: colors.neutral.borderSubtle,
        backgroundColor: colors.neutral.bgBase,
      }}>
        <RNText style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize['5xl'],
          fontWeight: typography.fontWeight.extrabold,
          color: colors.neutral.textPrimary,
        }}>
          设置
        </RNText>
      </View>

      <View style={{ padding: 16, gap: 12 }}>
        {/* Categories */}
        <View style={{
          backgroundColor: colors.neutral.bgSurface,
          borderRadius: radii.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.neutral.borderSubtle,
        }}>
          <RNText style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.textPrimary,
            marginBottom: 16,
          }}>
            分类管理
          </RNText>

          {categories.map((cat) => (
            <View
              key={cat.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.neutral.borderSubtle,
              }}
            >
              <RNText style={{ fontSize: 20, marginRight: 12 }}>{cat.icon}</RNText>
              <RNText style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.medium,
                color: colors.neutral.textPrimary,
                flex: 1,
              }}>
                {cat.name}
              </RNText>
              <RNText
                onPress={() => {
                  Alert.alert('删除分类', `确定删除「${cat.name}」吗？`, [
                    { text: '取消', style: 'cancel' },
                    { text: '删除', style: 'destructive', onPress: () => removeCategory(cat.id) },
                  ]);
                }}
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.fontSize.sm,
                  color: colors.semantic.danger,
                  padding: 8,
                }}
              >
                删除
              </RNText>
            </View>
          ))}

          <View style={{ marginTop: 16 }}>
            <Button variant="ghost" onPress={handleAddCategory}>
              + 添加分类
            </Button>
          </View>
        </View>

        {/* App info */}
        <View style={{
          backgroundColor: colors.neutral.bgSurface,
          borderRadius: radii.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.neutral.borderSubtle,
          alignItems: 'center',
        }}>
          <RNText style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.textPrimary,
            marginBottom: 4,
          }}>
            持物
          </RNText>
          <RNText style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.sm,
            color: colors.neutral.textTertiary,
          }}>
            v1.0.0 · 数据仅存储在本地
          </RNText>
        </View>

        <View style={{ height: 100 }} />
      </View>
    </ScreenContainer>
  );
}
