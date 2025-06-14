'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { SoundBoard } from '@/components/features/sound-play/SoundBoard';
import { SoundCategory } from '@/components/features/sound-play/SoundCategory';
import { SOUND_CATEGORIES, type SoundCategory as SoundCategoryType } from '@/lib/constants/sounds';

export default function SoundPlayPage() {
  const [activeCategory, setActiveCategory] = useState<SoundCategoryType>('animals');

  return (
    <PageContainer 
      title="おとあそび"
      showBackButton={true}
      background="gradient"
      padding="large"
    >
      <div className="flex flex-col gap-6">
        {/* カテゴリ選択 */}
        <SoundCategory
          categories={SOUND_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* サウンドボード */}
        <SoundBoard category={activeCategory} />
      </div>
    </PageContainer>
  );
}