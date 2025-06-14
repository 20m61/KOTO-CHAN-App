# スタンプ画像ディレクトリ

## ディレクトリ構造

```
stamps/
├── ao/                    # あおちゃんスタンプ（通常解像度）
│   ├── ao_hello.png      # こんにちは！
│   ├── ao_goodnight.png  # おやすみ〜
│   ├── ao_upset.png      # ぷんぷん！
│   ├── ao_pet_me.png     # なでて〜
│   ├── ao_love.png       # だいすき♥
│   ├── ao_excuse_me.png  # おわかし
│   ├── ao_yay.png        # やったー！
│   ├── ao_birthday.png   # おたんじょうび
│   ├── ao_thank_you.png  # ありがとう
│   ├── ao_present.png    # Present!
│   └── ao_ok.png         # OK!
└── retina/               # 高解像度版（@2x）
    └── ao/
        ├── ao_hello@2x.png
        ├── ao_goodnight@2x.png
        ├── ao_upset@2x.png
        ├── ao_pet_me@2x.png
        ├── ao_love@2x.png
        ├── ao_excuse_me@2x.png
        ├── ao_yay@2x.png
        ├── ao_birthday@2x.png
        ├── ao_thank_you@2x.png
        ├── ao_present@2x.png
        └── ao_ok@2x.png
```

## 画像仕様

### 通常解像度版
- サイズ: 128x128px
- フォーマット: PNG（透過背景）
- ファイル名: `ao_[name].png`

### 高解像度版（Retina対応）
- サイズ: 256x256px
- フォーマット: PNG（透過背景）
- ファイル名: `ao_[name]@2x.png`

## 切り出し手順

1. 元画像を開く
2. 各スタンプを選択して切り出し
3. 背景を透明にする
4. 指定サイズにリサイズ
5. 最適化して保存

## 最適化

画像は以下のツールで最適化してください：
- `pnpm imagemin` - 自動最適化スクリプト
- オンラインツール: TinyPNG, Squoosh