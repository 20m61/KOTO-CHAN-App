# 🎵 音声ファイル仕様書

## 概要
ことちゃんバースデーアプリで使用する音声ファイルの仕様と生成方法を記載します。

## 音声ファイル構造

```
public/sounds/
├── animals/          # 動物の鳴き声
│   ├── dog.mp3      # わんわん（犬）
│   ├── cat.mp3      # にゃーにゃー（猫）
│   ├── bird.mp3     # ちゅんちゅん（鳥）
│   └── cow.mp3      # もーもー（牛）
├── instruments/      # 楽器の音
│   ├── piano.mp3    # ピアノ（ポローン）
│   ├── drum.mp3     # たいこ（ドンドン）
│   ├── bell.mp3     # すず（リンリン）
│   └── flute.mp3    # フルート（フワー）
├── effects/          # 効果音
│   ├── pop.mp3      # ポップ音
│   ├── swoosh.mp3   # スウッシュ音
│   ├── chime.mp3    # チャイム音
│   ├── laugh.mp3    # 笑い声
│   ├── tap.mp3      # タップ音
│   ├── success.mp3  # 成功音
│   └── encourage.mp3 # 応援音
└── background/       # BGM・お祝い音声
    ├── album-bgm.mp3         # アルバムBGM
    ├── birthday-greeting.mp3 # 誕生日挨拶
    ├── birthday-fanfare.mp3  # 誕生日ファンファーレ
    └── birthday-countdown.mp3 # カウントダウン
```

## 音声仕様

### 技術仕様
- **フォーマット**: MP3
- **サンプルレート**: 22,050 Hz（子供向けアプリに最適）
- **ビットレート**: 128 kbps
- **チャンネル**: モノラル
- **ファイルサイズ**: 50KB以下（ロード時間短縮）

### 音声品質要件
- **音量**: 統一されたレベル（ラウドネス正規化）
- **長さ**: 1-3秒（効果音）、5-10秒（BGM）
- **音質**: クリアで歪みのない音質
- **子供向け**: 優しく、驚かせない音量とトーン

## AWS Polly音声生成設定

### 推奨設定
```bash
VOICE_ID="Kazuha"     # 日本語ニューラル音声（女性・優しい）
ENGINE="neural"       # ニューラルエンジン使用
LANGUAGE="ja-JP"      # 日本語
OUTPUT_FORMAT="mp3"
SAMPLE_RATE="22050"
```

### 代替音声オプション
1. **Takumi** - 日本語男性ニューラル音声
2. **Sekai** - 日本語女性ニューラル音声
3. **Tomoko** - 日本語女性標準音声

## 音声内容詳細

### 動物の鳴き声（animals/）
| ファイル | 内容 | SSML例 |
|---------|------|--------|
| dog.mp3 | 犬の鳴き声 | `<speak>わんわん</speak>` |
| cat.mp3 | 猫の鳴き声 | `<speak>にゃーにゃー</speak>` |
| bird.mp3 | 鳥のさえずり | `<speak>ちゅんちゅん</speak>` |
| cow.mp3 | 牛の鳴き声 | `<speak>もーもー</speak>` |

### 楽器の音（instruments/）
| ファイル | 内容 | SSML例 |
|---------|------|--------|
| piano.mp3 | ピアノ音 | `<speak>ピアノの音、ポローン</speak>` |
| drum.mp3 | ドラム音 | `<speak>たいこの音、ドンドン</speak>` |
| bell.mp3 | 鈴の音 | `<speak>すずの音、リンリン</speak>` |
| flute.mp3 | フルート音 | `<speak>フルートの音、フワー</speak>` |

### 効果音（effects/）
| ファイル | 内容 | 用途 |
|---------|------|------|
| pop.mp3 | ポップ音 | ボタンタップ |
| swoosh.mp3 | スウッシュ音 | 画面遷移 |
| chime.mp3 | チャイム音 | 通知・アラート |
| laugh.mp3 | 笑い声 | 楽しい反応 |
| tap.mp3 | タップ音 | UI操作フィードバック |
| success.mp3 | 成功音 | タスク完了 |
| encourage.mp3 | 応援音 | 励まし |

### BGM・お祝い音声（background/）
| ファイル | 内容 | 用途 |
|---------|------|------|
| album-bgm.mp3 | アルバムBGM | 写真スライドショー |
| birthday-greeting.mp3 | 誕生日挨拶 | 誕生日画面 |
| birthday-fanfare.mp3 | ファンファーレ | 誕生日祝福 |
| birthday-countdown.mp3 | カウントダウン | 誕生日演出 |

## 生成コマンド例

### AWS CLI使用例
```bash
# 基本的な音声生成
aws polly synthesize-speech \
  --output-format mp3 \
  --voice-id Kazuha \
  --engine neural \
  --language-code ja-JP \
  --sample-rate 22050 \
  --text-type ssml \
  --text "<speak><break time='0.5s'/>わんわん<break time='0.5s'/></speak>" \
  dog.mp3

# 感情を込めた音声生成
aws polly synthesize-speech \
  --output-format mp3 \
  --voice-id Kazuha \
  --engine neural \
  --language-code ja-JP \
  --sample-rate 22050 \
  --text-type ssml \
  --text "<speak><prosody rate='slow' pitch='+2st' volume='soft'>おたんじょうび、おめでとう</prosody></speak>" \
  birthday-greeting.mp3
```

### 自動生成スクリプト
`scripts/generate-audio.sh` を実行することで、全ての音声ファイルを一括生成可能です。

```bash
cd scripts
chmod +x generate-audio.sh
./generate-audio.sh
```

## 代替音声取得方法

AWS Pollyが利用できない場合の代替手段：

1. **フリー音源サイト**
   - 効果音ラボ（https://soundeffect-lab.info/）
   - 魔王魂（https://maou.audio/）
   - DOVA-SYNDROME（https://dova-s.jp/）

2. **音声合成サービス**
   - Google Text-to-Speech
   - Microsoft Azure Cognitive Services
   - IBM Watson Text to Speech

3. **オリジナル録音**
   - 家族の声での録音
   - プロナレーターによる録音

## 使用方法

音声ファイルは `useSound` フックまたは `Howler.js` を通じて再生されます。

```typescript
// 使用例
const { playSound } = useSound();

// 動物の鳴き声再生
playSound('/sounds/animals/dog.mp3');

// BGM再生
playSound('/sounds/background/album-bgm.mp3', { loop: true, volume: 0.3 });
```

## 注意事項

- 音声ファイルは著作権フリーまたは適切なライセンスを取得したもののみ使用
- ファイルサイズを小さく保ち、ロード時間を短縮
- 子供が驚かない適切な音量レベルを維持
- 音声の品質は一定に保ち、統一感を重視