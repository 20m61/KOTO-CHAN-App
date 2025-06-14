# 📋 ことちゃんバースデーアプリ 詳細開発計画書

## 現状分析（2024年6月14日時点）

### ✅ 実装済み機能
- **基盤アーキテクチャ**: Next.js 14 + TypeScript + Tailwind CSS
- **ホーム画面**: 完全実装済み（誕生日検出、アニメーション付きナビゲーション）
- **デザインシステム**: カスタムカラーパレット、アニメーション、タイポグラフィ
- **コンポーネント基盤**: Button、MainLayout、StampDisplay
- **音声システム基盤**: Howler.js統合、useSound hook
- **スタンプシステム**: 11種類のao-chanスタンプデータ定義
- **開発環境**: 完全な品質管理ツール（ESLint、Prettier、Husky、テスト）

### ❌ 実装が必要な機能
1. **おとあそび画面** (`/sound-play`) - 音声再生UI
2. **おえかき画面** (`/drawing`) - Canvas描画機能
3. **アルバム画面** (`/album`) - 写真スライドショー
4. **おとなメニュー画面** (`/admin`) - 認証と管理機能
5. **API Route全体** - データ永続化とファイルアップロード
6. **音声ファイル** - 実際の音声アセット

---

## 詳細技術実装計画

### Phase 1: コア機能ページ実装（優先度：高）

#### 1.1 おとあそび機能（/sound-play）
**目標**: タッチしやすい音声ボードの実装

```typescript
// 実装ファイル構造
app/sound-play/page.tsx              // メインページ
components/features/sound-play/
  ├── SoundBoard.tsx                 // 音声ボードメイン
  ├── SoundButton.tsx                // 個別音声ボタン
  ├── SoundCategory.tsx              // カテゴリ別表示
  └── SoundEffects.tsx               // 視覚エフェクト

// 必要な音声ファイル
public/sounds/animals/               // 動物の鳴き声
public/sounds/instruments/           // 楽器音
public/sounds/effects/               // 効果音
```

**実装詳細**:
- グリッドレイアウト（3x4）で12個の音声ボタン
- 各ボタン：最小44px、角丸20px、タップ時の bounce アニメーション
- カテゴリ切り替え：動物、楽器、効果音
- 同時再生防止機能

#### 1.2 おえかき機能（/drawing）
**目標**: タッチ描画とCanvasAPI活用

```typescript
// 実装ファイル構造
app/drawing/page.tsx                 // メインページ
components/features/drawing/
  ├── DrawingCanvas.tsx              // Canvas描画エリア
  ├── ColorPalette.tsx               // 色選択
  ├── BrushSettings.tsx              // ブラシサイズ
  ├── DrawingControls.tsx            // 保存/クリア/戻る
  └── SaveDialog.tsx                 // 保存確認モーダル

// Canvas API実装
lib/canvas/
  ├── drawingEngine.ts               // 描画エンジン
  ├── touchHandler.ts                // タッチイベント処理
  └── imageExport.ts                 // 画像出力
```

**実装詳細**:
- レスポンシブCanvas（viewport適応）
- マルチタッチ対応（誤操作防止）
- 取り消し/やり直し機能（履歴管理）
- 画像保存時のVercelBlob統合

#### 1.3 アルバム機能（/album）
**目標**: 家族写真の美しいスライドショー

```typescript
// 実装ファイル構造
app/album/page.tsx                   // メインページ
components/features/album/
  ├── PhotoCarousel.tsx              // Embla Carouselメイン
  ├── PhotoSlide.tsx                 // 個別スライド
  ├── AlbumControls.tsx              // 再生/一時停止/進む/戻る
  ├── PhotoUpload.tsx                // 写真アップロード（管理者のみ）
  └── BackgroundMusic.tsx            // BGM制御

// 画像最適化
lib/image/
  ├── imageOptimizer.ts              // 画像リサイズ・圧縮
  ├── thumbnailGenerator.ts          // サムネイル生成
  └── metadataExtractor.ts           // EXIF削除・メタデータ
```

**実装詳細**:
- Embla Carousel での無限ループスライド
- 自動再生（5秒間隔、タッチで一時停止）
- BGM再生（音量調整可能）
- Next.js Image コンポーネントでの最適化

#### 1.4 おとなメニュー機能（/admin）
**目標**: 簡単認証での管理画面

