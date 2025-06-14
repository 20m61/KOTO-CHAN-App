/**
 * 音声ファイル定義
 * ことちゃんバースデーアプリで使用する音声リソース
 */

export interface SoundItem {
  id: string;
  name: string;
  file: string;
  description: string;
  duration: number;
  category: SoundCategory;
  loop?: boolean;
  volume?: number;
}

export type SoundCategory = 'animals' | 'instruments' | 'effects' | 'background';

/**
 * 動物の鳴き声
 */
export const ANIMAL_SOUNDS: SoundItem[] = [
  {
    id: 'dog',
    name: 'いぬ',
    file: '/sounds/animals/dog.mp3',
    description: 'わんわん',
    duration: 1.5,
    category: 'animals',
  },
  {
    id: 'cat',
    name: 'ねこ',
    file: '/sounds/animals/cat.mp3',
    description: 'にゃーにゃー',
    duration: 1.5,
    category: 'animals',
  },
  {
    id: 'bird',
    name: 'とり',
    file: '/sounds/animals/bird.mp3',
    description: 'ちゅんちゅん',
    duration: 2.0,
    category: 'animals',
  },
  {
    id: 'cow',
    name: 'うし',
    file: '/sounds/animals/cow.mp3',
    description: 'もーもー',
    duration: 2.0,
    category: 'animals',
  },
];

/**
 * 楽器の音
 */
export const INSTRUMENT_SOUNDS: SoundItem[] = [
  {
    id: 'piano',
    name: 'ピアノ',
    file: '/sounds/instruments/piano.mp3',
    description: 'ポローン',
    duration: 2.0,
    category: 'instruments',
  },
  {
    id: 'drum',
    name: 'たいこ',
    file: '/sounds/instruments/drum.mp3',
    description: 'ドンドン',
    duration: 1.0,
    category: 'instruments',
  },
  {
    id: 'bell',
    name: 'すず',
    file: '/sounds/instruments/bell.mp3',
    description: 'リンリン',
    duration: 2.5,
    category: 'instruments',
  },
  {
    id: 'flute',
    name: 'フルート',
    file: '/sounds/instruments/flute.mp3',
    description: 'フワー',
    duration: 3.0,
    category: 'instruments',
  },
];

/**
 * 効果音
 */
export const EFFECT_SOUNDS: SoundItem[] = [
  {
    id: 'pop',
    name: 'ポップ',
    file: '/sounds/effects/pop.mp3',
    description: 'ポップ音',
    duration: 0.5,
    category: 'effects',
  },
  {
    id: 'swoosh',
    name: 'スウッシュ',
    file: '/sounds/effects/swoosh.mp3',
    description: 'スウッシュ音',
    duration: 0.8,
    category: 'effects',
  },
  {
    id: 'chime',
    name: 'チャイム',
    file: '/sounds/effects/chime.mp3',
    description: 'チーン',
    duration: 1.5,
    category: 'effects',
  },
  {
    id: 'laugh',
    name: 'わらい',
    file: '/sounds/effects/laugh.mp3',
    description: 'わはは',
    duration: 2.0,
    category: 'effects',
  },
  {
    id: 'tap',
    name: 'タップ',
    file: '/sounds/effects/tap.mp3',
    description: 'タップ音',
    duration: 0.3,
    category: 'effects',
  },
  {
    id: 'success',
    name: 'せいこう',
    file: '/sounds/effects/success.mp3',
    description: 'できました',
    duration: 1.5,
    category: 'effects',
  },
  {
    id: 'encourage',
    name: 'おうえん',
    file: '/sounds/effects/encourage.mp3',
    description: 'がんばって',
    duration: 2.0,
    category: 'effects',
  },
];

/**
 * BGM・お祝い音声
 */
export const BACKGROUND_SOUNDS: SoundItem[] = [
  {
    id: 'album-bgm',
    name: 'アルバムBGM',
    file: '/sounds/background/album-bgm.mp3',
    description: 'やさしい音楽',
    duration: 10.0,
    category: 'background',
    loop: true,
    volume: 0.3,
  },
  {
    id: 'birthday-greeting',
    name: 'たんじょうびのうた',
    file: '/sounds/background/birthday-greeting.mp3',
    description: 'おめでとう',
    duration: 3.0,
    category: 'background',
  },
  {
    id: 'birthday-fanfare',
    name: 'ファンファーレ',
    file: '/sounds/background/birthday-fanfare.mp3',
    description: 'たんたんたーん',
    duration: 5.0,
    category: 'background',
  },
  {
    id: 'birthday-countdown',
    name: 'カウントダウン',
    file: '/sounds/background/birthday-countdown.mp3',
    description: 'いち、にー、さん',
    duration: 4.0,
    category: 'background',
  },
];

/**
 * 全ての音声ファイル
 */
export const ALL_SOUNDS: SoundItem[] = [
  ...ANIMAL_SOUNDS,
  ...INSTRUMENT_SOUNDS,
  ...EFFECT_SOUNDS,
  ...BACKGROUND_SOUNDS,
];

/**
 * カテゴリ別音声取得
 */
export const SOUNDS_BY_CATEGORY: Record<SoundCategory, SoundItem[]> = {
  animals: ANIMAL_SOUNDS,
  instruments: INSTRUMENT_SOUNDS,
  effects: EFFECT_SOUNDS,
  background: BACKGROUND_SOUNDS,
};

/**
 * 音声ファイル検索
 */
export function getSoundById(id: string): SoundItem | undefined {
  return ALL_SOUNDS.find(sound => sound.id === id);
}

/**
 * カテゴリ別音声取得
 */
export function getSoundsByCategory(category: SoundCategory): SoundItem[] {
  return SOUNDS_BY_CATEGORY[category] || [];
}

/**
 * おとあそび用サウンドボード構成
 * 3x4グリッドで12個の音声ボタンを配置
 */
export const SOUND_BOARD_LAYOUT: SoundItem[] = [
  // 1行目：動物
  ...ANIMAL_SOUNDS,
  // 2行目：楽器
  ...INSTRUMENT_SOUNDS,
  // 3行目：効果音（最初の4つ）
  ...EFFECT_SOUNDS.slice(0, 4),
];

/**
 * 音声カテゴリの表示情報
 */
export const SOUND_CATEGORIES = [
  {
    id: 'animals' as SoundCategory,
    name: 'どうぶつ',
    icon: '🐕',
    color: 'kotochan-pink',
    sounds: ANIMAL_SOUNDS,
  },
  {
    id: 'instruments' as SoundCategory,
    name: 'がっき',
    icon: '🎹',
    color: 'kotochan-mint',
    sounds: INSTRUMENT_SOUNDS,
  },
  {
    id: 'effects' as SoundCategory,
    name: 'おと',
    icon: '✨',
    color: 'kotochan-yellow',
    sounds: EFFECT_SOUNDS,
  },
] as const;

/**
 * 音声プリロード用リスト
 * よく使用される音声を事前にロード
 */
export const PRELOAD_SOUNDS = [
  '/sounds/effects/tap.mp3',
  '/sounds/effects/pop.mp3',
  '/sounds/effects/success.mp3',
  '/sounds/animals/dog.mp3',
  '/sounds/animals/cat.mp3',
  '/sounds/instruments/piano.mp3',
];

/**
 * 音声設定のデフォルト値
 */
export const DEFAULT_AUDIO_SETTINGS = {
  masterVolume: 0.7,
  effectsVolume: 0.8,
  musicVolume: 0.4,
  enabled: true,
} as const;