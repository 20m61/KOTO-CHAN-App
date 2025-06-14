# 🚀 ことちゃんバースデーアプリ 開発タスクリスト

## 🔴 Phase 1: コア機能ページ実装（最優先）

### 1.1 おとあそび機能（/sound-play）
- [ ] **1.1.1** `/app/sound-play/page.tsx` - メインページ作成
- [ ] **1.1.2** `/components/features/sound-play/SoundBoard.tsx` - 音声ボードコンポーネント
- [ ] **1.1.3** `/components/features/sound-play/SoundButton.tsx` - 個別音声ボタンコンポーネント
- [ ] **1.1.4** `/components/features/sound-play/SoundCategory.tsx` - カテゴリ切り替え機能
- [ ] **1.1.5** `/components/features/sound-play/SoundEffects.tsx` - 視覚エフェクト
- [ ] **1.1.6** `/lib/constants/sounds.ts` - 音声データ定義（12種類）
- [ ] **1.1.7** 音声ボードのレスポンシブ対応（3x4グリッド）
- [ ] **1.1.8** タッチ最適化（44px以上、角丸20px）
- [ ] **1.1.9** 同時再生防止機能実装

**推定工数**: 2-3日
**依存関係**: useSound hookは実装済み
**備考**: 音声ファイルなしでもUI完成可能

### 1.2 おえかき機能（/drawing）
- [ ] **1.2.1** `/app/drawing/page.tsx` - メインページ作成
- [ ] **1.2.2** `/components/features/drawing/DrawingCanvas.tsx` - Canvas描画コンポーネント
- [ ] **1.2.3** `/components/features/drawing/ColorPalette.tsx` - 色選択UI
- [ ] **1.2.4** `/components/features/drawing/BrushSettings.tsx` - ブラシサイズ調整
- [ ] **1.2.5** `/components/features/drawing/DrawingControls.tsx` - 保存/クリア/戻るボタン
- [ ] **1.2.6** `/components/features/drawing/SaveDialog.tsx` - 保存確認モーダル
- [ ] **1.2.7** `/lib/canvas/drawingEngine.ts` - Canvas描画エンジン
- [ ] **1.2.8** `/lib/canvas/touchHandler.ts` - マルチタッチ対応
- [ ] **1.2.9** `/lib/canvas/imageExport.ts` - 画像出力機能
- [ ] **1.2.10** 取り消し/やり直し機能（履歴管理）
- [ ] **1.2.11** レスポンシブCanvas（viewport適応）

**推定工数**: 3-4日  
**依存関係**: なし（Canvas APIネイティブ）
**備考**: 保存機能はローカルストレージで仮実装

### 1.3 アルバム機能（/album）
- [ ] **1.3.1** `/app/album/page.tsx` - メインページ作成
- [ ] **1.3.2** `/components/features/album/PhotoCarousel.tsx` - Embla Carouselメイン
- [ ] **1.3.3** `/components/features/album/PhotoSlide.tsx` - 個別スライドコンポーネント
- [ ] **1.3.4** `/components/features/album/AlbumControls.tsx` - 再生/一時停止/ナビゲーション
- [ ] **1.3.5** `/components/features/album/PhotoUpload.tsx` - 写真アップロード（管理者のみ）
- [ ] **1.3.6** `/components/features/album/BackgroundMusic.tsx` - BGM制御
- [ ] **1.3.7** Embla Carouselのセットアップと設定
- [ ] **1.3.8** 自動再生機能（5秒間隔、タッチで一時停止）
- [ ] **1.3.9** 無限ループスライド実装
- [ ] **1.3.10** Next.js Imageコンポーネント統合

**推定工数**: 2-3日
**依存関係**: Embla Carousel（package.jsonに追加必要）
**備考**: 初期データはモック画像で実装

---

## 🟡 Phase 2: おとなメニュー・API実装（高優先）

