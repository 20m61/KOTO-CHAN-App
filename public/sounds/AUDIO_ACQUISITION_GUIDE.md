# 🎵 実際の音声ファイル取得手順

## AWS Pollyを使用した音声生成（推奨）

### 前提条件
- AWS CLIの設定完了
- AWS Pollyの利用権限

### 生成コマンド
```bash
# 権限付与後に実行
cd scripts
./generate-audio.sh
```

## 代替手段 1: フリー音源サイト

### 推奨サイト
1. **効果音ラボ** (https://soundeffect-lab.info/)
   - 動物の鳴き声、楽器音
   - MP3形式でダウンロード可能

2. **魔王魂** (https://maou.audio/)
   - BGM、効果音
   - 商用利用可能

3. **DOVA-SYNDROME** (https://dova-s.jp/)
   - 高品質音源
   - 子供向け音楽多数

### ダウンロード手順
1. 上記サイトから適切な音声をダウンロード
2. 22.05kHz、128kbps MP3に変換
3. 該当ディレクトリに配置

## 代替手段 2: 他の音声合成サービス

### Google Text-to-Speech
```bash
# Google Cloud CLIを使用
gcloud text-to-speech synthesize-text "わんわん" \
  --output-file=dog.mp3 \
  --voice="ja-JP-Wavenet-A" \
  --audio-encoding=MP3
```

### オンライン音声合成
- VoiceText Web API
- CoeFont.studio
- ReadSpeaker

## 音声ファイル配置完了後の確認

### ファイル確認
```bash
find public/sounds -name "*.mp3" -type f | sort
```

### 音声テスト
```bash
# ffplayがある場合
ffplay public/sounds/animals/dog.mp3

# ブラウザでテスト
# http://localhost:3000/sounds/animals/dog.mp3
```

## 品質要件

- **フォーマット**: MP3
- **サンプルレート**: 22,050 Hz
- **ビットレート**: 128 kbps
- **ファイルサイズ**: 50KB以下
- **音量**: 統一されたレベル