```typescript
// 実装ファイル構造
app/admin/
  ├── page.tsx                       // 認証画面
  ├── dashboard/page.tsx             // 管理ダッシュボード
  └── upload/page.tsx                // ファイルアップロード

components/features/admin/
  ├── LoginForm.tsx                  // 誕生日入力フォーム
  ├── AdminDashboard.tsx             // 管理メニュー
  ├── PhotoManager.tsx               // 写真管理
  ├── SettingsManager.tsx            // アプリ設定
  └── UsageStats.tsx                 // 使用統計表示

// 認証システム
lib/auth/
  ├── passwordAuth.ts                // 生年月日認証
  ├── sessionManager.ts              // セッション管理
  └── middleware.ts                  // 認証ミドルウェア
```

**実装詳細**:
- 生年月日入力での認証（YYYY-MM-DD形式）
- セッション管理（1時間有効）
- ファイルアップロード（ドラッグ&ドロップ対応）
- 使用統計表示（各機能の使用頻度）

### Phase 2: API・データ層実装（優先度：高）

#### 2.1 APIルート設計

```typescript
// API構造
app/api/
├── auth/
│   ├── login/route.ts               // 認証API
│   └── session/route.ts             // セッション確認
├── upload/
│   ├── photos/route.ts              // 写真アップロード
│   └── drawings/route.ts            // 絵画保存
├── album/
│   ├── photos/route.ts              // 写真一覧取得
│   └── [id]/route.ts                // 個別写真操作
└── settings/
    ├── app/route.ts                 // アプリ設定
    └── usage/route.ts               // 使用統計

// データ型定義
types/api.ts                         // API レスポンス型
types/database.ts                    // データベース型
```

#### 2.2 Vercel KV統合

```typescript
// データストア設計
lib/storage/
├── kvClient.ts                      // KV接続クライアント
├── sessionStore.ts                  // セッション管理
├── settingsStore.ts                 // アプリ設定保存
└── statsStore.ts                    // 使用統計

// データスキーマ
interface AppSettings {
  childName: string;                 // 子供の名前
  birthday: string;                  // 誕生日
  theme: 'default' | 'custom';       // テーマ設定
  soundEnabled: boolean;             // 音声ON/OFF
  albumAutoPlay: boolean;            // アルバム自動再生
  backgroundMusicVolume: number;     // BGM音量
}

interface UsageStats {
  soundPlay: number;                 // おとあそび使用回数
  drawing: number;                   // おえかき使用回数
  album: number;                     // アルバム表示回数
  lastAccess: string;                // 最終アクセス日時
}
```

#### 2.3 Vercel Blob統合

```typescript
// ファイルストレージ設計
lib/blob/
├── blobClient.ts                    // Blob接続クライアント
├── imageUploader.ts                 // 画像アップロード
├── imageOptimizer.ts                // 画像最適化
└── fileManager.ts                   // ファイル管理

// ファイル構造
/album-photos/
  ├── originals/                     // オリジナル画像
  ├── thumbnails/                    // サムネイル
  └── optimized/                     // 最適化済み

/drawings/
  ├── {date}/                        // 日付別フォルダ
  └── thumbnails/                    // 描画サムネイル
```

### Phase 3: 音声システム実装（優先度：中）

#### 3.1 音声ファイル構造

```
public/sounds/
├── animals/
│   ├── dog.mp3                      // 犬の鳴き声
│   ├── cat.mp3                      // 猫の鳴き声
│   ├── bird.mp3                     // 鳥のさえずり
│   └── cow.mp3                      // 牛の鳴き声
├── instruments/
│   ├── piano.mp3                    // ピアノ音
│   ├── drum.mp3                     // ドラム音
│   ├── bell.mp3                     // 鈴の音
│   └── flute.mp3                    // フルート音
├── effects/
│   ├── pop.mp3                      // ポップ音
│   ├── swoosh.mp3                   // スウッシュ音
│   ├── chime.mp3                    // チャイム音
│   └── laugh.mp3                    // 笑い声
└── background/
    ├── album-bgm.mp3                // アルバムBGM
    └── birthday-fanfare.mp3         // 誕生日ファンファーレ
```

#### 3.2 音声管理システム

```typescript
// 音声システム拡張
lib/audio/
├── audioManager.ts                  // 音声管理メイン
├── soundEffects.ts                  // 効果音制御
├── backgroundMusic.ts               // BGM制御
└── audioPreloader.ts                // 音声プリロード

// 音声設定
interface AudioSettings {
  masterVolume: number;              // マスター音量
  effectsVolume: number;             // 効果音音量
  musicVolume: number;               // BGM音量
  enabled: boolean;                  // 音声有効/無効
}
```

