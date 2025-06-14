'use client';

import { useState, useEffect } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils/cn';

interface UsageData {
  totalDrawings: number;
  totalPhotos: number;
  soundPlays: number;
  pageViews: {
    home: number;
    soundPlay: number;
    drawing: number;
    album: number;
  };
  lastActivity: string;
  appStartTime: string;
}

interface UsageStatsProps {
  onBack: () => void;
}

export function UsageStats({ onBack }: UsageStatsProps) {
  const [stats, setStats] = useState<UsageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // 実際のAPIエンドポイントがないので、サンプルデータを表示
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ローディング演出

      const sampleStats: UsageData = {
        totalDrawings: 5,
        totalPhotos: 12,
        soundPlays: 34,
        pageViews: {
          home: 18,
          soundPlay: 15,
          drawing: 8,
          album: 12,
        },
        lastActivity: new Date().toISOString(),
        appStartTime: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      setStats(sampleStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon: string;
  }) => (
    <div
      className={cn(
        'bg-white rounded-kotochan p-4 text-center',
        'border border-white/20 shadow-sm'
      )}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-child-xl font-bold text-kotochan-brown mb-1">
        {value}
      </div>
      <div className="text-child-sm text-kotochan-brown/70">{title}</div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-child-base text-kotochan-brown/70">
          使用状況を読み込み中...
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-child-base text-kotochan-brown/70">
          データの読み込みに失敗しました
        </p>
      </div>
    );
  }

  const totalPageViews = Object.values(stats.pageViews).reduce(
    (sum, count) => sum + count,
    0
  );
  const daysActive = Math.ceil(
    (new Date().getTime() - new Date(stats.appStartTime).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <CircleButton onClick={onBack} color="mint" size="medium">
          <Icon name="back" size="lg" />
        </CircleButton>

        <div>
          <h2 className="text-child-2xl font-bold text-kotochan-brown">
            つかった きろく
          </h2>
          <p className="text-child-base text-kotochan-brown/70">
            アプリの使用状況を確認できます
          </p>
        </div>
      </div>

      {/* 全体サマリー */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4 flex items-center gap-2">
          <span>📈</span>
          全体サマリー
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            title="つかった ひにち"
            value={`${daysActive}日`}
            icon="📅"
          />
          <StatCard
            title="がめん ひらいた"
            value={`${totalPageViews}回`}
            icon="📱"
          />
          <StatCard
            title="おと ならした"
            value={`${stats.soundPlays}回`}
            icon="🔊"
          />
          <StatCard
            title="え かいた"
            value={`${stats.totalDrawings}枚`}
            icon="🎨"
          />
        </div>
      </div>

      {/* ページ別アクセス */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4 flex items-center gap-2">
          <span>📊</span>
          ページ別利用状況
        </h3>

        <div className="space-y-4">
          {[
            {
              key: 'home',
              name: 'ホーム',
              icon: '🏠',
              count: stats.pageViews.home,
            },
            {
              key: 'soundPlay',
              name: 'おとあそび',
              icon: '🎵',
              count: stats.pageViews.soundPlay,
            },
            {
              key: 'drawing',
              name: 'おえかき',
              icon: '🎨',
              count: stats.pageViews.drawing,
            },
            {
              key: 'album',
              name: 'アルバム',
              icon: '📸',
              count: stats.pageViews.album,
            },
          ].map((page) => {
            const percentage =
              totalPageViews > 0 ? (page.count / totalPageViews) * 100 : 0;

            return (
              <div key={page.key} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <span className="text-xl">{page.icon}</span>
                  <span className="text-child-sm font-bold text-kotochan-brown">
                    {page.name}
                  </span>
                </div>

                <div className="flex-1 bg-kotochan-cream rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-kotochan-pink transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right">
                  <span className="text-child-sm font-bold text-kotochan-brown">
                    {page.count}回
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* コンテンツ統計 */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4 flex items-center gap-2">
          <span>📋</span>
          作成したコンテンツ
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="保存した絵"
            value={`${stats.totalDrawings}枚`}
            icon="🖼️"
          />
          <StatCard
            title="アルバム写真"
            value={`${stats.totalPhotos}枚`}
            icon="📷"
          />
        </div>
      </div>

      {/* 最終アクティビティ */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6 text-center'
        )}
      >
        <h3 className="text-child-base font-bold text-kotochan-brown mb-2">
          最後に使った時間
        </h3>
        <p className="text-child-sm text-kotochan-brown/70">
          {new Date(stats.lastActivity).toLocaleString('ja-JP')}
        </p>
      </div>
    </div>
  );
}
