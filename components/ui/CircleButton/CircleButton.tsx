'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'pink' | 'yellow' | 'mint' | 'blue' | 'orange' | 'purple' | 'brown';
  icon?: ReactNode;
  label?: string;
  labelPosition?: 'bottom' | 'inside';
  isActive?: boolean;
  loading?: boolean;
  animationOnPress?: boolean;
  animationOnHover?: boolean;
}

export const CircleButton = forwardRef<HTMLButtonElement, CircleButtonProps>(
  ({
    size = 'medium',
    color = 'pink',
    icon,
    label,
    labelPosition = 'bottom',
    isActive = false,
    loading = false,
    animationOnPress = true,
    animationOnHover = true,
    disabled,
    className,
    children,
    ...props
  }, ref) => {
    // サイズクラス
    const sizeClasses = {
      small: 'w-touch-min h-touch-min', // 44px
      medium: 'w-touch-comfortable h-touch-comfortable', // 56px  
      large: 'w-touch-large h-touch-large', // 72px
      xlarge: 'w-touch-xl h-touch-xl', // 96px
    };

    // カラークラス（モック画像に基づく）
    const colorClasses = {
      pink: 'bg-kotochan-pink hover:bg-kotochan-pink-dark active:bg-kotochan-pink-light',
      yellow: 'bg-kotochan-yellow hover:bg-kotochan-yellow-dark active:bg-kotochan-yellow-light',
      mint: 'bg-kotochan-mint hover:bg-kotochan-mint-dark active:bg-kotochan-mint-light',
      blue: 'bg-kotochan-blue hover:bg-kotochan-blue-dark active:bg-kotochan-blue-light',
      orange: 'bg-kotochan-orange hover:bg-kotochan-orange-dark active:bg-kotochan-orange-light',
      purple: 'bg-kotochan-purple hover:bg-purple-400 active:bg-purple-200',
      brown: 'bg-kotochan-brown hover:bg-amber-800 active:bg-amber-600',
    };

    // アイコンサイズ
    const iconSizes = {
      small: 'text-lg', // 18px
      medium: 'text-xl', // 20px
      large: 'text-2xl', // 24px  
      xlarge: 'text-3xl', // 30px
    };

    // ラベルサイズ
    const labelSizes = {
      small: 'text-child-xs',
      medium: 'text-child-sm',
      large: 'text-child-base',
      xlarge: 'text-child-lg',
    };

    const buttonContent = (
      <>
        {loading ? (
          <div className="animate-spin">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {icon && (
              <div className={cn('flex items-center justify-center', iconSizes[size])}>
                {icon}
              </div>
            )}
            {children}
            {label && labelPosition === 'inside' && (
              <span className={cn('font-rounded font-bold text-kotochan-brown mt-1', labelSizes[size])}>
                {label}
              </span>
            )}
          </>
        )}
      </>
    );

    return (
      <div className="flex flex-col items-center">
        <button
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            // 基本スタイル
            'relative flex flex-col items-center justify-center',
            'rounded-kotochan-full',
            'font-rounded font-bold',
            'text-kotochan-brown',
            'shadow-lg',
            'transition-all duration-200',
            'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50',
            
            // サイズ
            sizeClasses[size],
            
            // カラー
            colorClasses[color],
            
            // フォーカス時のリング色
            color === 'pink' && 'focus:ring-kotochan-pink',
            color === 'yellow' && 'focus:ring-kotochan-yellow',
            color === 'mint' && 'focus:ring-kotochan-mint',
            color === 'blue' && 'focus:ring-kotochan-blue',
            color === 'orange' && 'focus:ring-kotochan-orange',
            color === 'purple' && 'focus:ring-kotochan-purple',
            color === 'brown' && 'focus:ring-kotochan-brown',
            
            // アクティブ状態
            isActive && 'ring-4 ring-white ring-opacity-50 scale-110',
            
            // アニメーション
            animationOnPress && 'active:animate-button-press',
            animationOnHover && 'hover:animate-button-hover',
            
            // 無効状態
            disabled && 'opacity-50 cursor-not-allowed bg-kotochan-disabled hover:bg-kotochan-disabled',
            
            // カスタムクラス
            className
          )}
          {...props}
        >
          {buttonContent}
          
          {/* アクティブ時のエフェクト */}
          {isActive && (
            <div className="absolute inset-0 rounded-kotochan-full bg-white opacity-20 animate-pulse-gentle" />
          )}
        </button>
        
        {/* 外部ラベル */}
        {label && labelPosition === 'bottom' && (
          <span className={cn(
            'font-rounded font-bold text-kotochan-brown mt-2 text-center',
            labelSizes[size]
          )}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

CircleButton.displayName = 'CircleButton';