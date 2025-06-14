# 🎨 ことちゃんアプリ コンポーネントライブラリ

ことちゃんバースデーアプリで使用するUIコンポーネントライブラリです。1歳児向けに最適化されたデザインシステムを提供します。

## 📋 コンポーネント一覧

### 🔘 基本UIコンポーネント（`ui/`）

#### Button
標準的なボタンコンポーネント
- バリアント: `primary`, `secondary`, `ghost`
- サイズ: `small`, `medium`, `large`
- 子供向けタッチ最適化済み

#### CircleButton ⭐ **新規**
円形ボタンコンポーネント（メイン機能）
- サイズ: `small`(44px), `medium`(56px), `large`(72px), `xlarge`(96px)
- カラー: `pink`, `yellow`, `mint`, `blue`, `orange`, `purple`
- アイコン + ラベル対応
- ホバー・プレスアニメーション

#### Icon ⭐ **新規**
SVGアイコンコンポーネント
- 動物アイコン: `dog`, `cat`, `bird`, `cow`
- 楽器アイコン: `piano`, `drum`, `bell`, `flute`
- UIアイコン: `music`, `brush`, `photo`, `settings`
- 装飾アイコン: `star`, `heart`, `balloon`, `sparkle`

#### ColorPalette ⭐ **新規**
お絵描き用カラーパレット
- デフォルトで5色（ことちゃんカラー）
- サイズ調整可能
- 選択状態の管理

#### Loading ⭐ **新規**
ローディング表示コンポーネント
- `LoadingSpinner`: 回転アニメーション
- `LoadingScreen`: 全画面ローディング

#### Modal ⭐ **新規**
モーダルダイアログ
- ESCキー・オーバーレイクリックで閉じる
- ポータル使用でアクセシビリティ対応
- サイズバリエーション

#### Sparkles ⭐ **新規**
キラキラエフェクト
- ランダム配置のスパークル
- カスタマイズ可能な色・サイズ・数
- 誕生日演出用

### 🏗️ レイアウトコンポーネント（`layouts/`）

#### MainLayout
既存のメインレイアウト（誕生日エフェクト対応）

#### PageContainer ⭐ **新規**
ページ共通コンテナ
- 背景バリエーション: `default`, `gradient`, `stars`, `birthday`
- 装飾要素の自動配置
- 戻るボタン・タイトル対応
- 誕生日特別エフェクト

#### GridLayout ⭐ **新規**
グリッドレイアウト
- カラム数: 2, 3, 4
- レスポンシブ対応
- ギャップ調整可能

### 🎯 機能別コンポーネント（`features/`）

#### stamps/StampDisplay
既存のスタンプ表示コンポーネント

## 🎨 デザインシステム

### カラーパレット
```typescript
// ことちゃん専用カラー
kotochan: {
  cream: '#FFF8E7',      // 背景色
  brown: '#8B4513',      // テキスト色
  pink: '#FFB6C1',       // ピンク系
  mint: '#98FB98',       // ミント系
  yellow: '#FFE4B5',     // イエロー系
  blue: '#87CEEB',       // ブルー系
  orange: '#FFA500',     // オレンジ系
  purple: '#DDA0DD',     // パープル系
}
```

### タイポグラフィ
```typescript
// 子供向けフォントサイズ
'child-xs': ['14px', { lineHeight: '20px' }],
'child-sm': ['18px', { lineHeight: '24px' }],
'child-base': ['24px', { lineHeight: '32px' }],
'child-lg': ['32px', { lineHeight: '40px' }],
'child-xl': ['40px', { lineHeight: '48px' }],
'child-2xl': ['48px', { lineHeight: '56px' }],
'child-3xl': ['64px', { lineHeight: '72px' }],
```

### スペーシング
```typescript
// タッチターゲットサイズ
'touch-min': '44px',        // 最小
'touch-comfortable': '56px', // 快適
'touch-large': '72px',      // 大型
'touch-xl': '96px',         // 特大
```

### アニメーション
- `button-press`: ボタンプレス効果
- `button-hover`: ホバー効果
- `star-twinkle`: 星の瞬き
- `balloon-float`: 風船の浮遊
- `sparkle`: キラキラエフェクト

## 🚀 使用方法

### 基本的なインポート
```typescript
import { CircleButton, Icon, ColorPalette } from '@/components/ui';
import { PageContainer, GridLayout } from '@/components/layouts';
```

### CircleButton の使用例
```typescript
<CircleButton
  size="large"
  color="pink"
  icon={<Icon name="dog" />}
  label="いぬ"
  onClick={() => playSound('dog')}
/>
```

### PageContainer の使用例
```typescript
<PageContainer
  title="おとあそび"
  showBackButton
  background="stars"
  showBirthdayEffects={isBirthday}
>
  {children}
</PageContainer>
```

### GridLayout の使用例
```typescript
<GridLayout columns={3} gap="medium">
  <CircleButton ... />
  <CircleButton ... />
  <CircleButton ... />
</GridLayout>
```

## 🧪 テスト・プレビュー

デザインシステムの動作確認は以下のページで可能です：

```
/design-system
```

全コンポーネントのバリエーションとインタラクションを確認できます。

## 📱 モバイル最適化

- **最小タッチサイズ**: 44px以上
- **角丸**: 20px（子供に優しい）
- **フォント**: 丸ゴシック系
- **コントラスト**: WCAG AA準拠
- **アニメーション**: reduced-motionサポート

## 🎯 1歳児向け最適化

1. **大きなタッチターゲット**: 44px以上
2. **はっきりした色**: 高コントラスト
3. **丸い形状**: 安全で親しみやすい
4. **即座のフィードバック**: タップ時のアニメーション
5. **シンプルなアイコン**: 認識しやすいデザイン

## 🔧 開発ガイドライン

### 新しいコンポーネント作成時

1. **`components/ui/`** - 再利用可能な基本コンポーネント
2. **`components/layouts/`** - レイアウト専用コンポーネント
3. **`components/features/`** - 機能特化コンポーネント

### コンポーネント構造
```
ComponentName/
├── ComponentName.tsx      # メインコンポーネント
├── ComponentName.test.tsx # テストファイル（オプション）
└── index.ts              # エクスポート
```

### Props設計原則
- TypeScript型定義必須
- デフォルト値の設定
- `className`でのスタイル拡張対応
- アクセシビリティプロパティ（`aria-label`等）

このデザインシステムにより、ことちゃんが安全で楽しく遊べるアプリケーションを構築できます。