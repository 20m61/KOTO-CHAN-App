#!/bin/bash

# サンプル音声ファイル設定スクリプト
# AWS Pollyが利用できない場合の代替手段

set -e

# カラー出力用の設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 出力ディレクトリ
SOUNDS_DIR="../public/sounds"

echo -e "${BLUE}🎵 サンプル音声ファイル設定開始${NC}"

# ディレクトリ作成
mkdir -p "${SOUNDS_DIR}"/{animals,instruments,effects,background}

# 無音ファイル（プレースホルダー）生成関数
create_placeholder_audio() {
    local file_path="$1"
    local duration="$2"
    local description="$3"
    
    echo -e "${YELLOW}📝 プレースホルダー作成: ${description}${NC}"
    
    # ffmpegが利用可能な場合は無音ファイルを生成
    if command -v ffmpeg &> /dev/null; then
        ffmpeg -f lavfi -i "anullsrc=channel_layout=mono:sample_rate=22050" -t "${duration}" -acodec mp3 -b:a 128k "${file_path}" -y &>/dev/null
        echo -e "${GREEN}✅ 生成完了: ${file_path} (${duration}秒)${NC}"
    else
        # ffmpegが無い場合はダミーファイル作成
        echo "# Placeholder audio file for ${description}" > "${file_path%.mp3}.txt"
        echo -e "${YELLOW}📄 テキストファイル作成: ${file_path%.mp3}.txt${NC}"
    fi
}

# 1. 動物の鳴き声プレースホルダー
echo -e "\n${BLUE}🐕 動物の鳴き声プレースホルダー作成${NC}"
create_placeholder_audio "${SOUNDS_DIR}/animals/dog.mp3" "1.5" "犬の鳴き声（わんわん）"
create_placeholder_audio "${SOUNDS_DIR}/animals/cat.mp3" "1.5" "猫の鳴き声（にゃーにゃー）"
create_placeholder_audio "${SOUNDS_DIR}/animals/bird.mp3" "2.0" "鳥のさえずり（ちゅんちゅん）"
create_placeholder_audio "${SOUNDS_DIR}/animals/cow.mp3" "2.0" "牛の鳴き声（もーもー）"

# 2. 楽器の音プレースホルダー
echo -e "\n${BLUE}🎹 楽器の音プレースホルダー作成${NC}"
create_placeholder_audio "${SOUNDS_DIR}/instruments/piano.mp3" "2.0" "ピアノ音（ポローン）"
create_placeholder_audio "${SOUNDS_DIR}/instruments/drum.mp3" "1.0" "ドラム音（ドンドン）"
create_placeholder_audio "${SOUNDS_DIR}/instruments/bell.mp3" "2.5" "鈴の音（リンリン）"
create_placeholder_audio "${SOUNDS_DIR}/instruments/flute.mp3" "3.0" "フルート音（フワー）"

# 3. 効果音プレースホルダー
echo -e "\n${BLUE}✨ 効果音プレースホルダー作成${NC}"
create_placeholder_audio "${SOUNDS_DIR}/effects/pop.mp3" "0.5" "ポップ音"
create_placeholder_audio "${SOUNDS_DIR}/effects/swoosh.mp3" "0.8" "スウッシュ音"
create_placeholder_audio "${SOUNDS_DIR}/effects/chime.mp3" "1.5" "チャイム音"
create_placeholder_audio "${SOUNDS_DIR}/effects/laugh.mp3" "2.0" "笑い声"
create_placeholder_audio "${SOUNDS_DIR}/effects/tap.mp3" "0.3" "タップ音"
create_placeholder_audio "${SOUNDS_DIR}/effects/success.mp3" "1.5" "成功音"
create_placeholder_audio "${SOUNDS_DIR}/effects/encourage.mp3" "2.0" "応援音"

# 4. BGM・お祝い音声プレースホルダー
echo -e "\n${BLUE}🎂 BGM・お祝い音声プレースホルダー作成${NC}"
create_placeholder_audio "${SOUNDS_DIR}/background/album-bgm.mp3" "10.0" "アルバムBGM"
create_placeholder_audio "${SOUNDS_DIR}/background/birthday-greeting.mp3" "3.0" "誕生日挨拶"
create_placeholder_audio "${SOUNDS_DIR}/background/birthday-fanfare.mp3" "5.0" "誕生日ファンファーレ"
create_placeholder_audio "${SOUNDS_DIR}/background/birthday-countdown.mp3" "4.0" "誕生日カウントダウン"

