import { useCallback, useRef, useState } from 'react';
import { Howl } from 'howler';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  onEnd?: () => void;
}

/**
 * 個別音声ファイル用のフック
 */
export function useSound(src: string, options: SoundOptions = {}) {
  const soundRef = useRef<Howl | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    if (isPlaying) return;

    try {
      setIsLoading(true);

      // 既存の音声を停止
      if (soundRef.current) {
        soundRef.current.stop();
      }

      // 新しい音声インスタンスを作成
      const sound = new Howl({
        src: [src],
        volume: options.volume || 0.7,
        loop: options.loop || false,
        html5: true,
        onload: () => {
          setIsLoading(false);
        },
        onplay: () => {
          setIsPlaying(true);
        },
        onend: () => {
          setIsPlaying(false);
          if (options.onEnd) {
            options.onEnd();
          }
        },
        onstop: () => {
          setIsPlaying(false);
        },
        onloaderror: (id, error) => {
          console.error('Sound load error:', error);
          setIsLoading(false);
          setIsPlaying(false);
        },
        onplayerror: (id, error) => {
          console.error('Sound play error:', error);
          setIsLoading(false);
          setIsPlaying(false);
        }
      });

      soundRef.current = sound;
      sound.play();

    } catch (error) {
      console.error('音声再生エラー:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [src, options, isPlaying]);

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  return {
    play,
    stop,
    isLoading,
    isPlaying
  };
}

/**
 * 音声管理用のマネージャーフック
 */
export function useSoundManager() {
  const soundsRef = useRef<Map<string, Howl>>(new Map());

  const playSound = useCallback(
    async (src: string, options: SoundOptions = {}) => {
      const { volume = 1, loop = false, onEnd } = options;

      try {
        // キャッシュから音声を取得または新規作成
        let sound = soundsRef.current.get(src);
        
        if (!sound) {
          sound = new Howl({
            src: [src],
            volume,
            loop,
            html5: true, // モバイル対応
            onend: onEnd,
          });
          
          soundsRef.current.set(src, sound);
        } else {
          // 既存の音声の設定を更新
          sound.volume(volume);
          sound.loop(loop);
        }

        // 再生
        sound.play();

        return sound;
      } catch (error) {
        console.error('音声再生エラー:', error);
        return null;
      }
    },
    []
  );

  const stopSound = useCallback((src: string) => {
    const sound = soundsRef.current.get(src);
    if (sound) {
      sound.stop();
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    soundsRef.current.forEach((sound) => {
      sound.stop();
    });
  }, []);

  const setVolume = useCallback((src: string, volume: number) => {
    const sound = soundsRef.current.get(src);
    if (sound) {
      sound.volume(volume);
    }
  }, []);

  // クリーンアップ
  const cleanup = useCallback(() => {
    soundsRef.current.forEach((sound) => {
      sound.unload();
    });
    soundsRef.current.clear();
  }, []);

  return {
    playSound,
    stopSound,
    stopAllSounds,
    setVolume,
    cleanup,
  };
}