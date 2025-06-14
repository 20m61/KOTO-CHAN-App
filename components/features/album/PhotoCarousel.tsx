'use client';

import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils/cn';

// デモ用の写真データ
const DEMO_PHOTOS = [
  {
    id: '1',
    src: '/images/demo/family-1.jpg',
    alt: 'ことちゃんの写真 1',
    caption: 'おうちで あそんでるよ'
  },
  {
    id: '2', 
    src: '/images/demo/family-2.jpg',
    alt: 'ことちゃんの写真 2',
    caption: 'おかあさんと いっしょ'
  },
  {
    id: '3',
    src: '/images/demo/family-3.jpg',
    alt: 'ことちゃんの写真 3', 
    caption: 'おとうさんと あそぼう'
  },
  {
    id: '4',
    src: '/images/demo/family-4.jpg',
    alt: 'ことちゃんの写真 4',
    caption: 'みんなで おでかけ'
  },
  {
    id: '5',
    src: '/images/demo/family-5.jpg',
    alt: 'ことちゃんの写真 5',
    caption: 'たんじょうび おめでとう'
  }
];

export function PhotoCarousel() {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false,
      containScroll: 'trimSnaps'
    },
    [autoplay]
  );

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

    // オートプレイ開始
    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
    }
  }, [emblaApi]);

  return (
    <div className="flex flex-col h-full">
      {/* メインカルーセル */}
      <div className="flex-1 relative">
        <div className="overflow-hidden h-full rounded-kotochan" ref={emblaRef}>
          <div className="flex h-full">
            {DEMO_PHOTOS.map((photo) => (
              <div key={photo.id} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative h-full w-full bg-white rounded-kotochan overflow-hidden shadow-lg">
                  {/* プレースホルダー画像 */}
                  <div className="w-full h-full bg-gradient-to-br from-kotochan-pink/20 via-kotochan-yellow/20 to-kotochan-mint/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">📸</div>
                      <h3 className="text-child-lg font-bold text-kotochan-brown mb-2">
                        {photo.alt}
                      </h3>
                      <p className="text-child-base text-kotochan-brown/70">
                        {photo.caption}
                      </p>
                      <p className="text-child-sm text-kotochan-brown/50 mt-4">
                        ここに しゃしんが はいるよ
                      </p>
                    </div>
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
        <CircleButton
          onClick={toggleAutoplay}
          color="pink"
          size="medium"
        >
          <div className="flex flex-col items-center">
            <Icon name="play" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              じどう
            </span>
          </div>
        </CircleButton>

        {/* インジケーター */}
        <div className="flex gap-2">
          {DEMO_PHOTOS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === 0 
                  ? "bg-kotochan-pink" 
                  : "bg-kotochan-brown/30"
              )}
            />
          ))}
        </div>

        <CircleButton
          color="yellow"
          size="medium"
          disabled
        >
          <div className="flex flex-col items-center">
            <Icon name="photo" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              ついか
            </span>
          </div>
        </CircleButton>
      </div>
    </div>
  );
}