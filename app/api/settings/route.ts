import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface AppSettings {
  masterVolume: number;
  effectsVolume: number;
  musicVolume: number;
  audioEnabled: boolean;
  birthdayMode: boolean;
  theme: 'default' | 'birthday' | 'stars';
  lastUpdated: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  masterVolume: 0.7,
  effectsVolume: 0.8,
  musicVolume: 0.4,
  audioEnabled: true,
  birthdayMode: false,
  theme: 'default',
  lastUpdated: new Date().toISOString(),
};

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
    // 設定データの取得は認証不要（アプリ全体で使用）
    let settings;
    try {
      settings = await kv.get('app:settings');
    } catch (kvError) {
      console.warn('KV storage not available, using default settings');
    }

    return NextResponse.json({
      success: true,
      settings: settings || DEFAULT_SETTINGS,
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
        settings: DEFAULT_SETTINGS,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 設定の更新は認証が必要
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

    const body: Partial<AppSettings> = await request.json();

    // 現在の設定を取得
    let currentSettings = DEFAULT_SETTINGS;
    try {
      const stored = await kv.get('app:settings');
      if (stored) currentSettings = stored as AppSettings;
    } catch (kvError) {
      console.warn('KV storage not available for settings update');
    }

    // 設定をマージ
    const updatedSettings: AppSettings = {
      ...currentSettings,
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    // 設定値の検証
    if (typeof updatedSettings.masterVolume === 'number') {
      updatedSettings.masterVolume = Math.max(
        0,
        Math.min(1, updatedSettings.masterVolume)
      );
    }
    if (typeof updatedSettings.effectsVolume === 'number') {
      updatedSettings.effectsVolume = Math.max(
        0,
        Math.min(1, updatedSettings.effectsVolume)
      );
    }
    if (typeof updatedSettings.musicVolume === 'number') {
      updatedSettings.musicVolume = Math.max(
        0,
        Math.min(1, updatedSettings.musicVolume)
      );
    }

    // KVに保存
    try {
      await kv.set('app:settings', updatedSettings);
    } catch (kvError) {
      console.warn('KV storage not available for settings save');
    }

    return NextResponse.json({
      success: true,
      message: '設定を保存しました',
      settings: updatedSettings,
    });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'エラーが発生しました',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // POST と同じ処理
  return POST(request);
}
