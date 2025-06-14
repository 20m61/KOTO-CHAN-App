# 画像セットアップガイド

このガイドでは、ことちゃんアプリに必要な画像ファイルの準備と配置方法を説明します。

## 必要な画像ファイル

### 1. UIモックアップ画像
元ファイル: `kotochan_ui_mockups.zip`

**配置先**: `/public/images/ui/mockups/`

| 元のファイル名 | 新しいファイル名 | 用途 |
|-------------|--------------|-----|
| A_2D_digital_illustration_displays_a_home_screen_d.png | home_screen.png | ホーム画面のデザイン参考 |
| A_2D_digital_illustration_of_a_children's_"Sound_P.png | sound_play.png | おとあそび画面 |
| A_2D_digital_illustration_depicts_a_drawing_app_in.png | drawing.png | おえかき画面 |
| A_2D_digital_wireframe_design_of_an_album_or_photo.png | album.png | アルバム画面 |
| A_2D_digital_screenshot_of_a_secure_input_screen_d.png | password_input.png | パスワード入力画面 |
| A_2D_digital_illustration_celebrates_Koto-chan's_f.png | birthday_special.png | 誕生日特別演出 |
| A_wireframe_design_showcases_five_screens_for_a_mo.png | app_structure.png | アプリ全体構成図 |

### 2. あおちゃんスタンプ画像
元ファイル: スタンプシートから切り出し

**配置先**: `/public/images/stamps/ao/`

必要なスタンプ（各128x128px）:
- ao_hello.png - こんにちは！
- ao_goodnight.png - おやすみ〜
- ao_upset.png - ぷんぷん！
- ao_pet_me.png - なでて〜
- ao_love.png - だいすき♥
- ao_excuse_me.png - おわかし
- ao_yay.png - やったー！
- ao_birthday.png - おたんじょうび
- ao_thank_you.png - ありがとう
- ao_present.png - Present!
- ao_ok.png - OK!

**高解像度版配置先**: `/public/images/stamps/retina/ao/`
- 各ファイル名に`@2x`を追加（例: ao_hello@2x.png）
- サイズ: 256x256px

## セットアップ手順

### ステップ1: ディレクトリ構造の確認
```bash
# ディレクトリが作成されているか確認
ls -la public/images/
```

期待される構造:
```
public/images/
├── stamps/
│   ├── ao/
│   └── retina/
│       └── ao/
├── ui/
│   ├── mockups/
│   ├── icons/
│   └── backgrounds/
└── album/
    └── samples/
```

### ステップ2: モックアップ画像の配置
1. `kotochan_ui_mockups.zip`を解凍
2. 上記の対応表に従ってファイル名を変更
3. `/public/images/ui/mockups/`に配置

### ステップ3: スタンプ画像の切り出しと配置
1. スタンプシートの元画像を画像編集ソフトで開く
2. 各スタンプを個別に切り出し（背景透過）
3. 128x128pxにリサイズして通常版として保存
4. 256x256pxにリサイズして高解像度版として保存
5. 指定のディレクトリに配置

### ステップ4: 画像の最適化
```bash
# 画像最適化スクリプトの実行（実装予定）
pnpm optimize:images
```

## 画像フォーマットのガイドライン

### PNG画像
- スタンプ、アイコン: 透過背景必須
- 圧縮レベル: 最大（品質劣化なし）
- カラープロファイル: sRGB

### JPEG画像
- アルバム写真: 品質85-90%
- プログレッシブJPEG推奨
- EXIF情報は削除

### 画像サイズの目安
- アイコン: 64x64px〜128x128px
- スタンプ: 128x128px（通常）、256x256px（高解像度）
- 背景画像: 最大1920x1080px
- アルバム写真: 最大1200x1200px

## トラブルシューティング

### 画像が表示されない場合
1. ファイルパスが正しいか確認
2. ファイル名の大文字小文字を確認
3. ファイル拡張子が正しいか確認
4. Next.jsの画像最適化設定を確認

### 画像の読み込みが遅い場合
1. 画像サイズを確認（推奨サイズを超えていないか）
2. 画像フォーマットを確認（適切なフォーマットか）
3. Next.js Image コンポーネントを使用しているか確認
4. CDNキャッシュが有効か確認

## 今後の追加予定

- [ ] 画像自動最適化スクリプト
- [ ] スタンプ自動切り出しツール
- [ ] 画像アップロード機能
- [ ] 画像管理ダッシュボード

---

画像の準備で不明な点がありましたら、プロジェクトのissueで質問してください。