# 🧩 コンポーネント設計アーキテクチャ

## 概要
ことちゃんバースデーアプリのコンポーネント設計とファイル構造の詳細仕様です。

---

## 📁 ファイル構造詳細

### 完全なディレクトリ構造
```
koto-chan-app/
├── app/                                    # Next.js App Router
│   ├── globals.css                         # グローバルスタイル
│   ├── layout.tsx                          # ルートレイアウト
│   ├── page.tsx                           # ホーム画面 ✅実装済み
│   ├── loading.tsx                         # ローディング画面
│   ├── not-found.tsx                       # 404画面
│   ├── error.tsx                          # エラー画面
│   │
│   ├── sound-play/                        # おとあそび機能
│   │   ├── page.tsx                       # 🔄実装必要
│   │   └── loading.tsx
│   │
│   ├── drawing/                           # おえかき機能
│   │   ├── page.tsx                       # 🔄実装必要
│   │   └── loading.tsx
│   │
│   ├── album/                             # アルバム機能
│   │   ├── page.tsx                       # 🔄実装必要
│   │   └── loading.tsx
│   │
│   ├── admin/                             # おとなメニュー
│   │   ├── page.tsx                       # 認証画面 🔄実装必要
│   │   ├── dashboard/
│   │   │   └── page.tsx                   # 管理ダッシュボード 🔄実装必要
│   │   └── upload/
│   │       └── page.tsx                   # アップロード画面 🔄実装必要
│   │
│   ├── birthday/                          # 誕生日特別画面
│   │   └── page.tsx                       # 🔄実装必要
│   │
│   └── api/                               # APIルート
│       ├── auth/
│       │   ├── login/route.ts             # 🔄実装必要
│       │   ├── session/route.ts           # 🔄実装必要
│       │   └── logout/route.ts            # 🔄実装必要
│       ├── upload/
│       │   ├── photos/route.ts            # 🔄実装必要
│       │   └── drawings/route.ts          # 🔄実装必要
│       ├── album/
│       │   ├── photos/route.ts            # 🔄実装必要
│       │   └── [id]/route.ts              # 🔄実装必要
│       ├── settings/
│       │   ├── app/route.ts               # 🔄実装必要
│       │   └── usage/route.ts             # 🔄実装必要
│       ├── drawings/
│       │   ├── route.ts                   # 🔄実装必要
│       │   └── [id]/route.ts              # 🔄実装必要
│       └── health/route.ts                # 🔄実装必要
│
├── components/                             # コンポーネント
│   ├── ui/                                # 基本UIコンポーネント
│   │   ├── Button/
│   │   │   ├── Button.tsx                 # ✅実装済み
│   │   │   ├── Button.module.css          # 🔄実装必要
│   │   │   └── index.ts                   # エクスポート
│   │   ├── Modal/
│   │   │   ├── Modal.tsx                  # 🔄実装必要
│   │   │   ├── Modal.module.css           # 🔄実装必要
│   │   │   └── index.ts
│   │   ├── Loading/
│   │   │   ├── LoadingSpinner.tsx         # 🔄実装必要
│   │   │   ├── LoadingScreen.tsx          # 🔄実装必要
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── TextInput.tsx              # 🔄実装必要
│   │   │   ├── DateInput.tsx              # 🔄実装必要
│   │   │   └── index.ts
│   │   └── Navigation/
│   │       ├── NavButton.tsx              # 🔄実装必要
│   │       ├── BackButton.tsx             # 🔄実装必要
│   │       └── index.ts
│   │
│   ├── features/                          # 機能別コンポーネント
│   │   ├── sound-play/
│   │   │   ├── SoundBoard.tsx             # 🔄実装必要
│   │   │   ├── SoundButton.tsx            # 🔄実装必要
│   │   │   ├── SoundCategory.tsx          # 🔄実装必要
│   │   │   ├── SoundEffects.tsx           # 🔄実装必要
│   │   │   └── index.ts
│   │   │
│   │   ├── drawing/
│   │   │   ├── DrawingCanvas.tsx          # 🔄実装必要
│   │   │   ├── ColorPalette.tsx           # 🔄実装必要
│   │   │   ├── BrushSettings.tsx          # 🔄実装必要
│   │   │   ├── DrawingControls.tsx        # 🔄実装必要
│   │   │   ├── SaveDialog.tsx             # 🔄実装必要
│   │   │   └── index.ts
│   │   │
│   │   ├── album/
│   │   │   ├── PhotoCarousel.tsx          # 🔄実装必要
│   │   │   ├── PhotoSlide.tsx             # 🔄実装必要
│   │   │   ├── AlbumControls.tsx          # 🔄実装必要
│   │   │   ├── PhotoUpload.tsx            # 🔄実装必要
│   │   │   ├── BackgroundMusic.tsx        # 🔄実装必要
│   │   │   └── index.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── LoginForm.tsx              # 🔄実装必要
│   │   │   ├── AdminDashboard.tsx         # 🔄実装必要
│   │   │   ├── PhotoManager.tsx           # 🔄実装必要
│   │   │   ├── SettingsManager.tsx        # 🔄実装必要
│   │   │   ├── UsageStats.tsx             # 🔄実装必要
│   │   │   └── index.ts
│   │   │
│   │   ├── birthday/
│   │   │   ├── BirthdayEffects.tsx        # 🔄実装必要
│   │   │   ├── BirthdayCake.tsx           # 🔄実装必要
│   │   │   ├── Sparkles.tsx               # 🔄実装必要
│   │   │   ├── CelebrationMessage.tsx     # 🔄実装必要
│   │   │   └── index.ts
│   │   │
│   │   └── stamps/
│   │       ├── StampDisplay.tsx           # ✅実装済み
│   │       ├── StampAnimation.tsx         # 🔄実装必要
│   │       ├── StampSelector.tsx          # 🔄実装必要
│   │       └── index.ts
│   │
│   └── layouts/                           # レイアウトコンポーネント
│       ├── MainLayout.tsx                 # ✅実装済み
│       ├── PageLayout.tsx                 # 🔄実装必要
│       ├── AdminLayout.tsx                # 🔄実装必要
│       └── index.ts
│
├── lib/                                   # ユーティリティ・ライブラリ
│   ├── hooks/                             # カスタムフック
│   │   ├── useBirthdayInfo.ts             # ✅実装済み
│   │   ├── useSound.ts                    # ✅実装済み
│   │   ├── useLocalStorage.ts             # 🔄実装必要
│   │   ├── useAuth.ts                     # 🔄実装必要
│   │   ├── useApi.ts                      # 🔄実装必要
│   │   ├── useCanvas.ts                   # 🔄実装必要
│   │   ├── useCarousel.ts                 # 🔄実装必要
│   │   └── useImageUpload.ts              # 🔄実装必要
│   │
│   ├── utils/                             # ヘルパー関数
│   │   ├── cn.ts                          # クラス名結合 🔄実装必要
│   │   ├── formatters.ts                  # 日付・数値フォーマット 🔄実装必要
│   │   ├── validators.ts                  # バリデーション 🔄実装必要
│   │   ├── imageProcessing.ts             # 画像処理 🔄実装必要
│   │   └── errorHandling.ts               # エラーハンドリング 🔄実装必要
│   │
│   ├── constants/                         # 定数定義
│   │   ├── stamps.ts                      # ✅実装済み
│   │   ├── sounds.ts                      # 🔄実装必要
│   │   ├── colors.ts                      # 🔄実装必要
│   │   ├── animations.ts                  # 🔄実装必要
│   │   └── api.ts                         # 🔄実装必要
│   │
│   ├── storage/                           # データストレージ
│   │   ├── kvClient.ts                    # 🔄実装必要
│   │   ├── blobClient.ts                  # 🔄実装必要
│   │   ├── sessionStore.ts                # 🔄実装必要
│   │   ├── settingsStore.ts               # 🔄実装必要
│   │   └── statsStore.ts                  # 🔄実装必要
│   │
│   ├── auth/                              # 認証システム
│   │   ├── passwordAuth.ts                # 🔄実装必要
│   │   ├── sessionManager.ts              # 🔄実装必要
│   │   └── middleware.ts                  # 🔄実装必要
│   │
│   ├── canvas/                            # Canvas関連
│   │   ├── drawingEngine.ts               # 🔄実装必要
│   │   ├── touchHandler.ts                # 🔄実装必要
│   │   └── imageExport.ts                 # 🔄実装必要
│   │
│   ├── audio/                             # 音声システム
│   │   ├── audioManager.ts                # 🔄実装必要
│   │   ├── soundEffects.ts                # 🔄実装必要
│   │   ├── backgroundMusic.ts             # 🔄実装必要
│   │   └── audioPreloader.ts              # 🔄実装必要
│   │
│   └── api/                               # API関連
│       ├── client.ts                      # APIクライアント 🔄実装必要
│       ├── endpoints.ts                   # エンドポイント定義 🔄実装必要
│       └── types.ts                       # API型定義 🔄実装必要
│
├── store/                                 # Zustand状態管理
│   ├── authStore.ts                       # 🔄実装必要
│   ├── settingsStore.ts                   # 🔄実装必要
│   ├── albumStore.ts                      # 🔄実装必要
│   ├── drawingStore.ts                    # 🔄実装必要
│   └── index.ts                           # 🔄実装必要
│
├── types/                                 # TypeScript型定義
│   ├── api.ts                             # 🔄実装必要
│   ├── database.ts                        # 🔄実装必要
│   ├── components.ts                      # 🔄実装必要
│   ├── auth.ts                            # 🔄実装必要
│   └── index.ts                           # 🔄実装必要
│
└── public/                                # 静的ファイル
    ├── images/
    │   ├── stamps/
    │   │   └── ao/                        # ✅スタンプ画像あり
    │   ├── ui/                            # 🔄UI素材必要
    │   ├── backgrounds/                   # 🔄背景画像必要
    │   └── mockups/                       # 🔄モックアップ
    ├── sounds/                            # 🔄音声ファイル必要
    │   ├── animals/
    │   ├── instruments/
    │   ├── effects/
    │   └── background/
    ├── icons/                             # 🔄アイコン必要
    └── fonts/                             # 🔄カスタムフォント
```

