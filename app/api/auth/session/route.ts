import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('koto-session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        {
          authenticated: false,
          message: 'セッションが見つかりません',
        },
        { status: 401 }
      );
    }

    // KVからセッションデータを取得
    let sessionData: { authenticated?: boolean; expiresAt?: number } | null =
      null;
    try {
      sessionData = (await kv.get(`session:${sessionId}`)) as {
        authenticated?: boolean;
        expiresAt?: number;
      } | null;
    } catch (kvError) {
      console.warn('KV storage not available, using fallback validation');
      // KVが利用できない場合はセッションIDの形式のみチェック
      if (sessionId.length === 36) {
        // UUID形式
        sessionData = { authenticated: true };
      }
    }

    if (!sessionData || !sessionData.authenticated) {
      return NextResponse.json(
        {
          authenticated: false,
          message: 'セッションが無効です',
        },
        { status: 401 }
      );
    }

    // セッションの有効期限をチェック（KVが利用可能な場合）
    if (sessionData.expiresAt) {
      const expiresAt = new Date(sessionData.expiresAt);
      if (expiresAt < new Date()) {
        // 期限切れセッションを削除
        try {
          await kv.del(`session:${sessionId}`);
        } catch (kvError) {
          console.warn('KV delete failed:', kvError);
        }

        return NextResponse.json(
          {
            authenticated: false,
            message: 'セッションの有効期限が切れました',
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      authenticated: true,
      sessionId,
      message: 'セッションが有効です',
    });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      {
        authenticated: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('koto-session')?.value;

    if (sessionId) {
      // KVからセッションを削除
      try {
        await kv.del(`session:${sessionId}`);
      } catch (kvError) {
        console.warn('KV delete failed:', kvError);
      }
    }

    // クッキーを削除
    const response = NextResponse.json({
      success: true,
      message: 'ログアウトしました',
    });

    response.cookies.set('koto-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}
