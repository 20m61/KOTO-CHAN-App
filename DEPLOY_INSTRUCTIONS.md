# 🚀 KOTO-CHAN App デプロイ実行手順

## 📋 現在の状況

- ✅ コード: GitHub同期済み (https://github.com/20m61/KOTO-CHAN-App)
- ✅ ビルド: プロダクション成功
- ✅ セキュリティ: 脆弱性0件
- ✅ PWA: 完全対応
- ✅ 設定: 最適化完了

## 🎯 **STEP 1: Vercelダッシュボードアクセス**

### 1.1 ブラウザでアクセス

```
https://vercel.com/dashboard
```

### 1.2 GitHubでログイン

- "Continue with GitHub" をクリック
- GitHubアカウントでサインイン

## 🎯 **STEP 2: プロジェクトインポート**

### 2.1 新規プロジェクト作成

- **Dashboard** → **"New Project"** をクリック

### 2.2 GitHubリポジトリ選択

- **"Import Git Repository"** タブを選択
- リポジトリ検索: `20m61/KOTO-CHAN-App`
- **"Import"** をクリック

## 🎯 **STEP 3: プロジェクト設定**

### 3.1 基本設定（自動検出）

```
Project Name: koto-chan-app
Framework Preset: Next.js ✅
Root Directory: ./ (デフォルト) ✅
```

### 3.2 ビルド設定（自動設定）

```
Build Command: pnpm build ✅
Output Directory: .next ✅
Install Command: pnpm install ✅
```

### 3.3 環境変数設定

**"Environment Variables"** セクションで追加:

```
Key: KOTO_BIRTH_DATE
Value: 2024-06-14
Environment: Production
```

## 🎯 **STEP 4: デプロイ実行**

### 4.1 デプロイ開始

- **"Deploy"** ボタンをクリック
- 自動ビルド開始（約2-3分）

### 4.2 デプロイ進行確認

```
📦 Installing dependencies... (pnpm install)
🔨 Building application... (pnpm build)
🚀 Deploying to production...
✅ Deployment successful!
```

## 🎯 **STEP 5: デプロイ完了確認**

### 5.1 URL確認

デプロイ完了後、以下URLが生成されます:

```
🌐 Production: https://koto-chan-app.vercel.app
🔗 Preview: https://koto-chan-app-git-main.vercel.app
```

### 5.2 基本機能テスト

- [ ] ホームページ表示
- [ ] 音声再生機能
- [ ] お絵かき機能
- [ ] フォトアルバム機能
- [ ] PWAインストール

## 🛠 **トラブルシューティング**

### ビルドエラーが発生した場合

```bash
# ローカルでビルド確認
pnpm build

# 依存関係の問題
pnpm install --frozen-lockfile
```

### 環境変数が反映されない場合

1. Vercel Dashboard → Project → Settings → Environment Variables
2. `KOTO_BIRTH_DATE=2024-06-14` を確認
3. Redeploy実行

## 🎉 **デプロイ成功後**

### 🔗 各種URL

- **アプリ**: https://koto-chan-app.vercel.app
- **管理画面**: https://koto-chan-app.vercel.app/admin
- **API**: https://koto-chan-app.vercel.app/api/*
- **GitHub**: https://github.com/20m61/KOTO-CHAN-App

### 📱 PWAインストール

1. モバイルブラウザでアクセス
2. "ホーム画面に追加" プロンプト表示
3. アプリとしてインストール完了

## 🎂 **完成！**

**ことちゃんの1歳のお誕生日を祝う特別なアプリが完成しました！**

---

最終更新: 2025-06-14
