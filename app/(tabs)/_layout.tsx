import React, { useEffect } from 'react';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { View } from 'react-native';
import { TabBar } from '../../src/components/navigation/TabBar';
import { FAB } from '../../src/components/navigation/FAB';
import { useAssetStore } from '../../src/stores/useAssetStore';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useTheme } from '../../src/theme';

function getActiveTab(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/index')) return 'index';
  if (pathname.includes('/statistics')) return 'statistics';
  if (pathname.includes('/settings')) return 'settings';
  return 'index';
}

export default function TabLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { colors } = useTheme();
  const loadAssets = useAssetStore((s) => s.loadAssets);
  const loadCategories = useSettingsStore((s) => s.loadCategories);

  useEffect(() => {
    loadAssets();
    loadCategories();
  }, []);

  // Don't show FAB/TabBar on modal or nested screens
  const hideOverlay = pathname.includes('/add') || pathname.includes('/edit') || pathname.includes('/asset/');

  return (
    <View style={{ flex: 1, backgroundColor: colors.neutral.bgBase }}>
      <Tabs screenOptions={{ headerShown: false }} tabBar={() => null}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="statistics" />
        <Tabs.Screen name="settings" />
      </Tabs>

      {!hideOverlay && (
        <>
          <FAB onPress={() => router.push('/asset/add')} />
          <TabBar
            activeTab={getActiveTab(pathname)}
            onTabPress={(key) => {
              if (key === 'index') router.push('/');
              else router.push(`/${key}`);
            }}
          />
        </>
      )}
    </View>
  );
}
