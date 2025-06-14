# 📱 ことちゃんバースデーアプリ

ことちゃん（1歳）の誕生日を特別にお祝いする、インタラクティブなWebアプリです。

## ✨ 特徴

- **1歳児向け設計**: タッチ操作に最適化された大きなボタンとシンプルなUI
- **誕生日演出**: 特別な日にはキラキラエフェクトと年齢表示
- **音あそび**: タッチで楽しい音が鳴る動物サウンドボード
- **お絵描き**: 指で描ける簡単なドローイング機能
- **アルバム**: 家族の思い出を音楽付きスライドショーで表示
- **あおちゃんスタンプ**: 可愛いキャラクタースタンプでインタラクション

## 🚀 クイックスタート

### 前提条件

- Node.js 20.0.0以上
- pnpm 8.0.0以上

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-org/koto-chan-app.git
cd koto-chan-app

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集して必要な値を設定

# 開発サーバーの起動
pnpm dev
```

ブラウザで http://localhost:3000 を開いてアプリにアクセスできます。

## 📁 プロジェクト構造

```
koto-chan-app/
├── app/                    # Next.js App Router
│   ├── (routes)/          # ルートグループ
│   ├── api/               # APIルート
│   ├── globals.css        # グローバルスタイル
│   └── layout.tsx         # ルートレイアウト
├── components/            # React コンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── features/         # 機能別コンポーネント
│   └── layouts/          # レイアウトコンポーネント
├── lib/                   # ユーティリティ・フック
│   ├── hooks/            # カスタムフック
│   ├── utils/            # ヘルパー関数
│   └── constants/        # 定数定義
├── public/               # 静的ファイル
│   ├── images/          # 画像ファイル
│   └── sounds/          # 音声ファイル
├── e2e/                  # E2Eテスト
├── test/                 # 単体テスト設定
└── docs/                 # ドキュメント
```

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リント実行
pnpm lint

# リント修正
pnpm lint:fix

# 型チェック
pnpm type-check

# フォーマット実行
pnpm format

# 単体テスト実行
pnpm test

# E2Eテスト実行
pnpm e2e

# カバレッジ付きテスト
pnpm test:coverage
```

## 🧪 テスト

### 単体テスト（Vitest）

```bash
# テスト実行
pnpm test

# ウォッチモード
pnpm test --watch

# UI付きテスト
pnpm test:ui
```

### E2Eテスト（Playwright）

```bash
# E2Eテスト実行
pnpm e2e

# UI付きテスト
pnpm e2e:ui

# 特定のブラウザでテスト
pnpm playwright test --project=chromium
```

## 🎨 スタイリング

- **Tailwind CSS**: ユーティリティファーストのCSS
- **CSS Modules**: コンポーネント固有のスタイル
- **Framer Motion**: アニメーション

### カスタムカラーパレット

```css
kotochan-cream: #FFF8E7  /* 背景 */
kotochan-brown: #8B4513  /* テキスト */
kotochan-pink:  #FFB6C1  /* アクセント1 */
kotochan-mint:  #98FB98  /* アクセント2 */
kotochan-yellow: #FFE4B5 /* ハイライト */
```

## 📱 画像セットアップ

詳細は [IMAGE_SETUP_GUIDE.md](./IMAGE_SETUP_GUIDE.md) を参照してください。

### 必要な画像ファイル

1. **UIモックアップ**: `kotochan_ui_mockups.zip`から抽出
2. **あおちゃんスタンプ**: スタンプシートから個別に切り出し
3. **アルバム写真**: 家族の思い出写真

## 🚀 デプロイ

### Vercelへのデプロイ

1. Vercelアカウントにログイン
2. GitHubリポジトリを接続
3. 環境変数を設定
4. 自動デプロイ開始

### 環境変数設定（本番環境）

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_CHILD_NAME=ことちゃん
NEXT_PUBLIC_BIRTHDAY=2024-06-18
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token
BLOB_READ_WRITE_TOKEN=your-blob-token
```

## 🔒 セキュリティ

- CSP（Content Security Policy）設定済み
- XSS攻撃対策
- 管理画面は生年月日による認証
- 画像アップロード時のファイル検証

## 📖 設計資料

詳細な設計資料は以下を参照してください：

- [詳細仕様書](./docs/KOTOCHAN_APP_SPECIFICATION.md)
- [画像セットアップガイド](./IMAGE_SETUP_GUIDE.md)

## 🤝 コントリビューション

1. フォークを作成
2. フィーチャーブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'feat: add amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/)に従ってください：

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: フォーマット変更
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

## 📜 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 💖 謝辞

ことちゃんの1歳の誕生日を特別にお祝いするために作られました。
家族みんなの愛情が込められたアプリです。

---

**Happy 1st Birthday, ことちゃん! 🎂✨**