'use client';

import { CircleButton } from '@/components/ui/CircleButton';
import { useDrawingStore } from '@/lib/store/drawingStore';
import { cn } from '@/lib/utils/cn';

const COLORS = [
  { id: 'black', value: '#2D1B14', name: 'くろ', color: 'brown' as const },
  { id: 'red', value: '#FF6B6B', name: 'あか', color: 'pink' as const },
  { id: 'blue', value: '#4ECDC4', name: 'あお', color: 'mint' as const },
  { id: 'yellow', value: '#FFE66D', name: 'きいろ', color: 'yellow' as const },
  { id: 'green', value: '#95E1D3', name: 'みどり', color: 'mint' as const },
  { id: 'purple', value: '#C7A3F5', name: 'むらさき', color: 'purple' as const },
  { id: 'orange', value: '#FFB74D', name: 'おれんじ', color: 'orange' as const },
  { id: 'pink', value: '#FFB6C1', name: 'ぴんく', color: 'pink' as const },
];

const BRUSH_SIZES = [
  { id: 'small', value: 4, name: 'ほそい', icon: '・' },
  { id: 'medium', value: 8, name: 'ふつう', icon: '●' },
  { id: 'large', value: 16, name: 'ふとい', icon: '⬤' },
  { id: 'xlarge', value: 24, name: 'とてもふとい', icon: '⬛' },
];

export function DrawingToolbar() {
  const { currentColor, brushSize, setCurrentColor, setBrushSize } = useDrawingStore();

  return (
    <div className={cn(
      "flex flex-col gap-4 p-4",
      "bg-white/50 backdrop-blur-sm rounded-kotochan",
      "border border-white/20 shadow-sm"
    )}>
      {/* 色選択 */}
      <div>
        <h3 className="text-child-base font-bold text-kotochan-brown mb-3 text-center">
          いろ
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setCurrentColor(color.value)}
              className={cn(
                "w-12 h-12 rounded-full border-4 transition-all duration-200",
                "hover:scale-110 active:scale-95",
                currentColor === color.value 
                  ? "border-kotochan-brown shadow-lg scale-110" 
                  : "border-white/50"
              )}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* ブラシサイズ選択 */}
      <div>
        <h3 className="text-child-base font-bold text-kotochan-brown mb-3 text-center">
          ふとさ
        </h3>
        <div className="flex gap-2 justify-center">
          {BRUSH_SIZES.map((size) => (
            <CircleButton
              key={size.id}
              onClick={() => setBrushSize(size.value)}
              color="mint"
              size="small"
              className={cn(
                "transition-all duration-200",
                brushSize === size.value && "scale-110 ring-2 ring-kotochan-brown"
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg" style={{ fontSize: `${Math.min(size.value + 8, 20)}px` }}>
                  {size.icon}
                </span>
                <span className="text-child-xs font-bold">
                  {size.name}
                </span>
              </div>
            </CircleButton>
          ))}
        </div>
      </div>
    </div>
  );
}