---

## 🧱 コンポーネント設計原則

### 1. コンポーネント分類

#### UIコンポーネント（`components/ui/`）
**目的**: 再利用可能な基本UIパーツ  
**特徴**: ビジネスロジックを持たない、プロパティ駆動

```typescript
// components/ui/Button/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'small' | 'medium' | 'large';
  color?: 'pink' | 'mint' | 'yellow' | 'brown';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}
```

#### 機能コンポーネント（`components/features/`）
**目的**: 特定機能に特化したコンポーネント  
**特徴**: ビジネスロジックあり、状態管理との連携

```typescript
// components/features/sound-play/SoundBoard.tsx
interface SoundBoardProps {
  category?: 'animals' | 'instruments' | 'effects';
  onSoundPlay?: (soundId: string) => void;
  disabled?: boolean;
}
```

#### レイアウトコンポーネント（`components/layouts/`）
**目的**: ページ構造とレイアウト定義  
**特徴**: 共通レイアウト、ナビゲーション

```typescript
// components/layouts/PageLayout.tsx
interface PageLayoutProps {
  title: string;
  showBackButton?: boolean;
  showBirthdayEffects?: boolean;
  children: React.ReactNode;
}
```

### 2. コンポーネント命名規則

- **ファイル名**: PascalCase（例：`SoundButton.tsx`）
- **コンポーネント名**: ファイル名と同一
- **Props型**: `{ComponentName}Props`
- **CSS Modules**: `{ComponentName}.module.css`

