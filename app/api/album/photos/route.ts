import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';

interface PhotoData {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  fileSize: number;
  mimeType: string;
}

async function validateSession(request: NextRequest): Promise<boolean> {
  const sessionId = request.cookies.get('koto-session')?.value;
  if (!sessionId) return false;

  try {
    const sessionData = (await kv.get(`session:${sessionId}`)) as {
      authenticated?: boolean;
    } | null;
    return sessionData?.authenticated === true;
  } catch (error) {
    // KVが利用できない場合は緩い検証
    return sessionId.length === 36; // UUID形式
  }
}

export async function GET() {
  try {
    // 写真一覧の取得（認証不要）
    let photos: PhotoData[] = [];

    try {
      const stored = await kv.get('album:photos');
      if (stored && Array.isArray(stored)) {
        photos = stored;
      }
    } catch (kvError) {
      console.warn('KV storage not available for photos list');
    }

    // 最新順でソート
    photos = photos
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
      .slice(0, 50); // 最新50件

    return NextResponse.json({
      success: true,
      photos,
      count: photos.length,
    });
  } catch (error) {
    console.error('Photos GET error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
        photos: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 写真のアップロードは認証が必要
    const isAuthenticated = await validateSession(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: '認証が必要です',
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('photo') as File;
    const name = formData.get('name') as string;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: 'ファイルが選択されていません',
        },
        { status: 400 }
      );
    }

    // ファイル形式の確認
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        {
          success: false,
          message: '画像ファイルのみアップロード可能です',
        },
        { status: 400 }
      );
    }

    // ファイルサイズ制限（10MB）
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: 'ファイルサイズは10MB以下にしてください',
        },
        { status: 400 }
      );
    }

    const photoId = crypto.randomUUID();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `photo-${photoId}.${fileExtension}`;
    const defaultName =
      name || `写真 ${new Date().toLocaleDateString('ja-JP')}`;

    let photoUrl: string;

    // Vercel Blob にアップロード
    try {
      const buffer = await file.arrayBuffer();
      const blob = await put(fileName, buffer, {
        access: 'public',
        contentType: file.type,
      });
      photoUrl = blob.url;
    } catch (blobError) {
      console.warn('Blob storage not available:', blobError);
      return NextResponse.json(
        {
          success: false,
          message: 'ファイルのアップロードに失敗しました',
        },
        { status: 500 }
      );
    }

    const photoData: PhotoData = {
      id: photoId,
      name: defaultName,
      url: photoUrl,
      uploadedAt: new Date().toISOString(),
      fileSize: file.size,
      mimeType: file.type,
    };

    // 既存の写真リストを取得
    let photos: PhotoData[] = [];
    try {
      const stored = await kv.get('album:photos');
      if (stored && Array.isArray(stored)) {
        photos = stored;
      }
    } catch (kvError) {
      console.warn('KV storage not available for photos save');
    }

    // 新しい写真を追加
    photos.unshift(photoData);

    // 最新50件に制限
    photos = photos.slice(0, 50);

    // KVに保存
    try {
      await kv.set('album:photos', photos);
      await kv.set(`photo:${photoId}`, photoData);
    } catch (kvError) {
      console.warn('KV storage save failed:', kvError);
    }

    return NextResponse.json({
      success: true,
      message: '写真をアップロードしました',
      photo: photoData,
    });
  } catch (error) {
    console.error('Photos POST error:', error);
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
    // 写真の削除は認証が必要
    const isAuthenticated = await validateSession(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: '認証が必要です',
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');

    if (!photoId) {
      return NextResponse.json(
        {
          success: false,
          message: '写真IDが必要です',
        },
        { status: 400 }
      );
    }

    // 写真データを取得
    let photoData: PhotoData | null = null;
    try {
      photoData = await kv.get(`photo:${photoId}`);
    } catch (kvError) {
      console.warn('KV storage not available for photo delete');
    }

    if (!photoData) {
      return NextResponse.json(
        {
          success: false,
          message: '写真が見つかりません',
        },
        { status: 404 }
      );
    }

    // 写真リストから削除
    try {
      const stored = await kv.get('album:photos');
      if (stored && Array.isArray(stored)) {
        const photos = (stored as PhotoData[]).filter((p) => p.id !== photoId);
        await kv.set('album:photos', photos);
      }
      await kv.del(`photo:${photoId}`);
    } catch (kvError) {
      console.warn('KV storage delete failed:', kvError);
    }

    // TODO: Blobファイルも削除（今後実装）

    return NextResponse.json({
      success: true,
      message: '写真を削除しました',
    });
  } catch (error) {
    console.error('Photos DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}
