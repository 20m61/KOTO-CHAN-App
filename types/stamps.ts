/**
 * スタンプの感情タイプ
 */
export type StampEmotion = 'happy' | 'sad' | 'excited' | 'calm' | 'surprised';

/**
 * スタンプのカテゴリー
 */
export type StampCategory = 'greeting' | 'emotion' | 'celebration' | 'action';

/**
 * スタンプのアニメーションタイプ
 */
export type StampAnimation = 'bounce' | 'scale' | 'rotate' | 'shake';

/**
 * スタンプデータの型定義
 */
export interface StampData {
  id: string;
  name: string;
  nameEn: string;
  emotion: StampEmotion;
  category: StampCategory;
  src: string;
  srcRetina?: string;
  animation?: StampAnimation;
  sound?: string;
}

/**
 * 配置されたスタンプの型定義
 */
export interface PlacedStamp {
  id: string;
  stampId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  timestamp: number;
}