### 2.1 おとなメニュー機能（/admin）
- [ ] **2.1.1** `/app/admin/page.tsx` - 認証画面
- [ ] **2.1.2** `/app/admin/dashboard/page.tsx` - 管理ダッシュボード
- [ ] **2.1.3** `/app/admin/upload/page.tsx` - ファイルアップロード画面
- [ ] **2.1.4** `/components/features/admin/LoginForm.tsx` - 生年月日入力フォーム
- [ ] **2.1.5** `/components/features/admin/AdminDashboard.tsx` - 管理メニュー
- [ ] **2.1.6** `/components/features/admin/PhotoManager.tsx` - 写真管理UI
- [ ] **2.1.7** `/components/features/admin/SettingsManager.tsx` - アプリ設定UI
- [ ] **2.1.8** `/components/features/admin/UsageStats.tsx` - 使用統計表示
- [ ] **2.1.9** `/lib/auth/passwordAuth.ts` - 生年月日認証システム
- [ ] **2.1.10** `/lib/auth/sessionManager.ts` - セッション管理
- [ ] **2.1.11** `/lib/auth/middleware.ts` - 認証ミドルウェア

**推定工数**: 3-4日
**依存関係**: API Routes（並行開発可能）
**備考**: セッション管理は最初はクライアントサイドで実装

### 2.2 API Routes実装
- [ ] **2.2.1** `/app/api/auth/login/route.ts` - 認証API
- [ ] **2.2.2** `/app/api/auth/session/route.ts` - セッション確認API
- [ ] **2.2.3** `/app/api/upload/photos/route.ts` - 写真アップロードAPI
- [ ] **2.2.4** `/app/api/upload/drawings/route.ts` - 絵画保存API
- [ ] **2.2.5** `/app/api/album/photos/route.ts` - 写真一覧取得API
- [ ] **2.2.6** `/app/api/album/[id]/route.ts` - 個別写真操作API
- [ ] **2.2.7** `/app/api/settings/app/route.ts` - アプリ設定API
- [ ] **2.2.8** `/app/api/settings/usage/route.ts` - 使用統計API
- [ ] **2.2.9** `/types/api.ts` - APIレスポンス型定義
- [ ] **2.2.10** `/types/database.ts` - データベース型定義

**推定工数**: 2-3日
**依存関係**: Vercel KV/Blob設定
**備考**: 最初はモックデータで動作確認

### 2.3 Vercel KV統合
- [ ] **2.3.1** `/lib/storage/kvClient.ts` - KV接続クライアント
- [ ] **2.3.2** `/lib/storage/sessionStore.ts` - セッション管理
- [ ] **2.3.3** `/lib/storage/settingsStore.ts` - アプリ設定保存
- [ ] **2.3.4** `/lib/storage/statsStore.ts` - 使用統計保存
- [ ] **2.3.5** 環境変数設定（KV_REST_API_URL, KV_REST_API_TOKEN）
- [ ] **2.3.6** データスキーマ定義（AppSettings, UsageStats）
- [ ] **2.3.7** KVクライアントのエラーハンドリング
- [ ] **2.3.8** ローカル開発用のKVモック実装

**推定工数**: 1-2日
**依存関係**: Vercelプロジェクト設定
**備考**: 開発環境ではRedisローカルインスタンス使用

### 2.4 Vercel Blob統合
- [ ] **2.4.1** `/lib/blob/blobClient.ts` - Blob接続クライアント
- [ ] **2.4.2** `/lib/blob/imageUploader.ts` - 画像アップロード
- [ ] **2.4.3** `/lib/blob/imageOptimizer.ts` - 画像最適化
- [ ] **2.4.4** `/lib/blob/fileManager.ts` - ファイル管理
- [ ] **2.4.5** 環境変数設定（BLOB_READ_WRITE_TOKEN）
- [ ] **2.4.6** ファイル構造設計（/album-photos/, /drawings/）
- [ ] **2.4.7** 画像最適化パイプライン
- [ ] **2.4.8** EXIF削除処理（プライバシー保護）

**推定工数**: 1-2日
**依存関係**: Vercelプロジェクト設定
**備考**: 開発環境ではローカルファイルシステム使用

---

## 🟢 Phase 3: 音声システム・最適化（中優先）

### 3.1 音声ファイル追加
- [ ] **3.1.1** `/public/sounds/animals/` - 動物音声4種類
- [ ] **3.1.2** `/public/sounds/instruments/` - 楽器音声4種類
- [ ] **3.1.3** `/public/sounds/effects/` - 効果音4種類
- [ ] **3.1.4** `/public/sounds/background/album-bgm.mp3` - アルバムBGM
- [ ] **3.1.5** `/public/sounds/background/birthday-fanfare.mp3` - 誕生日音楽
- [ ] **3.1.6** 音声ファイルの圧縮最適化（MP3, 128kbps）
- [ ] **3.1.7** 音声ファイルの品質確認（子供向け適切性）
- [ ] **3.1.8** 音声プリロード機能実装

