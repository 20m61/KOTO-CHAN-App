'use client';

import { useState } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useDrawingStore } from '@/lib/store/drawingStore';
import { useSoundManager } from '@/lib/hooks/useSound';
import { cn } from '@/lib/utils/cn';

export function DrawingControls() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  
  const { 
    canUndo, 
    canRedo, 
    undo, 
    redo, 
    clear, 
    saveDrawing 
  } = useDrawingStore();
  
  const { playSound } = useSoundManager();

  const handleUndo = () => {
    undo();
    playSound('/sounds/effects/tap.mp3');
  };

  const handleRedo = () => {
    redo();
    playSound('/sounds/effects/tap.mp3');
  };

  const handleClear = () => {
    setShowClearModal(true);
  };

  const confirmClear = () => {
    clear();
    setShowClearModal(false);
    playSound('/sounds/effects/swoosh.mp3');
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    saveDrawing();
    setShowSaveModal(false);
    playSound('/sounds/effects/success.mp3');
  };

  return (
    <>
      <div className={cn(
        "flex justify-center gap-4 p-4",
        "bg-white/50 backdrop-blur-sm rounded-kotochan",
        "border border-white/20 shadow-sm"
      )}>
        {/* 戻る */}
        <CircleButton
          onClick={handleUndo}
          disabled={!canUndo}
          color="blue"
          size="medium"
          className={cn(
            "transition-all duration-200",
            !canUndo && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            <Icon name="undo" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              もどる
            </span>
          </div>
        </CircleButton>

        {/* やり直し */}
        <CircleButton
          onClick={handleRedo}
          disabled={!canRedo}
          color="blue"
          size="medium"
          className={cn(
            "transition-all duration-200",
            !canRedo && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            <Icon name="redo" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              すすむ
            </span>
          </div>
        </CircleButton>

        {/* 全部消す */}
        <CircleButton
          onClick={handleClear}
          color="orange"
          size="medium"
        >
          <div className="flex flex-col items-center">
            <Icon name="refresh" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              きれいに
            </span>
          </div>
        </CircleButton>

        {/* 保存 */}
        <CircleButton
          onClick={handleSave}
          color="pink"
          size="medium"
        >
          <div className="flex flex-col items-center">
            <Icon name="download" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              ほぞん
            </span>
          </div>
        </CircleButton>
      </div>

      {/* 消去確認モーダル */}
      <Modal 
        isOpen={showClearModal} 
        onClose={() => setShowClearModal(false)}
        title="きれいにする"
      >
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-child-base text-kotochan-brown mb-6">
            えを ぜんぶ けしても いいですか？
          </p>
          <div className="flex gap-4 justify-center">
            <CircleButton
              onClick={() => setShowClearModal(false)}
              color="mint"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">❌</span>
                <span className="text-child-xs font-bold">やめる</span>
              </div>
            </CircleButton>
            <CircleButton
              onClick={confirmClear}
              color="orange"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">✨</span>
                <span className="text-child-xs font-bold">きれいに</span>
              </div>
            </CircleButton>
          </div>
        </div>
      </Modal>

      {/* 保存確認モーダル */}
      <Modal 
        isOpen={showSaveModal} 
        onClose={() => setShowSaveModal(false)}
        title="えを ほぞん"
      >
        <div className="text-center p-6">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-child-base text-kotochan-brown mb-6">
            かいた えを ほぞん しますか？
          </p>
          <div className="flex gap-4 justify-center">
            <CircleButton
              onClick={() => setShowSaveModal(false)}
              color="mint"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">❌</span>
                <span className="text-child-xs font-bold">やめる</span>
              </div>
            </CircleButton>
            <CircleButton
              onClick={confirmSave}
              color="pink"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">💾</span>
                <span className="text-child-xs font-bold">ほぞん</span>
              </div>
            </CircleButton>
          </div>
        </div>
      </Modal>
    </>
  );
}