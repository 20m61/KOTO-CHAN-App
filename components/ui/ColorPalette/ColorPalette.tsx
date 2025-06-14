'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ColorPaletteProps {
  colors?: string[];
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
  size?: 'small' | 'medium' | 'large';
  layout?: 'row' | 'grid';
  className?: string;
}

// デフォルトカラー（モック画像に基づく）
const DEFAULT_COLORS = [
  '#FFB6C1', // kotochan-pink
  '#FFE4B5', // kotochan-yellow  
  '#98FB98', // kotochan-mint
  '#87CEEB', // kotochan-blue
  '#FFA500', // kotochan-orange
];

export function ColorPalette({
  colors = DEFAULT_COLORS,
  selectedColor,
  onColorSelect,
  size = 'medium',
  layout = 'row',
  className,
}: ColorPaletteProps) {
  const [internalSelectedColor, setInternalSelectedColor] = useState<string>(colors[0]);

  const currentSelected = selectedColor ?? internalSelectedColor;

  const handleColorSelect = (color: string) => {
    setInternalSelectedColor(color);
    onColorSelect?.(color);
  };

  // サイズクラス
  const sizeClasses = {
    small: 'w-8 h-8',     // 32px
    medium: 'w-12 h-12',  // 48px
    large: 'w-16 h-16',   // 64px
  };

  // レイアウトクラス
  const layoutClasses = {
    row: 'flex flex-row gap-3',
    grid: 'grid grid-cols-3 gap-3',
  };

  return (
    <div className={cn(
      'flex items-center justify-center',
      layoutClasses[layout],
      className
    )}>
      {colors.map((color, index) => {
        const isSelected = currentSelected === color;
        
        return (
          <button
            key={`${color}-${index}`}
            className={cn(
              'relative rounded-kotochan-full border-4 transition-all duration-200',
              'hover:scale-110 active:scale-95',
              'focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50',
              sizeClasses[size],
              isSelected 
                ? 'border-kotochan-brown scale-110 shadow-lg' 
                : 'border-white shadow-md hover:border-kotochan-brown/50'
            )}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            aria-label={`色を選択: ${color}`}
          >
            {/* 選択状態のチェックマーク */}
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  className="w-1/2 h-1/2 text-kotochan-brown drop-shadow-sm" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
            
            {/* ホバー時のエフェクト */}
            <div className="absolute inset-0 rounded-kotochan-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-200" />
          </button>
        );
      })}
    </div>
  );
}