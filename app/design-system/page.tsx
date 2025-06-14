'use client';

import { useState } from 'react';
import { 
  CircleButton, 
  Icon, 
  ColorPalette, 
  LoadingSpinner, 
  LoadingScreen, 
  Modal, 
  Sparkles 
} from '@/components/ui';
import { PageContainer, GridLayout } from '@/components/layouts';

export default function DesignSystemPage() {
  const [showModal, setShowModal] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFB6C1');

  if (showLoadingScreen) {
    return <LoadingScreen message="デザインシステムをよみこみちゅう..." />;
  }

  return (
    <PageContainer
      title="デザインシステム"
      showBackButton
      background="stars"
      className="space-y-8"
    >
      <>
      {/* CircleButton Examples */}
      <section className="space-y-4">
        <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
          🔘 円形ボタン
        </h2>
        
        <div className="space-y-6">
          {/* サイズバリエーション */}
          <div className="text-center">
            <h3 className="text-child-base font-bold text-kotochan-brown mb-4">
              サイズ
            </h3>
            <div className="flex items-end justify-center gap-4">
              <CircleButton
                size="small"
                color="pink"
                icon={<Icon name="dog" />}
                label="小"
              />
              <CircleButton
                size="medium"
                color="mint"
                icon={<Icon name="cat" />}
                label="中"
              />
              <CircleButton
                size="large"
                color="yellow"
                icon={<Icon name="bird" />}
                label="大"
              />
              <CircleButton
                size="xlarge"
                color="blue"
                icon={<Icon name="piano" />}
                label="特大"
              />
            </div>
          </div>

          {/* カラーバリエーション */}
          <div className="text-center">
            <h3 className="text-child-base font-bold text-kotochan-brown mb-4">
              カラー
            </h3>
            <GridLayout columns={3} gap="medium">
              <>
              <CircleButton
                color="pink"
                icon={<Icon name="heart" />}
                label="ピンク"
              />
              <CircleButton
                color="yellow"
                icon={<Icon name="star" />}
                label="イエロー"
              />
              <CircleButton
                color="mint"
                icon={<Icon name="music" />}
                label="ミント"
              />
              <CircleButton
                color="blue"
                icon={<Icon name="photo" />}
                label="ブルー"
              />
              <CircleButton
                color="orange"
                icon={<Icon name="balloon" />}
                label="オレンジ"
              />
              <CircleButton
                color="purple"
                icon={<Icon name="sparkle" />}
                label="パープル"
              />
              </>
            </GridLayout>
          </div>
        </div>
      </section>

      {/* Icon Examples */}
      <section className="space-y-4">
        <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
          🎨 アイコン
        </h2>
        
        <div className="grid grid-cols-4 gap-4 place-items-center">
          {/* 動物アイコン */}
          <div className="text-center">
            <Icon name="dog" size="2xl" color="brown" />
            <p className="text-child-xs text-kotochan-brown mt-1">いぬ</p>
          </div>
          <div className="text-center">
            <Icon name="cat" size="2xl" color="pink" />
            <p className="text-child-xs text-kotochan-brown mt-1">ねこ</p>
          </div>
          <div className="text-center">
            <Icon name="bird" size="2xl" color="blue" />
            <p className="text-child-xs text-kotochan-brown mt-1">とり</p>
          </div>
          <div className="text-center">
            <Icon name="cow" size="2xl" color="mint" />
            <p className="text-child-xs text-kotochan-brown mt-1">うし</p>
          </div>
          
          {/* 楽器アイコン */}
          <div className="text-center">
            <Icon name="piano" size="2xl" color="yellow" />
            <p className="text-child-xs text-kotochan-brown mt-1">ピアノ</p>
          </div>
          <div className="text-center">
            <Icon name="drum" size="2xl" color="orange" />
            <p className="text-child-xs text-kotochan-brown mt-1">たいこ</p>
          </div>
          <div className="text-center">
            <Icon name="bell" size="2xl" color="mint" />
            <p className="text-child-xs text-kotochan-brown mt-1">すず</p>
          </div>
          <div className="text-center">
            <Icon name="flute" size="2xl" color="blue" />
            <p className="text-child-xs text-kotochan-brown mt-1">フルート</p>
          </div>
        </div>
      </section>

      {/* ColorPalette Examples */}
      <section className="space-y-4">
        <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
          🎨 カラーパレット
        </h2>
        
        <div className="text-center space-y-4">
          <ColorPalette
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            size="large"
          />
          <p className="text-child-base text-kotochan-brown">
            選択した色: <span style={{ color: selectedColor }}>●</span> {selectedColor}
          </p>
        </div>
      </section>

      {/* Loading Examples */}
      <section className="space-y-4">
        <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
          ⏳ ローディング
        </h2>
        
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <LoadingSpinner size="small" color="pink" />
            <p className="text-child-xs text-kotochan-brown mt-2">小</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="medium" color="mint" />
            <p className="text-child-xs text-kotochan-brown mt-2">中</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="large" color="blue" />
            <p className="text-child-xs text-kotochan-brown mt-2">大</p>
          </div>
        </div>
        
        <div className="text-center">
          <CircleButton
            color="yellow"
            icon={<Icon name="loading" />}
            label="ローディング画面テスト"
            onClick={() => {
              setShowLoadingScreen(true);
              setTimeout(() => setShowLoadingScreen(false), 3000);
            }}
          />
        </div>
      </section>

      {/* Modal Example */}
      <section className="space-y-4">
        <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
          💬 モーダル
        </h2>
        
        <div className="text-center">
          <CircleButton
            color="orange"
            icon={<Icon name="settings" />}
            label="モーダルを開く"
            onClick={() => setShowModal(true)}
          />
        </div>
      </section>

      {/* Sparkles Background */}
      <div className="relative">
        <Sparkles count={15} size="small" speed="slow" />
        
        <section className="space-y-4 relative z-10">
          <h2 className="text-child-xl font-bold text-kotochan-brown text-center">
            ✨ キラキラエフェクト
          </h2>
          <p className="text-child-base text-kotochan-brown text-center">
            この周りにキラキラが舞っています！
          </p>
        </section>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="テストモーダル"
        size="medium"
      >
        <div className="space-y-4">
          <p className="text-child-base text-kotochan-brown">
            これはモーダルのテストです。
          </p>
          <p className="text-child-sm text-kotochan-brown">
            外側をクリックするかESCキーで閉じることができます。
          </p>
          
          <div className="flex justify-center gap-4">
            <CircleButton
              color="mint"
              icon={<Icon name="success" />}
              label="OK"
              onClick={() => setShowModal(false)}
            />
            <CircleButton
              color="pink"
              icon={<Icon name="clear" />}
              label="キャンセル"
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>
      </Modal>
      </>
    </PageContainer>
  );
}