### 3. Props設計原則

```typescript
// ❌ 悪い例：props drilling
interface BadProps {
  user: User;
  settings: Settings;
  theme: Theme;
  // ... 多数のprops
}

// ✅ 良い例：必要最小限のprops
interface GoodProps {
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  'aria-label'?: string;
}
```

---

## 🎨 UIコンポーネント詳細設計

### Button コンポーネント
```typescript
// components/ui/Button/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  color?: 'pink' | 'mint' | 'yellow' | 'brown';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'medium', 
    color = 'pink',
    loading = false,
    fullWidth = false,
    disabled,
    children, 
    className,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          styles[color],
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className
        )}
        {...props}
      >
        {loading ? <LoadingSpinner size="small" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Modal コンポーネント
```typescript
// components/ui/Modal/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  closeOnOverlayClick = true 
}: ModalProps) {
  // 実装詳細...
}
```

### LoadingSpinner コンポーネント
```typescript
// components/ui/Loading/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'pink' | 'mint' | 'yellow' | 'brown';
  'aria-label'?: string;
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = 'pink',
  'aria-label': ariaLabel = '読み込み中'
}: LoadingSpinnerProps) {
  // 実装詳細...
}
```

---

## 🎵 機能コンポーネント詳細設計

### SoundBoard コンポーネント
```typescript
// components/features/sound-play/SoundBoard.tsx
interface SoundBoardProps {
  category?: SoundCategory;
  onCategoryChange?: (category: SoundCategory) => void;
  onSoundPlay?: (soundId: string) => void;
  disabled?: boolean;
}

