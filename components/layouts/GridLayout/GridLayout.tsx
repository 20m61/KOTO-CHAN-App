'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface GridLayoutProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  className?: string;
}

export function GridLayout({
  children,
  columns = 3,
  gap = 'medium',
  align = 'center',
  justify = 'center',
  className,
}: GridLayoutProps) {
  // グリッドカラムクラス
  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  // ギャップクラス
  const gapClasses = {
    small: 'gap-3',
    medium: 'gap-4',
    large: 'gap-6',
  };

  // アライメントクラス
  const alignClasses = {
    start: 'items-start',
    center: 'items-center', 
    end: 'items-end',
  };

  // ジャストファイクラス
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  return (
    <div className={cn(
      'grid w-full',
      columnClasses[columns],
      gapClasses[gap],
      alignClasses[align],
      justifyClasses[justify],
      // レスポンシブ対応
      'auto-rows-min',
      'place-items-center',
      className
    )}>
      {children}
    </div>
  );
}