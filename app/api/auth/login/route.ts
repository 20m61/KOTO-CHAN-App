import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// 環境変数からパスワード（生年月日）を取得
const BIRTH_DATE = process.env.KOTO_BIRTH_DATE || '20231201'; // デフォルト: 2023年12月1日

interface LoginRequest {
  birthDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // 生年月日の検証
    if (body.birthDate === BIRTH_DATE) {
      // セッションIDを生成
      const sessionId = crypto.randomUUID();
      const sessionData = {
        id: sessionId,
        authenticated: true,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24時間
      };

      // KVにセッションを保存
      try {
        await kv.set(`session:${sessionId}`, sessionData, { ex: 86400 }); // 24時間で期限切れ
      } catch (kvError) {
        console.warn('KV storage not available, using fallback session');
      }

      // レスポンスにセッションIDをセット
      const response = NextResponse.json({
        success: true,
        sessionId,
        message: 'ログインに成功しました',
      });

      // HTTPOnlyクッキーにセッションIDを設定
      response.cookies.set('koto-session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 24時間
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'たんじょうびが ちがいます',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ことちゃんバースデーアプリ認証API',
    version: '1.0.0',
  });
}
