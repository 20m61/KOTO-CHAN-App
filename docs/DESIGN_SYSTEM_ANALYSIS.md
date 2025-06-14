# 🎨 デザインシステム分析書

## モック画像分析結果

### 全体的なデザイン特徴

#### 1. カラーパレット
- **背景**: クリーム色（#FFF8E7系）
- **アクセント**: パステルカラー
  - ピンク (#FFB6C1)
  - イエロー (#FFE4B5) 
  - ミント (#98FB98)
  - ブルー (#87CEEB)
  - オレンジ (#FFA500)
- **テキスト**: ダークブラウン (#8B4513)

#### 2. タイポグラフィ
- **フォント**: 丸ゴシック系（読みやすい）
- **ひらがな中心**: 1歳児向け
- **大きめのサイズ**: 視認性重視
- **太めのウェイト**: はっきり見える

#### 3. 形状・レイアウト
- **円形ボタン**: 大きな丸いボタン（タッチしやすい）
- **角丸**: 全ての要素で統一（20px程度）
- **余白**: ゆったりとした配置
- **グリッド**: 規則的な配置

#### 4. 装飾要素
- **星**: 散りばめられた小さな星
- **ハート**: アクセント装飾
- **風船**: 誕生日演出
- **キラキラ**: 特別感を演出

### 画面別デザインパターン

#### ホーム画面
- 中央配置の大きな円形ボタン（3つ）
- 上部にタイトル「ことちゃん 1さいのたんじょうび」
- 背景に装飾要素（星、ハート）
- 左上にロックアイコン

#### サウンドプレイ画面
- グリッドレイアウト（2x3の6個ボタン）
- 各ボタンに動物アイコン
- 英語の音（Woof, Moo, Quack等）
- カラフルな配色

#### 描画画面
- 大きな白いキャンバス
- 下部にカラーパレット（5色の円）
- 上部に「おえかき」タイトル
- 背景に小さな装飾

#### 誕生日画面
- ケーキのイラスト中央配置
- 風船とキラキラエフェクト
- 「おめでとう！」メッセージ
- 下部に機能ボタン（3つ）

## デザインコンポーネント設計

### 1. 基本コンポーネント

#### Button（円形ボタン）
```typescript
interface CircleButtonProps {
  size: 'small' | 'medium' | 'large' | 'xlarge';
  color: 'pink' | 'yellow' | 'mint' | 'blue' | 'orange';
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

#### Icon（アイコン）
- 動物アイコン（犬、猫、牛、鳥等）
- UI アイコン（音楽、絵筆、写真等）
- 装飾アイコン（星、ハート等）

#### Typography
- タイトル（大見出し）
- サブタイトル（中見出し）
- ボタンラベル（小）

### 2. レイアウトコンポーネント

#### PageContainer
- 全画面共通のコンテナ
- 背景色とパディング
- 装飾要素の配置

#### GridLayout
- サウンドボタンのグリッド
- レスポンシブ対応

#### CenterLayout
- 中央配置レイアウト
- ホーム画面等で使用

### 3. 装飾コンポーネント

#### Background
- 星やハートの散布
- アニメーション付き

#### Sparkles
- キラキラエフェクト
- 誕生日演出用

#### FloatingElements
- 風船やその他の浮遊要素

## 実装優先度

### 🔴 最優先
1. **CircleButton** - 基本的な円形ボタン
2. **PageContainer** - 共通レイアウト
3. **Typography** - テキストスタイル
4. **ColorPalette** - 描画用カラーパレット

### 🟡 高優先
5. **GridLayout** - サウンドボードレイアウト
6. **Icon** - 各種アイコン
7. **Background** - 装飾背景
8. **CenterLayout** - 中央配置

### 🟢 中優先
9. **Sparkles** - エフェクト
10. **FloatingElements** - アニメーション装飾
11. **BirthdayCake** - ケーキコンポーネント
12. **LoadingSpinner** - ローディング

これらのコンポーネントを順次実装していきます。