# 音声リスト作成
echo -e "\n${BLUE}📋 音声ファイルリスト作成${NC}"
cat > "${SOUNDS_DIR}/audio-files.json" << EOF
{
  "animals": [
    {
      "id": "dog",
      "name": "いぬ",
      "file": "/sounds/animals/dog.mp3",
      "description": "わんわん",
      "duration": 1.5
    },
    {
      "id": "cat", 
      "name": "ねこ",
      "file": "/sounds/animals/cat.mp3",
      "description": "にゃーにゃー",
      "duration": 1.5
    },
    {
      "id": "bird",
      "name": "とり", 
      "file": "/sounds/animals/bird.mp3",
      "description": "ちゅんちゅん",
      "duration": 2.0
    },
    {
      "id": "cow",
      "name": "うし",
      "file": "/sounds/animals/cow.mp3", 
      "description": "もーもー",
      "duration": 2.0
    }
  ],
  "instruments": [
    {
      "id": "piano",
      "name": "ピアノ",
      "file": "/sounds/instruments/piano.mp3",
      "description": "ポローン",
      "duration": 2.0
    },
    {
      "id": "drum",
      "name": "たいこ",
      "file": "/sounds/instruments/drum.mp3", 
      "description": "ドンドン",
      "duration": 1.0
    },
    {
      "id": "bell",
      "name": "すず",
      "file": "/sounds/instruments/bell.mp3",
      "description": "リンリン", 
      "duration": 2.5
    },
    {
      "id": "flute",
      "name": "フルート",
      "file": "/sounds/instruments/flute.mp3",
      "description": "フワー",
      "duration": 3.0
    }
  ],
  "effects": [
    {
      "id": "pop",
      "name": "ポップ",
      "file": "/sounds/effects/pop.mp3",
      "description": "ポップ音",
      "duration": 0.5
    },
    {
      "id": "swoosh", 
      "name": "スウッシュ",
      "file": "/sounds/effects/swoosh.mp3",
      "description": "スウッシュ音",
      "duration": 0.8
    },
    {
      "id": "chime",
      "name": "チャイム", 
      "file": "/sounds/effects/chime.mp3",
      "description": "チーン",
      "duration": 1.5
    },
    {
      "id": "laugh",
      "name": "わらい",
      "file": "/sounds/effects/laugh.mp3",
      "description": "わはは",
      "duration": 2.0
    }
  ],
  "background": [
    {
      "id": "album-bgm",
      "name": "アルバムBGM",
      "file": "/sounds/background/album-bgm.mp3",
      "description": "やさしい音楽",
      "duration": 10.0,
      "loop": true
    },
    {
      "id": "birthday-greeting",
      "name": "たんじょうびのうた",
      "file": "/sounds/background/birthday-greeting.mp3", 
      "description": "おめでとう",
      "duration": 3.0
    },
    {
      "id": "birthday-fanfare",
      "name": "ファンファーレ",
      "file": "/sounds/background/birthday-fanfare.mp3",
      "description": "たんたんたーん",
      "duration": 5.0
    }
  ]
}
EOF

echo -e "${GREEN}✅ 音声ファイルリスト作成完了: ${SOUNDS_DIR}/audio-files.json${NC}"

# 実際の音声取得方法を記載した手順書作成
cat > "${SOUNDS_DIR}/AUDIO_ACQUISITION_GUIDE.md" << 'EOF'
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
EOF

# ファイル一覧表示
echo -e "\n${BLUE}📂 作成されたファイル一覧${NC}"
find "${SOUNDS_DIR}" -type f | sort

# サイズ確認
echo -e "\n${BLUE}📊 ファイルサイズ確認${NC}"
du -sh "${SOUNDS_DIR}"

echo -e "\n${GREEN}🎉 サンプル音声ファイル設定完了！${NC}"
echo -e "${YELLOW}💡 次のステップ:${NC}"
echo -e "${YELLOW}   1. AWS Polly権限取得後、scripts/generate-audio.sh を実行${NC}"
echo -e "${YELLOW}   2. または public/sounds/AUDIO_ACQUISITION_GUIDE.md の手順に従って音声を取得${NC}"
echo -e "${YELLOW}   3. 音声ファイル配置後、アプリケーションで音声テスト${NC}"