'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // モーダル表示中はスクロールを無効化
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  // サイズクラス
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* モーダルコンテンツ */}
      <div className={cn(
        'relative w-full bg-kotochan-cream rounded-kotochan-lg shadow-2xl',
        'border-4 border-white animate-pop-in',
        sizeClasses[size],
        className
      )}>
        {/* ヘッダー */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b-2 border-kotochan-brown/10">
            {title && (
              <h2 className="text-child-lg font-rounded font-bold text-kotochan-brown">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                className="w-8 h-8 rounded-kotochan-full bg-kotochan-pink/20 
                         hover:bg-kotochan-pink/40 transition-colors duration-200
                         flex items-center justify-center text-kotochan-brown"
                onClick={onClose}
                aria-label="モーダルを閉じる"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* コンテンツ */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  // ポータルを使用してbody直下に描画
  return createPortal(modal, document.body);
}