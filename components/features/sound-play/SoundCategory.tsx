'use client';

import { CircleButton } from '@/components/ui/CircleButton';
import { type SoundCategory as SoundCategoryType } from '@/lib/constants/sounds';
import { cn } from '@/lib/utils/cn';

interface CategoryInfo {
  id: SoundCategoryType;
  name: string;
  icon: string;
  color: string;
  sounds: any[];
}

interface SoundCategoryProps {
  categories: readonly CategoryInfo[];
  activeCategory: SoundCategoryType;
  onCategoryChange: (category: SoundCategoryType) => void;
  className?: string;
}

const COLOR_MAP: Record<
  SoundCategoryType,
  'pink' | 'yellow' | 'mint' | 'blue' | 'orange' | 'purple' | 'brown'
> = {
  animals: 'pink',
  instruments: 'mint',
  effects: 'yellow',
  background: 'blue',
};

export function SoundCategory({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: SoundCategoryProps) {
  return (
    <div
      className={cn(
        'flex justify-center gap-4 p-4',
        'bg-white/50 backdrop-blur-sm rounded-kotochan',
        'border border-white/20 shadow-sm',
        className
      )}
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        const buttonColor = COLOR_MAP[category.id] || 'pink';

        return (
          <CircleButton
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            color={buttonColor}
            size="medium"
            className={cn(
              'transition-all duration-200',
              isActive && 'scale-110 shadow-lg ring-2 ring-white/50',
              !isActive && 'opacity-70 hover:opacity-100'
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl" role="img" aria-label={category.name}>
                {category.icon}
              </span>
              <span className="text-child-xs font-bold text-center leading-tight">
                {category.name}
              </span>
              <span className="text-child-xs text-gray-600 text-center">
                {category.sounds.length}個
              </span>
            </div>
          </CircleButton>
        );
      })}
    </div>
  );
}
