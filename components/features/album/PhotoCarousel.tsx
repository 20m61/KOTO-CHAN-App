'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface PhotoData {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  fileSize: number;
  mimeType: string;
}

// デモ用の写真データ（APIから取得できない場合のフォールバック）
const DEMO_PHOTOS = [
  {
    id: '1',
    name: 'ことちゃんの写真 1',
    url: '/images/demo/family-1.jpg',
    uploadedAt: new Date().toISOString(),
    fileSize: 1024,
    mimeType: 'image/jpeg',
  },
  {
    id: '2',
    name: 'ことちゃんの写真 2',
    url: '/images/demo/family-2.jpg',
    uploadedAt: new Date().toISOString(),
    fileSize: 1024,
    mimeType: 'image/jpeg',
  },
  {
    id: '3',
    name: 'ことちゃんの写真 3',
    url: '/images/demo/family-3.jpg',
    uploadedAt: new Date().toISOString(),
    fileSize: 1024,
    mimeType: 'image/jpeg',
  },
  {
    id: '4',
    name: 'ことちゃんの写真 4',
    url: '/images/demo/family-4.jpg',
    uploadedAt: new Date().toISOString(),
    fileSize: 1024,
    mimeType: 'image/jpeg',
  },
  {
    id: '5',
    name: 'ことちゃんの写真 5',
    url: '/images/demo/family-5.jpg',
    uploadedAt: new Date().toISOString(),
    fileSize: 1024,
    mimeType: 'image/jpeg',
  },
];

export function PhotoCarousel() {
  const [photos, setPhotos] = useState<PhotoData[]>(DEMO_PHOTOS);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: photos.length > 1,
      align: 'center',
      skipSnaps: false,
      containScroll: 'trimSnaps',
    },
    [autoplay]
  );

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/album/photos');
      const data = await response.json();

      if (data.success && data.photos.length > 0) {
        setPhotos(data.photos);
      } else {
        // APIから写真が取得できない場合はデモ用データを使用
        setPhotos(DEMO_PHOTOS);
      }
    } catch (error) {
      console.error('Failed to load photos:', error);
      // エラーの場合もデモ用データを使用
      setPhotos(DEMO_PHOTOS);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    const isPlaying = autoplayPlugin.isPlaying();
    if (isPlaying) autoplayPlugin.stop();
    else autoplayPlugin.play();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // 現在のスライドインデックスを追跡
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    // オートプレイ開始
    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (autoplayPlugin && photos.length > 1) {
      autoplayPlugin.play();
    }

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, photos.length]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-8xl mb-4">📸</div>
        <p className="text-child-base text-kotochan-brown/70">
          しゃしんを よみこんでいるよ...
        </p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-8xl mb-4">📷</div>
        <p className="text-child-base text-kotochan-brown/70 text-center">
          まだ しゃしんが ないよ
          <br />
          おとなメニューから ついか してね
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* メインカルーセル */}
      <div className="flex-1 relative">
        <div className="overflow-hidden h-full rounded-kotochan" ref={emblaRef}>
          <div className="flex h-full">
            {photos.map((photo) => (
              <div key={photo.id} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative h-full w-full bg-white rounded-kotochan overflow-hidden shadow-lg">
                  {/* 実際の画像または プレースホルダー */}
                  {photo.url.startsWith('http') ? (
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority={currentIndex === photos.indexOf(photo)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-kotochan-pink/20 via-kotochan-yellow/20 to-kotochan-mint/20 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-8xl mb-4">📸</div>
                        <h3 className="text-child-lg font-bold text-kotochan-brown mb-2">
                          {photo.name}
                        </h3>
                        <p className="text-child-sm text-kotochan-brown/50 mt-4">
                          ここに しゃしんが はいるよ
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 写真情報オーバーレイ */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-child-lg font-bold text-white mb-1">
                      {photo.name}
                    </h3>
                    <p className="text-child-sm text-white/80">
                      {new Date(photo.uploadedAt).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <CircleButton
            onClick={scrollPrev}
            color="mint"
            size="medium"
            className="bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <Icon name="back" size="lg" />
          </CircleButton>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <CircleButton
            onClick={scrollNext}
            color="mint"
            size="medium"
            className="bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <Icon name="back" size="lg" className="rotate-180" />
          </CircleButton>
        </div>
      </div>

      {/* コントロール */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <CircleButton onClick={toggleAutoplay} color="pink" size="medium">
          <div className="flex flex-col items-center">
            <Icon name="play" size="lg" />
            <span className="text-child-xs font-bold mt-1">じどう</span>
          </div>
        </CircleButton>

        {/* インジケーター */}
        <div className="flex gap-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index === currentIndex
                  ? 'bg-kotochan-pink'
                  : 'bg-kotochan-brown/30'
              )}
            />
          ))}
        </div>

        <CircleButton color="yellow" size="medium" disabled>
          <div className="flex flex-col items-center">
            <Icon name="photo" size="lg" />
            <span className="text-child-xs font-bold mt-1">ついか</span>
          </div>
        </CircleButton>
      </div>
    </div>
  );
}