export function SoundBoard({ 
  category = 'animals', 
  onCategoryChange,
  onSoundPlay,
  disabled = false 
}: SoundBoardProps) {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const { sounds } = useSounds(category);
  const { playSound } = useSound();

  const handleSoundPlay = async (sound: SoundItem) => {
    if (disabled) return;
    
    setActiveSound(sound.id);
    await playSound(sound.file);
    onSoundPlay?.(sound.id);
    
    // アニメーション終了後リセット
    setTimeout(() => setActiveSound(null), 1000);
  };

  return (
    <div className="sound-board">
      <SoundCategory 
        selected={category}
        onSelect={onCategoryChange}
      />
      <div className="sound-grid">
        {sounds.map((sound) => (
          <SoundButton
            key={sound.id}
            sound={sound}
            isActive={activeSound === sound.id}
            disabled={disabled}
            onPlay={() => handleSoundPlay(sound)}
          />
        ))}
      </div>
    </div>
  );
}
```

### DrawingCanvas コンポーネント
```typescript
// components/features/drawing/DrawingCanvas.tsx
interface DrawingCanvasProps {
  width?: number;
  height?: number;
  onSave?: (imageData: string) => void;
  disabled?: boolean;
}

export function DrawingCanvas({ 
  width = 800, 
  height = 600, 
  onSave,
  disabled = false 
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    isDrawing,
    color,
    lineWidth,
    history,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    clear,
    exportImage
  } = useCanvas(canvasRef);

  const handleSave = async () => {
    const imageData = exportImage('png');
    if (imageData && onSave) {
      onSave(imageData);
    }
  };

  return (
    <div className="drawing-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="drawing-canvas"
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        disabled={disabled}
      />
      <DrawingControls
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={undo}
        onRedo={redo}
        onClear={clear}
        onSave={handleSave}
      />
    </div>
  );
}
```

### PhotoCarousel コンポーネント
```typescript
// components/features/album/PhotoCarousel.tsx
interface PhotoCarouselProps {
  photos: Photo[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  onPhotoChange?: (index: number) => void;
}

export function PhotoCarousel({ 
  photos, 
  autoPlay = true, 
  interval = 5000,
  showControls = true,
  onPhotoChange 
}: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 25 
  });
  
  const { selectedIndex, scrollSnaps, onDotButtonClick } = 
    useDotButton(emblaApi);
  
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = 
    usePrevNextButtons(emblaApi);

  // 自動再生機能
  useEffect(() => {
    if (!emblaApi || !autoPlay) return;
    
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, interval);
    
    return () => clearInterval(autoplayInterval);
  }, [emblaApi, autoPlay, interval]);

  return (
    <div className="photo-carousel">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {photos.map((photo, index) => (
            <PhotoSlide
              key={photo.id}
              photo={photo}
              isActive={index === selectedIndex}
            />
          ))}
        </div>
      </div>
      
      {showControls && (
        <AlbumControls
          prevDisabled={prevBtnDisabled}
          nextDisabled={nextBtnDisabled}
          onPrev={onPrevButtonClick}
          onNext={onNextButtonClick}
          dots={scrollSnaps}
          selectedIndex={selectedIndex}
          onDotClick={onDotButtonClick}
        />
      )}
    </div>
  );
}
```

---

## 🎣 カスタムフック設計

### useAuth フック
```typescript
// lib/hooks/useAuth.ts
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (birthdate: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => Promise<boolean>;
}

