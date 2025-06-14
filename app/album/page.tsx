'use client';

import { PageContainer } from '@/components/layouts/PageContainer';
import { PhotoCarousel } from '@/components/features/album/PhotoCarousel';

export default function AlbumPage() {
  return (
    <PageContainer 
      title="アルバム"
      showBackButton={true}
      background="gradient"
      padding="medium"
    >
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <PhotoCarousel />
      </div>
    </PageContainer>
  );
}