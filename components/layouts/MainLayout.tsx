'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MainLayoutProps {
  children: ReactNode;
  showBirthdayEffects?: boolean;
}

export function MainLayout({ children, showBirthdayEffects = false }: MainLayoutProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!showBirthdayEffects) return;

    // キラキラエフェクトを生成
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      
      setSparkles((prev) => [...prev, newSparkle]);
      
      // 3秒後に削除
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 3000);
    }, 500);

    return () => clearInterval(interval);
  }, [showBirthdayEffects]);

  return (
    <div
      className={cn(
        'min-h-screen bg-kotochan-cream relative overflow-hidden',
        showBirthdayEffects && 'birthday-mode'
      )}
    >
      {/* キラキラエフェクト */}
      <AnimatePresence>
        {showBirthdayEffects &&
          sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="sparkle"
              style={{
                left: sparkle.x,
                top: sparkle.y,
              }}
            />
          ))}
      </AnimatePresence>

      {/* メインコンテンツ */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}