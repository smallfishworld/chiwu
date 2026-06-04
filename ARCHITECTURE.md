# 持物 (Chiwu) — 技术架构文档

## 概述

**持物** 是一款个人资产追踪管理 App，帮助用户记录和追踪所持物品的购买成本、日均花费、价值折旧和保值率。支持 iOS 和 Android 双平台，数据完全存储在本地设备。

## 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | React Native + Expo | SDK 56 / RN 0.85 | 跨平台移动端框架 |
| 语言 | TypeScript | 6.0 | 类型安全 |
| 路由 | expo-router | 4.x | 文件系统路由，支持 Tab/Stack/Modal |
| 数据库 | expo-sqlite | 15.x | 本地 SQLite，WAL 模式 |
| 状态管理 | Zustand | 5.x | 轻量响应式状态 |
| 动画 | react-native-reanimated | 4.x | UI 线程动画 |
| 手势 | react-native-gesture-handler | 2.x | 原生手势处理 |
| 图表 | react-native-svg | 15.x | 自定义 SVG 图表 |
| 模糊 | expo-blur | 14.x | 玻璃态效果 |
| 渐变 | expo-linear-gradient | 14.x | Hero 区域渐变 |
| 日期 | date-fns | 4.x | 日期计算 |

## 项目结构

```
chiwu/
├── app/                              # expo-router 路由
│   ├── _layout.tsx                   # 根布局
│   ├── (tabs)/
│   │   ├── _layout.tsx               # Tab 布局 + 自定义 TabBar/FAB
│   │   ├── index.tsx                 # 首页：资产列表
│   │   ├── statistics.tsx            # 统计面板
│   │   └── settings.tsx              # 设置 & 分类管理
│   └── asset/
│       ├── [id].tsx                  # 资产详情
│       ├── add.tsx                   # 添加资产 (Modal)
│       └── edit/[id].tsx             # 编辑资产 (Modal)
├── src/
│   ├── theme/                        # 设计系统
│   │   ├── colors.ts                 # 暖灰陶土系配色
│   │   ├── spacing.ts                # 间距刻度 (4-24)
│   │   ├── typography.ts             # 字体系统
│   │   ├── shadows.ts                # 阴影预设
│   │   ├── radii.ts                  # 圆角刻度
│   │   └── index.tsx                 # ThemeProvider + useTheme()
│   ├── types/                        # TypeScript 类型
│   │   ├── asset.ts                  # Asset, AssetFormData, AssetWithCategory
│   │   ├── category.ts               # Category
│   │   ├── valuation.ts              # ValuationRecord
│   │   └── statistics.ts             # AssetStatistics, CategoryBreakdown
│   ├── db/                           # 数据持久层
│   │   ├── database.ts               # SQLite 初始化 + 迁移运行
│   │   ├── migrations.ts             # Schema 版本管理
│   │   ├── seed.ts                   # 默认分类
│   │   ├── seedDemoData.ts           # 演示数据
│   │   ├── assetRepository.ts        # 资产 CRUD
│   │   ├── categoryRepository.ts     # 分类 CRUD
│   │   └── valuationRepository.ts    # 估值记录 CRUD
│   ├── services/                     # 业务逻辑
│   │   ├── calculations.ts           # 日均成本、保值率、折旧、盈亏
│   │   └── formatters.ts             # 货币/日期/百分比格式化
│   ├── stores/                       # Zustand 状态管理
│   │   ├── useAssetStore.ts          # 资产列表 + CRUD 操作
│   │   ├── useFilterStore.ts         # 状态/分类筛选
│   │   └── useSettingsStore.ts       # 分类管理
│   ├── hooks/                        # 自定义 Hooks
│   │   ├── useAssets.ts              # 资产列表 + 筛选 + 排序
│   │   ├── useAssetDetail.ts         # 单资产详情 + 估值历史
│   │   ├── useCategories.ts          # 分类列表
│   │   ├── useStatistics.ts          # 聚合统计
│   │   └── useRefreshOnFocus.ts      # 焦点刷新
│   ├── components/
│   │   ├── ui/                       # 原子 UI 组件
│   │   │   ├── Box.tsx               # 布局基元 (padding/margin/shadow/radius)
│   │   │   ├── Text.tsx              # 文本预设 (h1/h2/body/mono/...)
│   │   │   ├── Button.tsx            # 按钮变体 (primary/danger/outline/ghost)
│   │   │   ├── Card.tsx              # 卡片容器
│   │   │   ├── Input.tsx             # 输入框
│   │   │   ├── Select.tsx            # 下拉选择触发
│   │   │   ├── Chip.tsx              # 筛选标签
│   │   │   ├── Badge.tsx             # 状态徽章
│   │   │   ├── Divider.tsx           # 分割线
│   │   │   └── Spacer.tsx            # 间距
│   │   ├── asset/                    # 资产领域组件
│   │   │   ├── AssetCard.tsx         # 资产卡片 (图标+名称+日均成本)
│   │   │   ├── AssetGrid.tsx         # 双列网格
│   │   │   ├── ValueCard.tsx         # 资产总值卡片
│   │   │   ├── PriceComparison.tsx   # 购入/当前价格对比
│   │   │   ├── StatsBox.tsx          # 统计数值框
│   │   │   ├── StatsGrid.tsx         # 统计网格布局
│   │   │   ├── AssetForm.tsx         # 添加/编辑表单
│   │   │   └── EmptyState.tsx        # 空状态占位
│   │   ├── charts/                   # SVG 图表
│   │   │   ├── ValueChangeChart.tsx  # 估值变化折线面积图
│   │   │   └── DonutChart.tsx        # 分类占比环形图
│   │   ├── navigation/               # 导航组件
│   │   │   ├── TabBar.tsx            # 浮动玻璃态 TabBar
│   │   │   ├── TabBarItem.tsx        # Tab 按钮
│   │   │   └── FAB.tsx               # 悬浮添加按钮
│   │   └── layout/                   # 布局组件
│   │       ├── ScreenContainer.tsx   # 屏幕容器
│   │       ├── HeroSection.tsx       # 渐变 Hero 区域
│   │       ├── FilterTabs.tsx        # 状态筛选标签
│   │       └── FilterChips.tsx       # 分类筛选标签
│   └── constants/                    # 常量
│       └── index.ts                  # 默认分类、状态标签
```