### Phase 4: パフォーマンス最適化（優先度：中）

#### 4.1 画像最適化戦略

```typescript
// 画像最適化実装
lib/optimization/
├── imageCompressor.ts               // 画像圧縮
├── formatConverter.ts               // フォーマット変換（AVIF/WebP）
├── responsiveImages.ts              // レスポンシブ画像生成
└── lazyLoader.ts                    // 遅延ローディング

// Next.js Image最適化設定
next.config.js:
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  }
```

#### 4.2 バンドル最適化

```typescript
// コード分割戦略
app/
├── layout.tsx                       // 基本レイアウト
├── page.tsx                         // ホーム（常時ロード）
├── sound-play/page.tsx              // 動的インポート
├── drawing/page.tsx                 // 動的インポート
├── album/page.tsx                   // 動的インポート
└── admin/page.tsx                   // 動的インポート

// 動的インポート実装例
const DrawingCanvas = dynamic(
  () => import('@/components/features/drawing/DrawingCanvas'),
  { 
    loading: () => <LoadingSpinner />,
    ssr: false  // Canvas API使用のためSSR無効
  }
);
```

### Phase 5: テスト実装（優先度：中）

#### 5.1 単体テスト（Vitest）

```typescript
// テスト構造
test/
├── components/
│   ├── ui/Button.test.tsx           // UIコンポーネント
│   └── features/                    // 機能別コンポーネント
├── hooks/
│   ├── useSound.test.ts             // カスタムフック
│   └── useBirthdayInfo.test.ts      // 誕生日計算
├── lib/
│   ├── canvas/drawingEngine.test.ts // 描画エンジン
│   └── auth/passwordAuth.test.ts    // 認証システム
└── api/
    └── upload/photos.test.ts        // API Route
```

#### 5.2 E2Eテスト（Playwright）

```typescript
// E2Eテストシナリオ
e2e/
├── home.spec.ts                     // ホーム画面遷移
├── sound-play.spec.ts               // 音声再生テスト
├── drawing.spec.ts                  // 描画機能テスト
├── album.spec.ts                    // アルバム表示テスト
└── admin.spec.ts                    // 管理画面テスト

// モバイルテスト設定
playwright.config.ts:
  projects: [
    { name: 'Mobile Chrome', use: devices['Pixel 5'] },
    { name: 'Mobile Safari', use: devices['iPhone 12'] },
  ]
```

---

## 開発優先順位とスケジュール

### 🔴 最優先（週1-2）
1. **おとあそび画面実装** - 音声ボードUI（音声ファイルなしでもUI完成）
2. **おえかき画面実装** - Canvas描画機能
3. **アルバム画面実装** - 基本スライドショー機能

### 🟡 高優先（週3）
4. **API Route実装** - 認証、アップロード、設定API
5. **おとなメニュー実装** - 認証と基本管理機能
6. **Vercel KV/Blob統合** - データ永続化

### 🟢 中優先（週4）
7. **音声ファイル追加** - 実際の音声アセット
8. **パフォーマンス最適化** - 画像圧縮、バンドル最適化
9. **テスト実装** - 単体テスト、E2Eテスト

### 🔵 低優先（週5以降）
10. **高度な機能追加** - アニメーション強化、PWA対応
11. **監視・分析設定** - Vercel Analytics統合
12. **ドキュメント整備** - ユーザーガイド、運用手順

---

## 技術的考慮事項

### セキュリティ
- CSP（Content Security Policy）によるXSS防止
- ファイルアップロード時のMIMEタイプ検証
- EXIF情報自動削除（プライバシー保護）
- セッションタイムアウト（1時間）

### パフォーマンス
- Next.js Image Optimizationの活用
- 動的インポートによるコード分割
- Vercel Edge Functionsでのグローバル配信
- 音声ファイルの圧縮とプリロード

### アクセシビリティ
- 最小タッチターゲット44px以上
- 適切なARIAラベル設定
- キーボードナビゲーション対応
- 色覚異常対応（カラーパレット選択）

### モバイル最適化
- タッチジェスチャー最適化
- バッテリー使用量への配慮
- オフライン対応（Service Worker）
- 画面サイズ適応（320px〜1200px）

---

この詳細計画に基づいて段階的な開発を進めることで、安全で楽しい1歳児向けアプリケーションを完成させることができます。