export function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (birthdate: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthdate })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('sessionId', data.session.id);
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError('認証に失敗しました');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 実装続き...
}
```

### useCanvas フック
```typescript
// lib/hooks/useCanvas.ts
interface CanvasState {
  isDrawing: boolean;
  color: string;
  lineWidth: number;
  history: {
    canUndo: boolean;
    canRedo: boolean;
  };
  startDrawing: (e: React.TouchEvent | React.MouseEvent) => void;
  draw: (e: React.TouchEvent | React.MouseEvent) => void;
  stopDrawing: () => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  exportImage: (format: 'png' | 'jpeg') => string | null;
}

export function useCanvas(canvasRef: RefObject<HTMLCanvasElement>): CanvasState {
  // 実装詳細...
}
```

### useImageUpload フック
```typescript
// lib/hooks/useImageUpload.ts
interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadPhoto: (file: File, caption?: string) => Promise<Photo | null>;
  uploadDrawing: (imageData: string) => Promise<Drawing | null>;
}

export function useImageUpload(): UploadState {
  // 実装詳細...
}
```

---

## 🎭 状態管理設計（Zustand）

### 認証ストア
```typescript
// store/authStore.ts
interface AuthStore {
  isAuthenticated: boolean;
  sessionId: string | null;
  expiresAt: number | null;
  login: (sessionId: string, expiresAt: number) => void;
  logout: () => void;
  checkExpiry: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  sessionId: null,
  expiresAt: null,
  
  login: (sessionId, expiresAt) => set({
    isAuthenticated: true,
    sessionId,
    expiresAt
  }),
  
  logout: () => set({
    isAuthenticated: false,
    sessionId: null,
    expiresAt: null
  }),
  
  checkExpiry: () => {
    const { expiresAt } = get();
    if (!expiresAt || Date.now() > expiresAt) {
      get().logout();
      return false;
    }
    return true;
  }
}));
```

### 設定ストア
```typescript
// store/settingsStore.ts
interface SettingsStore {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // 実装詳細...
}));
```

---

## 🎨 CSS Modules 設計

### Button.module.css
```css
/* components/ui/Button/Button.module.css */
.button {
  @apply inline-flex items-center justify-center;
  @apply font-medium rounded-kotochan;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  min-height: 44px; /* タッチ最適化 */
  min-width: 44px;
}

.primary {
  @apply bg-kotochan-pink text-white;
  @apply hover:bg-pink-400 focus:ring-kotochan-pink;
}

.secondary {
  @apply bg-kotochan-mint text-kotochan-brown;
  @apply hover:bg-green-200 focus:ring-kotochan-mint;
}

.ghost {
  @apply bg-transparent text-kotochan-brown;
  @apply hover:bg-kotochan-cream focus:ring-kotochan-brown;
}

.small {
  @apply px-3 py-2 text-sm;
}

.medium {
  @apply px-4 py-3 text-base;
}

.large {
  @apply px-6 py-4 text-lg;
}

.loading {
  @apply pointer-events-none;
}

.fullWidth {
  @apply w-full;
}
```

---

この詳細なコンポーネント設計に基づいて実装することで、保守性が高く、再利用可能で、1歳児にとって使いやすいアプリケーションを構築できます。