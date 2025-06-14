'use client';

import { useState, useEffect } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils/cn';

interface DrawingData {
  id: string;
  name: string;
  dataURL: string;
  createdAt: string;
  fileSize: number;
  blobUrl?: string;
}

interface DrawingsManagerProps {
  onBack: () => void;
}

export function DrawingsManager({ onBack }: DrawingsManagerProps) {
  const [drawings, setDrawings] = useState<DrawingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDrawings();
  }, []);

  const loadDrawings = async () => {
    try {
      const response = await fetch('/api/drawings');
      const data = await response.json();

      if (data.success) {
        setDrawings(data.drawings);
      }
    } catch (error) {
      console.error('Failed to load drawings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDrawing = async (drawingId: string) => {
    if (!confirm('この絵を削除しますか？')) return;

    try {
      const response = await fetch(`/api/drawings?id=${drawingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDrawings((prev) =>
          prev.filter((drawing) => drawing.id !== drawingId)
        );
      } else {
        throw new Error('削除に失敗しました');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('削除に失敗しました');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <CircleButton onClick={onBack} color="mint" size="medium">
          <Icon name="back" size="lg" />
        </CircleButton>

        <div>
          <h2 className="text-child-2xl font-bold text-kotochan-brown">
            おえかき かんり
          </h2>
          <p className="text-child-base text-kotochan-brown/70">
            保存された絵を確認・削除できます
          </p>
        </div>
      </div>

      {/* 描画一覧 */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4">
          保存された絵 ({drawings.length}枚)
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-child-base text-kotochan-brown/70">
              読み込み中...
            </p>
          </div>
        ) : drawings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-child-base text-kotochan-brown/70">
              まだ保存された絵がありません
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="bg-white rounded-kotochan overflow-hidden shadow-sm"
              >
                {/* 描画プレビュー */}
                <div className="aspect-square bg-kotochan-cream flex items-center justify-center relative">
                  {drawing.blobUrl || drawing.dataURL ? (
                    <div className="w-full h-full bg-white rounded-t-kotochan overflow-hidden">
                      {/* 実際の画像があれば表示 */}
                      <div className="w-full h-full bg-gradient-to-br from-kotochan-pink/20 via-kotochan-yellow/20 to-kotochan-mint/20 flex items-center justify-center">
                        <span className="text-4xl">🖼️</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl">🎨</span>
                  )}
                </div>

                {/* 描画情報 */}
                <div className="p-4">
                  <h4 className="text-child-base font-bold text-kotochan-brown mb-2 truncate">
                    {drawing.name}
                  </h4>

                  <div className="space-y-1 text-child-xs text-kotochan-brown/70">
                    <p>
                      作成日:{' '}
                      {new Date(drawing.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                    <p>サイズ: {formatFileSize(drawing.fileSize)}</p>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => deleteDrawing(drawing.id)}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-kotochan-sm',
                        'bg-kotochan-error text-white',
                        'text-child-xs font-bold',
                        'hover:bg-opacity-90 transition-colors'
                      )}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