## 数据库 Schema

```sql
-- 分类表
CREATE TABLE categories (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    icon        TEXT NOT NULL,          -- emoji
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
);

-- 资产表
CREATE TABLE assets (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    category_id       TEXT NOT NULL,
    purchase_price    REAL NOT NULL CHECK(purchase_price >= 0),
    purchase_date     TEXT NOT NULL,    -- ISO 8601
    current_valuation REAL CHECK(current_valuation >= 0),
    sold_price        REAL,
    sold_date         TEXT,
    status            TEXT NOT NULL DEFAULT 'active'
                      CHECK(status IN ('active','retired','sold')),
    notes             TEXT DEFAULT '',
    created_at        TEXT DEFAULT (datetime('now','localtime')),
    updated_at        TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 估值历史表
CREATE TABLE valuations (
    id            TEXT PRIMARY KEY,
    asset_id      TEXT NOT NULL,
    value         REAL NOT NULL CHECK(value >= 0),
    recorded_date TEXT NOT NULL,
    note          TEXT DEFAULT '',
    created_at    TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);
```

## 界面导航

```
Root Stack Navigator
├── Tab Navigator (浮动玻璃 TabBar)
│   ├── 🏠 首页 — 资产列表 + 总览卡片 + 筛选
│   ├── 📊 统计 — 图表面板 + 分类明细
│   └── ⚙️ 设置 — 分类管理
└── 共享路由
    ├── /asset/[id]      → 资产详情 (push)
    ├── /asset/add        → 添加资产 (modal)
    └── /asset/edit/[id]  → 编辑资产 (modal)
```

## 核心业务逻辑

所有计算为纯函数，位于 `src/services/calculations.ts`：

| 指标 | 公式 | 说明 |
|------|------|------|
| 持有天数 | `max(diffDays(today, purchaseDate), 1)` | 至少为1天 |
| 日均成本 | `purchasePrice / daysUsed` | 购买价 ÷ 使用天数 |
| 保值率 | `(currentValuation / purchasePrice) × 100%` | 当前价值占购买价百分比 |
| 月均折旧 | `(purchasePrice - currentValuation) / max(monthsHeld, 1)` | 每月价值减少量 |
| 未实现盈亏 | `currentValuation - purchasePrice` | 持有资产的浮动盈亏 |
| 已实现盈亏 | `soldPrice - purchasePrice` | 卖出资产的确认盈亏 |

## 数据流

```
[SQLite DB]
    ↕ Repository 层 (CRUD 查询)
[Zustand Store]  (useAssetStore / useFilterStore / useSettingsStore)
    ↕ Custom Hooks (useAssets / useAssetDetail / useStatistics)
[React Components] → [UI 渲染]
```

1. 组件通过 custom hooks 获取数据
2. hooks 从 Zustand store 读取状态并应用客户端筛选
3. store 通过 repository 层与 SQLite 交互
4. 页面焦点变化时自动刷新数据（useRefreshOnFocus）

## 设计系统

视觉设计采用**暖灰陶土系**配色，包含以下关键视觉特征：

- **主色**：低饱和琥珀 `#b8956a`，用于品牌强调
- **背景**：暖白 `#f7f5f2`，纯白卡片 `#ffffff`
- **语义色**：灰绿成功、灰粉危险、暗金警告（均为降饱和版本）
- **字体**：系统 sans-serif (Inter/PingFang SC) + 等宽 SF Mono（数字）
- **圆角**：8-24px 梯度，全圆角用于胶囊/标签
- **阴影**：暖灰底色的柔和阴影（非纯黑）
- **玻璃态**：底部 TabBar 使用 blur + 半透明背景
- **渐变**：Hero 区域使用 160° 线性渐变 `#c9a97e → #8b6f4e → #6b5338`

## 依赖

```json
{
  "expo": "~56.0.0",
  "expo-router": "~4.0.0",
  "expo-sqlite": "~15.0.0",
  "expo-blur": "~14.0.0",
  "expo-linear-gradient": "~14.0.0",
  "react-native-reanimated": "~4.4.0",
  "react-native-gesture-handler": "~2.20.0",
  "react-native-safe-area-context": "~4.12.0",
  "react-native-screens": "~4.1.0",
  "react-native-svg": "~15.8.0",
  "zustand": "~5.0.0",
  "date-fns": "~4.1.0"
}
```

## 启动方式

```bash
npm install
npx expo start
# 然后按 i (iOS Simulator) 或 a (Android Emulator)
```