**推定工数**: 1-2日
**依存関係**: 音声素材の調達
**備考**: フリー音源またはオリジナル録音

### 3.2 音声管理システム拡張
- [ ] **3.2.1** `/lib/audio/audioManager.ts` - 音声管理メイン
- [ ] **3.2.2** `/lib/audio/soundEffects.ts` - 効果音制御
- [ ] **3.2.3** `/lib/audio/backgroundMusic.ts` - BGM制御
- [ ] **3.2.4** `/lib/audio/audioPreloader.ts` - 音声プリロード
- [ ] **3.2.5** 音声設定インターフェース実装
- [ ] **3.2.6** 音量調整機能（マスター、効果音、BGM）
- [ ] **3.2.7** 音声有効/無効切り替え
- [ ] **3.2.8** モバイル音声自動再生対応

**推定工数**: 2-3日
**依存関係**: 音声ファイル
**備考**: useSound hookは既に実装済み

### 3.3 パフォーマンス最適化
- [ ] **3.3.1** `/lib/optimization/imageCompressor.ts` - 画像圧縮
- [ ] **3.3.2** `/lib/optimization/formatConverter.ts` - AVIF/WebP変換
- [ ] **3.3.3** `/lib/optimization/responsiveImages.ts` - レスポンシブ画像
- [ ] **3.3.4** `/lib/optimization/lazyLoader.ts` - 遅延ローディング
- [ ] **3.3.5** Next.js Image最適化設定
- [ ] **3.3.6** 動的インポート実装（コード分割）
- [ ] **3.3.7** バンドルサイズ分析と最適化
- [ ] **3.3.8** Lighthouse監査と改善

**推定工数**: 2-3日
**依存関係**: 基本機能完成後
**備考**: Core Web Vitals最適化

---

## 🔵 Phase 4: 品質向上・テスト（低優先）

### 4.1 単体テスト実装
- [ ] **4.1.1** `/test/components/ui/Button.test.tsx` - Buttonコンポーネント
- [ ] **4.1.2** `/test/components/features/sound-play/` - 音声機能テスト
- [ ] **4.1.3** `/test/components/features/drawing/` - 描画機能テスト
- [ ] **4.1.4** `/test/components/features/album/` - アルバム機能テスト
- [ ] **4.1.5** `/test/hooks/useSound.test.ts` - 音声フックテスト
- [ ] **4.1.6** `/test/hooks/useBirthdayInfo.test.ts` - 誕生日計算テスト
- [ ] **4.1.7** `/test/lib/canvas/drawingEngine.test.ts` - 描画エンジンテスト
- [ ] **4.1.8** `/test/lib/auth/passwordAuth.test.ts` - 認証テスト
- [ ] **4.1.9** `/test/api/` - API Routeテスト
- [ ] **4.1.10** テストカバレッジ80%以上達成

**推定工数**: 3-4日
**依存関係**: 全機能実装完了後
**備考**: Vitestとtesting-library使用

### 4.2 E2Eテスト実装
- [ ] **4.2.1** `/e2e/home.spec.ts` - ホーム画面遷移テスト
- [ ] **4.2.2** `/e2e/sound-play.spec.ts` - 音声再生テスト
- [ ] **4.2.3** `/e2e/drawing.spec.ts` - 描画機能テスト
- [ ] **4.2.4** `/e2e/album.spec.ts` - アルバム表示テスト
- [ ] **4.2.5** `/e2e/admin.spec.ts` - 管理画面テスト
- [ ] **4.2.6** `/e2e/mobile.spec.ts` - モバイル特有テスト
- [ ] **4.2.7** `/e2e/birthday.spec.ts` - 誕生日演出テスト
- [ ] **4.2.8** クロスブラウザテスト（Chrome, Firefox, Safari）
- [ ] **4.2.9** モバイルデバイステスト（iOS, Android）
- [ ] **4.2.10** パフォーマンステスト（Lighthouse CI）

