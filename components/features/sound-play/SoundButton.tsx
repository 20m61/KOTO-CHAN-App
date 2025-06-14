'use client';

import { useState } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Sparkles } from '@/components/ui/Sparkles';
import { useSound } from '@/lib/hooks/useSound';
import { type SoundItem } from '@/lib/constants/sounds';
import { cn } from '@/utils/cn';

interface SoundButtonProps {
  sound: SoundItem;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const COLOR_MAP: Record<string, 'pink' | 'yellow' | 'mint' | 'blue' | 'orange' | 'purple' | 'brown'> = {
  animals: 'pink',
  instruments: 'mint',
  effects: 'yellow',
  background: 'blue'
};

export function SoundButton({ sound, size = 'large', className }: SoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const { play, isLoading } = useSound(sound.file);

  const handlePlay = async () => {
    if (isPlaying || isLoading) return;

    setIsPlaying(true);
    setShowSparkles(true);

    try {
      await play();
    } catch (error) {
      console.error('Sound play failed:', error);
    } finally {
      // 音声の長さまたは最小表示時間の長い方だけボタンを押下状態にする
      const displayDuration = Math.max(sound.duration * 1000, 800);
      
      setTimeout(() => {
        setIsPlaying(false);
      }, displayDuration);

      setTimeout(() => {
        setShowSparkles(false);
      }, displayDuration + 300);
    }
  };

  const buttonColor = COLOR_MAP[sound.category] || 'pink';

  return (
    <div className={cn("relative", className)}>
      {showSparkles && (
        <Sparkles
          count={8}
          className="absolute inset-0 pointer-events-none"
        />
      )}
      
      <CircleButton
        onClick={handlePlay}
        disabled={isPlaying || isLoading}
        color={buttonColor}
        size={size}
        className={cn(
          "transition-all duration-200",
          isPlaying && "scale-110 shadow-lg",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <span 
            className="text-3xl sm:text-4xl" 
            role="img" 
            aria-label={sound.name}
          >
            {sound.category === 'animals' && '🐕'}
            {sound.category === 'instruments' && '🎹'}
            {sound.category === 'effects' && '✨'}
            {sound.id === 'cat' && '🐱'}
            {sound.id === 'bird' && '🐦'}
            {sound.id === 'cow' && '🐄'}
            {sound.id === 'drum' && '🥁'}
            {sound.id === 'bell' && '🔔'}
            {sound.id === 'flute' && '🎵'}
            {sound.id === 'pop' && '🎈'}
            {sound.id === 'swoosh' && '💨'}
            {sound.id === 'chime' && '🎐'}
            {sound.id === 'laugh' && '😄'}
            {sound.id === 'tap' && '👆'}
            {sound.id === 'success' && '🎉'}
            {sound.id === 'encourage' && '💪'}
          </span>
          
          <span className="text-child-small font-bold text-center leading-tight">
            {sound.name}
          </span>
          
          <span className="text-child-xs text-gray-600 text-center leading-tight">
            {sound.description}
          </span>
        </div>
      </CircleButton>
    </div>
  );
}