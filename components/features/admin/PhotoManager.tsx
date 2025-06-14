'use client';

import { useState, useCallback, useEffect } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils/cn';

interface PhotoData {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  fileSize: number;
}

interface PhotoManagerProps {
  onBack: () => void;
}

export function PhotoManager({ onBack }: PhotoManagerProps) {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/album/photos');
      const data = await response.json();

      if (data.success) {
        setPhotos(data.photos || []);
      }
    } catch (error) {
      console.error('Failed to load photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];

      // ファイル形式の確認
      if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください');
        return;
      }

      // ファイルサイズの確認（10MB以下）
      if (file.size > 10 * 1024 * 1024) {
        alert('ファイルサイズは10MB以下にしてください');
        return;
      }

      uploadPhoto(file);
    },
    []
  );

  const uploadPhoto = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowUploadModal(true);

    try {
      // FormDataを作成
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('name', file.name);

      // アップロード進行状況をシミュレート
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/album/photos', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // 新しい写真をリストに追加
          const newPhoto: PhotoData = {
            id: result.photo.id,
            name: result.photo.name,
            url: result.photo.url,
            uploadedAt: result.photo.uploadedAt,
            fileSize: result.photo.fileSize,
          };

          setPhotos((prev) => [newPhoto, ...prev]);

          setTimeout(() => {
            setShowUploadModal(false);
            setIsUploading(false);
          }, 1000);
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error('アップロードに失敗しました');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(
        error instanceof Error ? error.message : 'アップロードに失敗しました'
      );
      setShowUploadModal(false);
      setIsUploading(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    if (!confirm('この写真を削除しますか？')) return;

    try {
      const response = await fetch(`/api/album/photos?id=${photoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      } else {
        throw new Error('削除に失敗しました');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('削除に失敗しました');
    }
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
            しゃしん かんり
          </h2>
          <p className="text-child-base text-kotochan-brown/70">
            アルバムの写真を管理します
          </p>
        </div>
      </div>

      {/* アップロードボタン */}
      <div className="flex justify-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <CircleButton
            color="pink"
            size="large"
            disabled={isUploading}
            className={cn(isUploading && 'opacity-50 cursor-not-allowed')}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl">📸</span>
              <span className="text-child-sm font-bold mt-1">
                しゃしん ついか
              </span>
            </div>
          </CircleButton>
        </label>
      </div>

      {/* 写真一覧 */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4">
          保存された写真 ({photos.length}枚)
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-child-base text-kotochan-brown/70">
              読み込み中...
            </p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-child-base text-kotochan-brown/70">
              まだ写真がありません
              <br />
              上のボタンから追加してください
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group bg-white rounded-kotochan overflow-hidden shadow-sm"
              >
                <div className="aspect-square bg-kotochan-cream flex items-center justify-center relative overflow-hidden">
                  {photo.url.startsWith('http') ? (
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-4xl">🖼️</span>
                  )}
                </div>

                <div className="p-2">
                  <p className="text-child-xs font-bold text-kotochan-brown truncate">
                    {photo.name}
                  </p>
                  <p className="text-child-xs text-kotochan-brown/60">
                    {new Date(photo.uploadedAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className={cn(
                    'absolute top-2 right-2 w-8 h-8 rounded-full',
                    'bg-kotochan-error text-white',
                    'opacity-0 group-hover:opacity-100 transition-opacity',
                    'flex items-center justify-center text-sm font-bold'
                  )}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* アップロード進行状況モーダル */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => {}}
        title="しゃしん あっぷろーど"
      >
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">
            {uploadProgress === 100 ? '✅' : '📤'}
          </div>

          <p className="text-child-base text-kotochan-brown mb-4">
            {uploadProgress === 100 ? 'かんりょう！' : 'あっぷろーど中...'}
          </p>

          {/* プログレスバー */}
          <div className="w-full bg-kotochan-cream rounded-full h-4 mb-4">
            <div
              className="bg-kotochan-pink h-4 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <p className="text-child-sm text-kotochan-brown/70">
            {uploadProgress}%
          </p>
        </div>
      </Modal>
    </div>
  );
}
