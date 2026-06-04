# 持物 (Chiwu) — Personal Asset Tracking App

## Prerequisites
- **Node.js 24.x required** (Expo SDK 56 / RN 0.85 does NOT support Node 23)
  - Node 24 is installed at `~/.n/bin/node`
  - Before running any command: `export N_PREFIX=$HOME/.n; export PATH="$N_PREFIX/bin:$PATH"`
  - Or add to `~/.zprofile`: `export N_PREFIX=$HOME/.n; export PATH="$N_PREFIX/bin:$PATH"`
- Update Expo Go to latest version on your phone (SDK 56 compatibility)

## Quick Start
```bash
export N_PREFIX=$HOME/.n; export PATH="$N_PREFIX/bin:$PATH"
npx expo start -c    # -c clears metro cache, useful after dependency changes
npx expo start --ios
npx expo start --android
npx tsc --noEmit      # TypeScript type check
```

## Tech Stack
- **Framework:** React Native + Expo SDK 56 + TypeScript 6.0
- **Routing:** expo-router (file-based routing under `app/`)
- **Database:** expo-sqlite (local SQLite, WAL mode, no backend)
- **State:** Zustand 5.x (3 stores: assets, filters, settings)
- **Charts:** react-native-svg (custom SVG: ValueChangeChart, DonutChart)
- **Effects:** expo-blur (glassmorphism TabBar), expo-linear-gradient (hero sections)
- **Animation:** react-native-reanimated 4.x
- **Dates:** date-fns 4.x

Read exact versioned Expo docs at https://docs.expo.dev/versions/v56.0.0/

## Project Structure
```
app/                              # expo-router file routes
├── _layout.tsx                   # Root: DB init + ThemeProvider + Stack nav
├── (tabs)/
│   ├── _layout.tsx               # Tabs + floating TabBar + FAB overlay
│   ├── index.tsx                 # Home: Hero + ValueCard + filter + asset grid
│   ├── statistics.tsx            # Charts: donut + category bars
│   └── settings.tsx              # Category CRUD
└── asset/
    ├── [id].tsx                  # Detail: hero + price + stats + chart + actions
    ├── add.tsx                   # Add form (modal)
    └── edit/[id].tsx             # Edit form (modal)

src/
├── theme/           # Design tokens — warm taupe palette (#b8956a)
├── types/           # Asset, Category, Valuation, Statistics
├── db/              # SQLite init + migrations + seed + 3 repos
├── services/        # Pure business logic (calculations, formatters)
├── stores/          # Zustand: useAssetStore, useFilterStore, useSettingsStore
├── hooks/           # useAssets, useAssetDetail, useCategories, useStatistics
├── components/
│   ├── ui/          # Atoms: Box, Text, Button, Card, Input, Chip, Badge...
│   ├── asset/       # AssetCard, AssetGrid, ValueCard, PriceComparison, AssetForm, StatsBox...
│   ├── charts/      # ValueChangeChart (SVG line+area), DonutChart (SVG ring)
│   ├── navigation/  # TabBar (glassmorphism), TabBarItem, FAB
│   └── layout/      # ScreenContainer, HeroSection, FilterTabs, FilterChips
└── constants/       # Default categories, status labels

## Database Schema
- `categories`: id, name, icon (emoji), sort_order
- `assets`: id, name, category_id, purchase_price, purchase_date, current_valuation, sold_price, sold_date, status (active|retired|sold), notes
- `valuations`: id, asset_id, value, recorded_date, note
- Foreign keys with CASCADE delete, CHECK constraints on prices >= 0

## Business Logic (src/services/calculations.ts)
- `dailyCost = purchasePrice / max(daysUsed, 1)`
- `retentionRate = currentValuation / purchasePrice × 100%`
- `monthlyDepreciation = (purchasePrice - currentValuation) / max(monthsHeld, 1)`
- `unrealizedPnL = currentValuation - purchasePrice`
- `realizedPnL = soldPrice - purchasePrice`

## Data Flow
SQLite ↔ Repository ↔ Zustand Store ↔ Custom Hooks ↔ React Components

## Design System
- **Colors:** Warm taupe/terracotta (--brand-500: #b8956a), warm gray neutrals
- **Fonts:** System sans-serif (Inter/PingFang SC) + SF Mono for numbers
- **Radii:** 8/12/16/20/24/9999px scale
- **Shadows:** Warm-charcoal based (#2c2a28), low opacity (0.04-0.12)
- **TabBar:** Floating glassmorphism with expo-blur (intensity 24)
- **Hero:** 160° linear gradient #c9a97e → #8b6f4e → #6b5338
