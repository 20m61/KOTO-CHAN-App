#!/bin/bash

# ことちゃんバースデーアプリ用音声生成スクリプト
# AWS Pollyを使用して子供向けの優しい音声を生成

set -e

# カラー出力用の設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 出力ディレクトリ
SOUNDS_DIR="../public/sounds"
ANIMALS_DIR="${SOUNDS_DIR}/animals"
INSTRUMENTS_DIR="${SOUNDS_DIR}/instruments"
EFFECTS_DIR="${SOUNDS_DIR}/effects"
BACKGROUND_DIR="${SOUNDS_DIR}/background"

# 音声設定
# 日本語の子供向け音声として最も自然な声を使用
VOICE_ID="Kazuha"  # 日本語ニューラル音声（女性・優しい）
ENGINE="neural"    # ニューラルエンジン使用
LANGUAGE="ja-JP"   # 日本語
OUTPUT_FORMAT="mp3"
SAMPLE_RATE="22050"  # 子供向けアプリに適したサンプルレート

echo -e "${BLUE}🎵 ことちゃんバースデーアプリ用音声生成開始${NC}"
echo -e "${YELLOW}使用音声: ${VOICE_ID} (${ENGINE} engine)${NC}"

# AWS Pollyが利用可能かチェック
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLIが見つかりません${NC}"
    exit 1
fi

# 音声生成関数
generate_audio() {
    local text="$1"
    local output_file="$2"
    local category="$3"
    
    echo -e "${YELLOW}🔊 生成中: ${category} - ${text}${NC}"
    
    # テキストの前後にポーズを追加して自然な音声に
    local ssml_text="<speak><break time='0.5s'/>${text}<break time='0.5s'/></speak>"
    
    aws polly synthesize-speech \
        --output-format "${OUTPUT_FORMAT}" \
        --voice-id "${VOICE_ID}" \
        --engine "${ENGINE}" \
        --language-code "${LANGUAGE}" \
        --sample-rate "${SAMPLE_RATE}" \
        --text-type "ssml" \
        --text "${ssml_text}" \
        "${output_file}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 完了: ${output_file}${NC}"
    else
        echo -e "${RED}❌ 失敗: ${output_file}${NC}"
        return 1
    fi
}

# 1. 動物の鳴き声（オノマトペ）
echo -e "\n${BLUE}🐕 動物の鳴き声を生成${NC}"

generate_audio "わんわん" "${ANIMALS_DIR}/dog.mp3" "動物"
generate_audio "にゃーにゃー" "${ANIMALS_DIR}/cat.mp3" "動物"
generate_audio "ちゅんちゅん" "${ANIMALS_DIR}/bird.mp3" "動物"
generate_audio "もーもー" "${ANIMALS_DIR}/cow.mp3" "動物"

# 2. 楽器の音（オノマトペ）
echo -e "\n${BLUE}🎹 楽器の音を生成${NC}"

generate_audio "ピアノの音、ポローン" "${INSTRUMENTS_DIR}/piano.mp3" "楽器"
generate_audio "たいこの音、ドンドン" "${INSTRUMENTS_DIR}/drum.mp3" "楽器"
generate_audio "すずの音、リンリン" "${INSTRUMENTS_DIR}/bell.mp3" "楽器"
generate_audio "フルートの音、フワー" "${INSTRUMENTS_DIR}/flute.mp3" "楽器"

# 3. 効果音
echo -e "\n${BLUE}✨ 効果音を生成${NC}"

generate_audio "ポップ" "${EFFECTS_DIR}/pop.mp3" "効果音"
generate_audio "シュー" "${EFFECTS_DIR}/swoosh.mp3" "効果音"
generate_audio "チーン" "${EFFECTS_DIR}/chime.mp3" "効果音"
generate_audio "わはは、たのしいね" "${EFFECTS_DIR}/laugh.mp3" "効果音"

# 4. 誕生日・お祝い音声
echo -e "\n${BLUE}🎂 お祝い音声を生成${NC}"

generate_audio "おたんじょうび、おめでとう" "${BACKGROUND_DIR}/birthday-greeting.mp3" "お祝い"
generate_audio "たんたんたーん、おめでとう" "${BACKGROUND_DIR}/birthday-fanfare.mp3" "お祝い"
generate_audio "いち、にー、さん、おめでとう" "${BACKGROUND_DIR}/birthday-countdown.mp3" "お祝い"

# 5. UI音声
echo -e "\n${BLUE}🔘 UI音声を生成${NC}"

generate_audio "タップ" "${EFFECTS_DIR}/tap.mp3" "UI"
generate_audio "できました" "${EFFECTS_DIR}/success.mp3" "UI"
generate_audio "がんばって" "${EFFECTS_DIR}/encourage.mp3" "UI"

# 6. やさしいBGM風音声（ハミング）
echo -e "\n${BLUE}🎵 BGM風音声を生成${NC}"

# ハミング調のBGM
generate_audio "<prosody rate='slow' pitch='+2st'>らーらーらー、らーらーらー</prosody>" "${BACKGROUND_DIR}/album-bgm.mp3" "BGM"

# 音声ファイルの確認
echo -e "\n${BLUE}📂 生成された音声ファイル一覧${NC}"
find "${SOUNDS_DIR}" -name "*.mp3" -type f | sort

# ファイルサイズの確認
echo -e "\n${BLUE}📊 ファイルサイズ確認${NC}"
du -h "${SOUNDS_DIR}"/*.mp3 "${SOUNDS_DIR}"/*/*.mp3 2>/dev/null | sort -h

echo -e "\n${GREEN}🎉 音声生成完了！${NC}"
echo -e "${YELLOW}💡 tip: 音声の再生テストは以下のコマンドで可能です:${NC}"
echo -e "${YELLOW}   ffplay ${ANIMALS_DIR}/dog.mp3${NC}"