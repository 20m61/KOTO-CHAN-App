'use client';

import { useState } from 'react';
import { CircleButton } from '@/components/ui/CircleButton';
import { Modal } from '@/components/ui/Modal';
import { useAdminStore } from '@/lib/store/adminStore';
import { cn } from '@/lib/utils/cn';

export function LoginForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const { login } = useAdminStore();

  // 数字キーパッド
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const handleNumberClick = (num: string) => {
    if (selectedDate.length < 8) {
      setSelectedDate((prev) => prev + num);
      setError('');
    }
  };

  const handleBackspace = () => {
    setSelectedDate((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setSelectedDate('');
    setError('');
  };

  const handleLogin = async () => {
    if (selectedDate.length !== 8) {
      setError('8桁の生年月日を入力してください（例：20231201）');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthDate: selectedDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.sessionId);
        setShowKeypad(false);
      } else {
        setError(data.message || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (dateStr.length <= 4) return dateStr;
    if (dateStr.length <= 6)
      return `${dateStr.slice(0, 4)}/${dateStr.slice(4)}`;
    return `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center">
        <div className="text-8xl mb-6">🔒</div>
        <h2 className="text-child-2xl font-bold text-kotochan-brown mb-4">
          おとなメニュー
        </h2>
        <p className="text-child-base text-kotochan-brown/70 mb-8">
          ことちゃんの たんじょうびを
          <br />
          にゅうりょく してください
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* 生年月日表示 */}
        <div
          className={cn(
            'bg-white rounded-kotochan border-4 border-kotochan-brown/20',
            'px-8 py-4 min-w-[280px] text-center',
            'transition-all duration-200',
            error && 'border-kotochan-error'
          )}
        >
          <p className="text-child-xs text-kotochan-brown/60 mb-2">
            せいねんがっぴ（YYYYMMDD）
          </p>
          <p className="text-child-xl font-bold text-kotochan-brown font-mono">
            {formatDate(selectedDate) || '____/__/__'}
          </p>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="bg-kotochan-error/10 border border-kotochan-error/30 rounded-kotochan px-4 py-2">
            <p className="text-child-sm text-kotochan-error text-center">
              {error}
            </p>
          </div>
        )}

        {/* ボタン */}
        <div className="flex gap-4">
          <CircleButton
            onClick={() => setShowKeypad(true)}
            color="mint"
            size="large"
            disabled={isLoading}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl">🔢</span>
              <span className="text-child-sm font-bold mt-1">にゅうりょく</span>
            </div>
          </CircleButton>

          <CircleButton
            onClick={handleLogin}
            color="pink"
            size="large"
            disabled={isLoading || selectedDate.length !== 8}
            className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl">{isLoading ? '⏳' : '🔓'}</span>
              <span className="text-child-sm font-bold mt-1">
                {isLoading ? 'まって' : 'ろぐいん'}
              </span>
            </div>
          </CircleButton>
        </div>
      </div>

      {/* 数字キーパッドモーダル */}
      <Modal
        isOpen={showKeypad}
        onClose={() => setShowKeypad(false)}
        title="たんじょうび にゅうりょく"
      >
        <div className="p-6">
          {/* 現在の入力値 */}
          <div className="bg-kotochan-cream rounded-kotochan p-4 mb-6 text-center">
            <p className="text-child-lg font-bold text-kotochan-brown font-mono">
              {formatDate(selectedDate) || '____/__/__'}
            </p>
          </div>

          {/* 数字キーパッド */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {numbers.map((num) => (
              <CircleButton
                key={num}
                onClick={() => handleNumberClick(num)}
                color="yellow"
                size="medium"
                disabled={selectedDate.length >= 8}
              >
                <span className="text-child-lg font-bold">{num}</span>
              </CircleButton>
            ))}
          </div>

          {/* 操作ボタン */}
          <div className="flex gap-3 justify-center">
            <CircleButton
              onClick={handleBackspace}
              color="orange"
              size="medium"
              disabled={selectedDate.length === 0}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">⌫</span>
                <span className="text-child-xs font-bold">けす</span>
              </div>
            </CircleButton>

            <CircleButton
              onClick={handleClear}
              color="blue"
              size="medium"
              disabled={selectedDate.length === 0}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">🗑️</span>
                <span className="text-child-xs font-bold">ぜんぶ</span>
              </div>
            </CircleButton>

            <CircleButton
              onClick={() => setShowKeypad(false)}
              color="mint"
              size="medium"
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">✅</span>
                <span className="text-child-xs font-bold">かんりょう</span>
              </div>
            </CircleButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
