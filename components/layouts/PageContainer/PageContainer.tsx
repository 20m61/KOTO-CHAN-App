'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showBirthdayEffects?: boolean;
  background?: 'default' | 'gradient' | 'stars' | 'birthday';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export function PageContainer({
  children,
  title,
  showBackButton = false,
  showBirthdayEffects = false,
  background = 'default',
  padding = 'medium',
  className,
}: PageContainerProps) {
  // 背景クラス
  const backgroundClasses = {
    default: 'bg-kotochan-cream',
    gradient: 'bg-gradient-to-br from-kotochan-cream via-kotochan-pink-light to-kotochan-yellow-light',
    stars: 'bg-kotochan-cream relative',
    birthday: 'bg-gradient-to-br from-kotochan-pink-light via-kotochan-yellow-light to-kotochan-mint-light',
  };

  // パディングクラス
  const paddingClasses = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div className={cn(
      'min-h-screen w-full',
      'font-rounded',
      backgroundClasses[background],
      paddingClasses[padding],
      'relative overflow-hidden',
      className
    )}>
      {/* 背景装飾要素 */}
      {(background === 'stars' || showBirthdayEffects) && (
        <div className="absolute inset-0 pointer-events-none">
          {/* 星の装飾 */}
          <div className="absolute top-10 left-10 text-kotochan-yellow animate-star-twinkle">
            <StarDecoration size="sm" />
          </div>
          <div className="absolute top-20 right-16 text-kotochan-pink animate-star-twinkle delay-500">
            <StarDecoration size="md" />
          </div>
          <div className="absolute bottom-32 left-20 text-kotochan-mint animate-star-twinkle delay-1000">
            <StarDecoration size="sm" />
          </div>
          <div className="absolute bottom-20 right-12 text-kotochan-orange animate-star-twinkle delay-700">
            <StarDecoration size="lg" />
          </div>
          <div className="absolute top-1/3 left-1/4 text-kotochan-blue animate-star-twinkle delay-300">
            <StarDecoration size="md" />
          </div>
          <div className="absolute top-2/3 right-1/3 text-kotochan-purple animate-star-twinkle delay-900">
            <StarDecoration size="sm" />
          </div>
          
          {/* ハートの装飾 */}
          <div className="absolute top-16 right-10 text-kotochan-pink opacity-60 animate-float">
            <HeartDecoration size="sm" />
          </div>
          <div className="absolute bottom-40 left-16 text-kotochan-yellow opacity-60 animate-float delay-1000">
            <HeartDecoration size="md" />
          </div>
          <div className="absolute top-1/2 right-20 text-kotochan-mint opacity-60 animate-float delay-500">
            <HeartDecoration size="sm" />
          </div>
        </div>
      )}

      {/* 誕生日特別エフェクト */}
      {showBirthdayEffects && (
        <div className="absolute inset-0 pointer-events-none">
          {/* 風船 */}
          <div className="absolute top-10 left-8 text-kotochan-pink animate-balloon-float">
            <BalloonDecoration />
          </div>
          <div className="absolute top-16 right-8 text-kotochan-yellow animate-balloon-float delay-1000">
            <BalloonDecoration />
          </div>
          <div className="absolute top-12 left-1/3 text-kotochan-blue animate-balloon-float delay-500">
            <BalloonDecoration />
          </div>
          
          {/* キラキラエフェクト */}
          <div className="absolute top-24 right-24 text-kotochan-yellow animate-sparkle">
            <SparkleDecoration size="lg" />
          </div>
          <div className="absolute bottom-24 left-24 text-kotochan-pink animate-sparkle delay-700">
            <SparkleDecoration size="md" />
          </div>
        </div>
      )}

      {/* ヘッダー */}
      {(title || showBackButton) && (
        <header className="relative z-10 flex items-center justify-between mb-6">
          {showBackButton && (
            <button
              className="w-12 h-12 rounded-kotochan-full bg-white/50 backdrop-blur-sm
                       flex items-center justify-center text-kotochan-brown
                       hover:bg-white/70 transition-all duration-200
                       shadow-lg active:scale-95"
              onClick={() => window.history.back()}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
          )}
          
          {title && (
            <h1 className={cn(
              'text-child-2xl font-bold text-kotochan-brown text-center',
              'drop-shadow-sm',
              showBackButton ? 'flex-1 mr-12' : 'w-full'
            )}>
              {title}
            </h1>
          )}
          
          {showBackButton && !title && <div />}
        </header>
      )}

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-1">
        {children}
      </main>
    </div>
  );
}

// 装飾コンポーネント
function StarDecoration({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartDecoration({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" />
    </svg>
  );
}

function BalloonDecoration() {
  return (
    <svg className="w-8 h-12" fill="currentColor" viewBox="0 0 24 32">
      <ellipse cx="12" cy="10" rx="8" ry="10" />
      <line x1="12" y1="20" x2="12" y2="32" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SparkleDecoration({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7,4V2c0-0.55-0.45-1-1-1S5,1.45,5,2v2C5,4.55,5.45,5,6,5S7,4.55,7,4z M6,8C5.45,8,5,8.45,5,9v2c0,0.55,0.45,1,1,1 s1-0.45,1-1V9C7,8.45,6.55,8,6,8z M12,0c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1s1-0.45,1-1V1C13,0.45,12.55,0,12,0z M12,8 c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1s1-0.45,1-1V9C13,8.45,12.55,8,12,8z M18,4V2c0-0.55-0.45-1-1-1s-1,0.45-1,1v2 c0,0.55,0.45,1,1,1S18,4.55,18,4z M17,8c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1s1-0.45,1-1V9C18,8.45,17.55,8,17,8z" />
    </svg>
  );
}