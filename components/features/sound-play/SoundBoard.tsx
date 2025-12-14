'use client';

import { SoundButton } from './SoundButton';
import {
  getSoundsByCategory,
  type SoundCategory,
} from '@/lib/constants/sounds';
import { GridLayout } from '@/components/layouts/GridLayout';
import { cn } from '@/lib/utils/cn';

interface SoundBoardProps {
  category: SoundCategory;
  className?: string;
}

export function SoundBoard({ category, className }: SoundBoardProps) {
  const sounds = getSoundsByCategory(category);

  if (sounds.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center p-8',
          'bg-white/30 backdrop-blur-sm rounded-kotochan',
          'border border-white/20',
          className
        )}
      >
        <div className="text-center">
          <span className="text-4xl mb-4 block">🎵</span>
          <p className="text-child-base text-gray-600">
            この カテゴリには
            <br />
            まだ 音が ありません
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white/30 backdrop-blur-sm rounded-kotochan',
        'border border-white/20 shadow-sm',
        'p-4 sm:p-6',
        className
      )}
    >
      <GridLayout
        columns={2}
        gap="medium"
        className="max-w-4xl mx-auto sm:grid-cols-3 md:grid-cols-4"
      >
        {sounds.map((sound) => (
          <SoundButton
            key={sound.id}
            sound={sound}
            size="large"
            className="w-full aspect-square"
          />
        ))}
      </GridLayout>
    </div>
  );
}
