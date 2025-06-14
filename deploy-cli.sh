#!/bin/bash

# KOTO-CHAN App CLI Deploy Script
echo "🚀 KOTO-CHAN App デプロイスクリプト"
echo "=================================="

# Environment check
echo "📋 環境確認中..."
echo "Node.js: $(node --version)"
echo "Vercel CLI: $(vercel --version)"
echo "Git Status: $(git status --porcelain | wc -l) uncommitted files"

# Build check
echo ""
echo "🔨 プロダクションビルド確認..."
if pnpm build; then
    echo "✅ ビルド成功"
else
    echo "❌ ビルド失敗"
    exit 1
fi

echo ""
echo "🎯 デプロイ方法を選択してください："
echo "1. Vercel Token使用 (VERCEL_TOKEN環境変数が必要)"
echo "2. 対話型ログイン (ブラウザでの認証が必要)"
echo "3. GitHub Actions経由 (CI/CDセットアップ)"
echo ""

# Check for token-based deployment
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🔑 VERCEL_TOKEN検出 - トークンベースデプロイを実行..."
    vercel --token "$VERCEL_TOKEN" --prod --confirm
elif [ "$1" = "--interactive" ]; then
    echo "🔐 対話型デプロイを開始..."
    echo "ブラウザでの認証が必要です"
    vercel login
    vercel --prod
else
    echo "⚠️  デプロイ方法を指定してください："
    echo ""
    echo "# トークンベースデプロイ (推奨)"
    echo "export VERCEL_TOKEN=your_token_here"
    echo "./deploy-cli.sh"
    echo ""
    echo "# 対話型デプロイ"
    echo "./deploy-cli.sh --interactive"
    echo ""
    echo "# または手動でVercelダッシュボードを使用："
    echo "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F20m61%2FKOTO-CHAN-App"
fi

echo ""
echo "🎂 ことちゃんの1歳バースデーアプリ準備完了！"