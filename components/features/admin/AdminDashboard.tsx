'use client';

import { useState } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { PhotoManager } from './PhotoManager';
import { SettingsManager } from './SettingsManager';
import { DrawingsManager } from './DrawingsManager';
import { UsageStats } from './UsageStats';
import { useAdminStore } from '@/lib/store/adminStore';
import { cn } from '@/lib/utils/cn';

type AdminView = 'dashboard' | 'photos' | 'drawings' | 'settings' | 'stats';

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const { logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
  };

  const menuItems = [
    {
      id: 'photos' as AdminView,
      title: 'しゃしん かんり',
      description: 'アルバムの写真を追加・削除',
      icon: '📸',
      color: 'pink' as const,
    },
    {
      id: 'drawings' as AdminView,
      title: 'おえかき かんり',
      description: '保存された絵を確認・削除',
      icon: '🎨',
      color: 'mint' as const,
    },
    {
      id: 'settings' as AdminView,
      title: 'せってい',
      description: 'アプリの設定を変更',
      icon: '⚙️',
      color: 'yellow' as const,
    },
    {
      id: 'stats' as AdminView,
      title: 'つかった きろく',
      description: 'アプリの使用状況を確認',
      icon: '📊',
      color: 'blue' as const,
    },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'photos':
        return <PhotoManager onBack={() => setCurrentView('dashboard')} />;
      case 'drawings':
        return <DrawingsManager onBack={() => setCurrentView('dashboard')} />;
      case 'settings':
        return <SettingsManager onBack={() => setCurrentView('dashboard')} />;
      case 'stats':
        return <UsageStats onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
          <div className="flex flex-col gap-8">
            {/* ヘッダー */}
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍💼</div>
              <h2 className="text-child-2xl font-bold text-kotochan-brown mb-2">
                おとなメニュー
              </h2>
              <p className="text-child-base text-kotochan-brown/70">
                ことちゃんアプリの管理画面です
              </p>
            </div>

            {/* メニューグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'bg-white/50 backdrop-blur-sm rounded-kotochan',
                    'border border-white/20 shadow-sm p-6',
                    'transition-all duration-200 hover:shadow-lg'
                  )}
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{item.icon}</div>
                    <h3 className="text-child-lg font-bold text-kotochan-brown mb-1">
                      {item.title}
                    </h3>
                    <p className="text-child-sm text-kotochan-brown/70">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <CircleButton
                      onClick={() => setCurrentView(item.id)}
                      color={item.color}
                      size="large"
                    >
                      <div className="flex flex-col items-center">
                        <Icon name="settings" size="lg" />
                        <span className="text-child-xs font-bold mt-1">
                          ひらく
                        </span>
                      </div>
                    </CircleButton>
                  </div>
                </div>
              ))}
            </div>

            {/* ログアウトボタン */}
            <div className="flex justify-center mt-8">
              <CircleButton onClick={handleLogout} color="brown" size="large">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🚪</span>
                  <span className="text-child-sm font-bold mt-1">
                    ろぐあうと
                  </span>
                </div>
              </CircleButton>
            </div>
          </div>
        );
    }
  };

  return <div className="w-full max-w-6xl mx-auto">{renderCurrentView()}</div>;
}
