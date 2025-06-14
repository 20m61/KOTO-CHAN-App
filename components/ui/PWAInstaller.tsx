'use client';

import { useEffect, useState } from 'react';
import { CircleButton } from './CircleButton';
import { Icon } from './Icon';
import { Modal } from './Modal';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstaller() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Service Worker登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker登録成功:', registration.scope);
        })
        .catch((error) => {
          console.error('❌ Service Worker登録失敗:', error);
        });
    }

    // PWAインストール可能状態を監視
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);
      console.log('📱 PWAインストール可能');
    };

    // アプリがインストール済みかチェック
    const checkIfInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        console.log('📱 PWAとして起動済み');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ ユーザーがPWAインストールを承認');
        setIsInstalled(true);
      } else {
        console.log('❌ ユーザーがPWAインストールを拒否');
      }
      
      setInstallPrompt(null);
      setIsInstallable(false);
      setShowInstallModal(false);
    } catch (error) {
      console.error('❌ PWAインストールエラー:', error);
    }
  };

  // インストール済みまたはインストール不可の場合は非表示
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <>
      {/* インストールボタン */}
      <div className="fixed bottom-4 right-4 z-50">
        <CircleButton
          onClick={() => setShowInstallModal(true)}
          color="yellow"
          size="medium"
          className="shadow-lg animate-bounce"
        >
          <div className="flex flex-col items-center">
            <Icon name="download" size="lg" />
            <span className="text-child-xs font-bold mt-1">
              アプリ
            </span>
          </div>
        </CircleButton>
      </div>

      {/* インストール説明モーダル */}
      <Modal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        title="📱 アプリをインストール"
      >
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">📲</div>
          
          <h3 className="text-child-lg font-bold text-kotochan-brown mb-4">
            ことちゃんアプリを<br />ホーム画面に追加しませんか？
          </h3>
          
          <div className="text-child-base text-kotochan-brown/80 mb-6 space-y-2">
            <p>✨ ホーム画面からすぐに起動</p>
            <p>🚀 より快適な操作</p>
            <p>📱 アプリのような使い心地</p>
            <p>🔄 オフラインでも一部機能が利用可能</p>
          </div>

          <div className="flex gap-3 justify-center">
            <CircleButton
              onClick={() => setShowInstallModal(false)}
              color="brown"
              size="medium"
            >
              <span className="text-child-sm font-bold">
                あとで
              </span>
            </CircleButton>
            
            <CircleButton
              onClick={handleInstallClick}
              color="pink"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <Icon name="download" size="md" />
                <span className="text-child-sm font-bold mt-1">
                  インストール
                </span>
              </div>
            </CircleButton>
          </div>
        </div>
      </Modal>
    </>
  );
}