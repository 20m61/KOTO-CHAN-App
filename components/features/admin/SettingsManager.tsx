'use client';

import { useState, useEffect } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils/cn';

interface AppSettings {
  masterVolume: number;
  effectsVolume: number;
  musicVolume: number;
  audioEnabled: boolean;
  birthdayMode: boolean;
  theme: 'default' | 'birthday' | 'stars';
  lastUpdated: string;
}

interface SettingsManagerProps {
  onBack: () => void;
}

export function SettingsManager({ onBack }: SettingsManagerProps) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    setIsSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
        // 成功フィードバック
        const button = document.activeElement as HTMLElement;
        if (button) {
          button.style.backgroundColor = '#32CD32';
          setTimeout(() => {
            button.style.backgroundColor = '';
          }, 500);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('設定の保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof AppSettings, value: any) => {
    if (!settings) return;

    const newSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const VolumeSlider = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => (
    <div className="space-y-2">
      <label className="text-child-base font-bold text-kotochan-brown">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <span className="text-child-sm text-kotochan-brown/70 w-8">
          {Math.round(value * 100)}%
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={isSaving}
          className={cn(
            'flex-1 h-2 bg-kotochan-cream rounded-full appearance-none',
            'slider:bg-kotochan-pink slider:rounded-full',
            'disabled:opacity-50'
          )}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-child-base text-kotochan-brown/70">
          設定を読み込み中...
        </p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-child-base text-kotochan-brown/70">
          設定の読み込みに失敗しました
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <CircleButton onClick={onBack} color="mint" size="medium">
          <Icon name="back" size="lg" />
        </CircleButton>

        <div>
          <h2 className="text-child-2xl font-bold text-kotochan-brown">
            せってい
          </h2>
          <p className="text-child-base text-kotochan-brown/70">
            アプリの動作を設定できます
          </p>
        </div>
      </div>

      {/* 音声設定 */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4 flex items-center gap-2">
          <span>🔊</span>
          音声設定
        </h3>

        <div className="space-y-6">
          {/* 音声有効/無効 */}
          <div className="flex items-center justify-between">
            <label className="text-child-base font-bold text-kotochan-brown">
              音声を有効にする
            </label>
            <CircleButton
              onClick={() =>
                updateSetting('audioEnabled', !settings.audioEnabled)
              }
              color={settings.audioEnabled ? 'mint' : 'brown'}
              size="medium"
              disabled={isSaving}
            >
              <span className="text-xl">
                {settings.audioEnabled ? '🔊' : '🔇'}
              </span>
            </CircleButton>
          </div>

          {settings.audioEnabled && (
            <>
              <VolumeSlider
                label="全体音量"
                value={settings.masterVolume}
                onChange={(value) => updateSetting('masterVolume', value)}
              />

              <VolumeSlider
                label="効果音音量"
                value={settings.effectsVolume}
                onChange={(value) => updateSetting('effectsVolume', value)}
              />

              <VolumeSlider
                label="BGM音量"
                value={settings.musicVolume}
                onChange={(value) => updateSetting('musicVolume', value)}
              />
            </>
          )}
        </div>
      </div>

      {/* 表示設定 */}
      <div
        className={cn(
          'bg-white/50 backdrop-blur-sm rounded-kotochan',
          'border border-white/20 shadow-sm p-6'
        )}
      >
        <h3 className="text-child-lg font-bold text-kotochan-brown mb-4 flex items-center gap-2">
          <span>🎨</span>
          表示設定
        </h3>

        <div className="space-y-6">
          {/* 誕生日モード */}
          <div className="flex items-center justify-between">
            <label className="text-child-base font-bold text-kotochan-brown">
              誕生日モード
            </label>
            <CircleButton
              onClick={() =>
                updateSetting('birthdayMode', !settings.birthdayMode)
              }
              color={settings.birthdayMode ? 'pink' : 'brown'}
              size="medium"
              disabled={isSaving}
            >
              <span className="text-xl">
                {settings.birthdayMode ? '🎂' : '📅'}
              </span>
            </CircleButton>
          </div>

          {/* テーマ選択 */}
          <div>
            <label className="text-child-base font-bold text-kotochan-brown mb-3 block">
              テーマ
            </label>
            <div className="flex gap-3">
              {[
                { id: 'default', name: 'ふつう', icon: '🏠' },
                { id: 'birthday', name: 'たんじょうび', icon: '🎂' },
                { id: 'stars', name: 'ほし', icon: '⭐' },
              ].map((theme) => (
                <CircleButton
                  key={theme.id}
                  onClick={() => updateSetting('theme', theme.id)}
                  color={settings.theme === theme.id ? 'yellow' : 'brown'}
                  size="medium"
                  disabled={isSaving}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg">{theme.icon}</span>
                    <span className="text-child-xs font-bold">
                      {theme.name}
                    </span>
                  </div>
                </CircleButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 保存状態表示 */}
      {isSaving && (
        <div className="text-center">
          <div className="text-4xl mb-2">💾</div>
          <p className="text-child-sm text-kotochan-brown/70">保存中...</p>
        </div>
      )}
    </div>
  );
}
