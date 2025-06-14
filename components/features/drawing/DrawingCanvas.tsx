'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useDrawingStore } from '@/lib/store/drawingStore';
import { cn } from '@/lib/utils/cn';

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  
  const { 
    currentColor, 
    brushSize, 
    history, 
    addToHistory, 
    currentHistoryIndex 
  } = useDrawingStore();

  // キャンバスの初期化
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズを設定
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
      ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // 白い背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // 描画設定
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.imageSmoothingEnabled = true;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // 履歴からキャンバスを復元
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !history.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = history[currentHistoryIndex];
    if (currentState) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = currentState;
    }
  }, [history, currentHistoryIndex]);

  const getEventPoint = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in event) {
      if (event.touches.length === 0) return null;
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    event.preventDefault();
    const point = getEventPoint(event);
    if (!point) return;

    setIsDrawing(true);
    setLastPoint(point);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }, [getEventPoint, currentColor, brushSize]);

  const draw = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    
    event.preventDefault();
    const point = getEventPoint(event);
    if (!point || !lastPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    
    setLastPoint(point);
  }, [isDrawing, lastPoint, getEventPoint]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setLastPoint(null);

    // 履歴に追加
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      addToHistory(dataURL);
    }
  }, [isDrawing, addToHistory]);

  return (
    <div className={cn(
      "relative bg-white rounded-kotochan border-4 border-kotochan-brown/20",
      "shadow-lg overflow-hidden",
      "w-full max-w-2xl aspect-[4/3]"
    )}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ touchAction: 'none' }}
      />
      
      {/* 描画中のインジケーター */}
      {isDrawing && (
        <div className="absolute top-2 right-2 bg-kotochan-pink text-white px-2 py-1 rounded-full text-xs">
          かいてるよ ✏️
        </div>
      )}
    </div>
  );
}