**推定工数**: 2-3日
**依存関係**: 単体テスト完了後
**備考**: Playwright使用、CI/CD統合

### 4.3 アクセシビリティ・PWA対応
- [ ] **4.3.1** ARIAラベル適切設定
- [ ] **4.3.2** キーボードナビゲーション対応
- [ ] **4.3.3** スクリーンリーダー対応
- [ ] **4.3.4** 色覚異常対応確認
- [ ] **4.3.5** 音声無効化対応
- [ ] **4.3.6** Service Worker実装
- [ ] **4.3.7** オフライン対応
- [ ] **4.3.8** Web App Manifest作成
- [ ] **4.3.9** PWAインストール機能
- [ ] **4.3.10** アクセシビリティ監査（axe-core）

**推定工数**: 2-3日
**依存関係**: 基本機能完成後
**備考**: WCAG 2.1 AA準拠目標

---

## 🔧 Phase 5: 追加機能・運用準備

### 5.1 高度な機能追加
- [ ] **5.1.1** スタンプ機能強化（アニメーション追加）
- [ ] **5.1.2** 誕生日ケーキコンポーネント改良
- [ ] **5.1.3** 描画機能にスタンプ追加
- [ ] **5.1.4** アルバムにスライドショーエフェクト追加
- [ ] **5.1.5** 音声機能にカスタム録音機能
- [ ] **5.1.6** 設定画面でテーマ切り替え
- [ ] **5.1.7** 使用統計の可視化
- [ ] **5.1.8** 家族メンバー機能
- [ ] **5.1.9** 成長記録機能
- [ ] **5.1.10** 誕生日カウントダウン機能

**推定工数**: 3-5日
**依存関係**: 基本機能完成後
**備考**: 要件に応じて選択実装

### 5.2 監視・分析設定
- [ ] **5.2.1** Vercel Analytics統合
- [ ] **5.2.2** エラー監視設定（Sentry代替）
- [ ] **5.2.3** パフォーマンス監視
- [ ] **5.2.4** 使用状況分析
- [ ] **5.2.5** セキュリティ監視
- [ ] **5.2.6** バックアップ設定
- [ ] **5.2.7** 障害対応手順書作成
- [ ] **5.2.8** 運用監視ダッシュボード
- [ ] **5.2.9** アラート設定
- [ ] **5.2.10** 定期メンテナンス計画

**推定工数**: 1-2日
**依存関係**: 本番環境設定
**備考**: 運用開始後の継続的な改善

### 5.3 ドキュメント・運用準備
- [ ] **5.3.1** ユーザーガイド作成
- [ ] **5.3.2** 管理者マニュアル作成
- [ ] **5.3.3** 運用手順書作成
- [ ] **5.3.4** トラブルシューティングガイド
- [ ] **5.3.5** API仕様書作成
- [ ] **5.3.6** セキュリティ監査実施
- [ ] **5.3.7** 負荷テスト実施
- [ ] **5.3.8** 本番環境デプロイ手順確認
- [ ] **5.3.9** ドメイン設定・SSL証明書
- [ ] **5.3.10** 運用開始準備完了

**推定工数**: 1-2日
**依存関係**: 全機能完成後
**備考**: 実際の運用開始前の最終確認

---

## 📊 進捗管理

### 完了基準
- [ ] 各タスクの動作確認完了
- [ ] コードレビュー実施
- [ ] テスト実行・合格
- [ ] ドキュメント更新

### 品質チェックリスト
- [ ] ESLint・Prettier実行
- [ ] TypeScriptエラーなし
- [ ] テストカバレッジ基準達成
- [ ] パフォーマンス基準達成
- [ ] アクセシビリティ基準達成
- [ ] セキュリティ要件満足

### 工数見積もり総計
- **Phase 1**: 7-10日（最優先）
- **Phase 2**: 7-11日（高優先）
- **Phase 3**: 5-8日（中優先）
- **Phase 4**: 7-10日（低優先）
- **Phase 5**: 5-9日（追加機能）

**総計**: 31-48日（約6-10週間）

---

この タスクリストに基づいて、段階的な開発を進めることで、ことちゃんの1歳の誕生日に向けて素晴らしいアプリケーションを完成させることができます。