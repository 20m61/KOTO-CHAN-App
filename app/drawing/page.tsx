'use client';

import { PageContainer } from '@/components/layouts/PageContainer';
import { DrawingCanvas } from '@/components/features/drawing/DrawingCanvas';
import { DrawingControls } from '@/components/features/drawing/DrawingControls';
import { DrawingToolbar } from '@/components/features/drawing/DrawingToolbar';

export default function DrawingPage() {
  return (
    <PageContainer 
      title="おえかき"
      showBackButton={true}
      background="gradient"
      padding="medium"
    >
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
        {/* ツールバー */}
        <DrawingToolbar />
        
        {/* キャンバス */}
        <div className="flex-1 flex justify-center items-center">
          <DrawingCanvas />
        </div>
        
        {/* コントロール */}
        <DrawingControls />
      </div>
    </PageContainer>
  );
}