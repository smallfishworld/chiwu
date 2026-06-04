# 持物 (Chiwu) — Personal Asset Tracking App

## Quick Start
- `npx expo start` — Start dev server
- `npx expo start --ios` — Run on iOS Simulator
- `npx expo start --android` — Run on Android Emulator
- `npx tsc --noEmit` — TypeScript type check

## Tech Stack
- React Native + Expo SDK 56 (v56.0.0) + TypeScript 6.0
- Read exact versioned docs at https://docs.expo.dev/versions/v56.0.0/
- expo-router (file-based routing), expo-sqlite (local DB)
- Zustand (state), react-native-reanimated (animations), react-native-svg (charts)
- expo-blur + expo-linear-gradient (glassmorphism UI)

## Project Structure
- `app/` — expo-router file routes (tabs + stack screens)
- `src/theme/` — Design system tokens (warm taupe palette)
- `src/db/` — SQLite + repositories (asset, category, valuation)
- `src/services/` — Pure business logic (calculations.ts, formatters.ts)
- `src/stores/` — Zustand stores (useAssetStore, useFilterStore, useSettingsStore)
- `src/hooks/` — Custom hooks (useAssets, useAssetDetail, useStatistics)
- `src/components/ui/` — Atomic primitives (Box, Text, Button, Card, Input, Chip, Badge)
- `src/components/asset/` — Domain components (AssetCard, ValueCard, AssetForm, PriceComparison)
- `src/components/charts/` — SVG charts (ValueChangeChart, DonutChart)
- `src/components/navigation/` — Floating TabBar + FAB
- `src/components/layout/` — HeroSection, FilterTabs, FilterChips, ScreenContainer

## Key Design Decisions
- Data stored locally via expo-sqlite, no backend
- Warm taupe/terracotta color system (--brand-500: #b8956a)
- Glass-morphism floating tab bar with expo-blur
- Custom SVG charts for exact visual fidelity to mockups
- Monospace font (SF Mono) for all numeric values
- All business calculations are pure functions in calculations.ts
