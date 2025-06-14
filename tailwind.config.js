/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kotochan: {
          // 基本色（モック画像分析結果）
          cream: '#FFF8E7',      // 背景色
          brown: '#8B4513',      // テキスト色
          
          // メインアクセント色
          pink: '#FFB6C1',       // ピンク系ボタン
          mint: '#98FB98',       // ミント系ボタン  
          yellow: '#FFE4B5',     // イエロー系ボタン
          blue: '#87CEEB',       // ブルー系ボタン
          orange: '#FFA500',     // オレンジ系ボタン（モック準拠）
          purple: '#DDA0DD',     // パープル系ボタン
          
          // 追加カラー（グラデーション・状態）
          'pink-light': '#FFC0CB',
          'pink-dark': '#FF69B4',
          'mint-light': '#AFEEEE',
          'mint-dark': '#20B2AA',
          'yellow-light': '#FFFACD',
          'yellow-dark': '#FFD700',
          'blue-light': '#B0E0E6',
          'blue-dark': '#4682B4',
          'orange-light': '#FFDAB9',
          'orange-dark': '#FF8C00',
          
          // UI状態色
          success: '#32CD32',    // 成功
          warning: '#FFA500',    // 警告
          error: '#FF6347',      // エラー
          disabled: '#D3D3D3',   // 無効
        },
      },
      borderRadius: {
        kotochan: '20px',        // 標準角丸
        'kotochan-sm': '12px',   // 小さい角丸
        'kotochan-lg': '32px',   // 大きい角丸
        'kotochan-xl': '48px',   // 特大角丸
        'kotochan-full': '9999px', // 完全な円形
      },
      spacing: {
        // 子供向けタッチターゲット最小サイズ
        'touch-min': '44px',     // 最小タッチサイズ
        'touch-comfortable': '56px', // 快適タッチサイズ
        'touch-large': '72px',   // 大型タッチサイズ
        'touch-xl': '96px',      // 特大タッチサイズ
        
        // コンテンツ幅
        'content-sm': '320px',   // 小画面
        'content-md': '768px',   // 中画面
        'content-lg': '1024px',  // 大画面
      },
      fontSize: {
        // 子供向けフォントサイズ
        'child-xs': ['14px', { lineHeight: '20px' }],
        'child-sm': ['18px', { lineHeight: '24px' }],
        'child-base': ['24px', { lineHeight: '32px' }],
        'child-lg': ['32px', { lineHeight: '40px' }],
        'child-xl': ['40px', { lineHeight: '48px' }],
        'child-2xl': ['48px', { lineHeight: '56px' }],
        'child-3xl': ['64px', { lineHeight: '72px' }],
      },
      fontFamily: {
        rounded: ['Rounded Mplus 1c', 'Hiragino Maru Gothic ProN', 'sans-serif'],
      },
      animation: {
        // 既存アニメーション
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        
        // 新規アニメーション（モック画像対応）
        'button-press': 'buttonPress 0.15s ease-out',
        'button-hover': 'buttonHover 0.3s ease-in-out',
        'pop-in': 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shake': 'shake 0.6s ease-in-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 8s linear infinite',
        'balloon-float': 'balloonFloat 4s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
      },
      keyframes: {
        // 既存キーフレーム
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        
        // 新規キーフレーム
        buttonPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        buttonHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        balloonFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};