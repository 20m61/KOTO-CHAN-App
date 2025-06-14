import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
// import { put } from '@vercel/blob';

interface DrawingData {
  id: string;
  name: string;
  dataURL: string;
  createdAt: string;
  fileSize: number;
  blobUrl?: string;
}

export async function GET() {
  try {
    // 描画一覧の取得
    let drawings: DrawingData[] = [];

    try {
      const stored = await kv.get('drawings:list');
      if (stored && Array.isArray(stored)) {
        drawings = stored;
      }
    } catch (kvError) {
      console.warn('KV storage not available for drawings list');
    }

    // 最新20件に制限
    drawings = drawings
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      drawings,
      count: drawings.length,
    });
  } catch (error) {
    console.error('Drawings GET error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
        drawings: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, dataURL } = body;

    if (!dataURL || !dataURL.startsWith('data:image/')) {
      return NextResponse.json(
        {
          success: false,
          message: '無効な画像データです',
        },
        { status: 400 }
      );
    }

    // Base64データを Blob に変換
    const base64Data = dataURL.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    const fileSize = buffer.length;

    // ファイルサイズ制限（5MB）
    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: 'ファイルサイズが大きすぎます（5MB以下にしてください）',
        },
        { status: 400 }
      );
    }

    const drawingId = crypto.randomUUID();
    // const fileName = `drawing-${drawingId}.png`;
    const defaultName = `おえかき ${new Date().toLocaleDateString('ja-JP')}`;

    let blobUrl: string | undefined;

    // TODO: Vercel Blob サポートは後で実装
    // 現在はdataURLのみで対応

    const drawingData: DrawingData = {
      id: drawingId,
      name: name || defaultName,
      dataURL: blobUrl ? '' : dataURL, // Blobがある場合はdataURLを保存しない
      createdAt: new Date().toISOString(),
      fileSize,
      blobUrl,
    };

    // 既存の描画リストを取得
    let drawings: DrawingData[] = [];
    try {
      const stored = await kv.get('drawings:list');
      if (stored && Array.isArray(stored)) {
        drawings = stored;
      }
    } catch (kvError) {
      console.warn('KV storage not available for drawings save');
    }

    // 新しい描画を追加
    drawings.unshift(drawingData);

    // 最新20件に制限
    drawings = drawings.slice(0, 20);

    // KVに保存
    try {
      await kv.set('drawings:list', drawings);
      await kv.set(`drawing:${drawingId}`, drawingData);
    } catch (kvError) {
      console.warn('KV storage save failed:', kvError);
    }

    return NextResponse.json({
      success: true,
      message: 'おえかきを保存しました',
      drawing: drawingData,
    });
  } catch (error) {
    console.error('Drawings POST error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const drawingId = searchParams.get('id');

    if (!drawingId) {
      return NextResponse.json(
        {
          success: false,
          message: '描画IDが必要です',
        },
        { status: 400 }
      );
    }

    // 描画データを取得
    let drawingData: DrawingData | null = null;
    try {
      drawingData = await kv.get(`drawing:${drawingId}`);
    } catch (kvError) {
      console.warn('KV storage not available for drawing delete');
    }

    if (!drawingData) {
      return NextResponse.json(
        {
          success: false,
          message: '描画が見つかりません',
        },
        { status: 404 }
      );
    }

    // 描画リストから削除
    try {
      const stored = await kv.get('drawings:list');
      if (stored && Array.isArray(stored)) {
        const drawings = (stored as DrawingData[]).filter(
          (d) => d.id !== drawingId
        );
        await kv.set('drawings:list', drawings);
      }
      await kv.del(`drawing:${drawingId}`);
    } catch (kvError) {
      console.warn('KV storage delete failed:', kvError);
    }

    // TODO: Blobファイルも削除（今後実装）

    return NextResponse.json({
      success: true,
      message: '描画を削除しました',
    });
  } catch (error) {
    console.error('Drawings DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}
