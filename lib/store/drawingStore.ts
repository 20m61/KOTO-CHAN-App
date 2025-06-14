import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DrawingState {
  // 描画設定
  currentColor: string;
  brushSize: number;
  
  // 履歴管理
  history: string[];
  currentHistoryIndex: number;
  
  // 保存済み描画
  savedDrawings: SavedDrawing[];
}

interface SavedDrawing {
  id: string;
  name: string;
  dataURL: string;
  createdAt: Date;
  thumbnail: string;
}

interface DrawingActions {
  // 描画設定
  setCurrentColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  
  // 履歴管理
  addToHistory: (dataURL: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  // キャンバス操作
  clear: () => void;
  
  // 保存機能
  saveDrawing: (name?: string) => void;
  deleteSavedDrawing: (id: string) => void;
  loadDrawing: (id: string) => void;
}

type DrawingStore = DrawingState & DrawingActions;

const DEFAULT_STATE: DrawingState = {
  currentColor: '#2D1B14', // kotochan-brown
  brushSize: 8,
  history: [],
  currentHistoryIndex: -1,
  savedDrawings: [],
};

export const useDrawingStore = create<DrawingStore>()(
  devtools(
    (set, get) => ({
      ...DEFAULT_STATE,

      // 描画設定
      setCurrentColor: (color: string) => {
        set({ currentColor: color }, false, 'setCurrentColor');
      },

      setBrushSize: (size: number) => {
        set({ brushSize: size }, false, 'setBrushSize');
      },

      // 履歴管理
      addToHistory: (dataURL: string) => {
        const { history, currentHistoryIndex } = get();
        
        // 現在のインデックス以降の履歴を削除
        const newHistory = history.slice(0, currentHistoryIndex + 1);
        newHistory.push(dataURL);
        
        // 履歴の上限を50に制限
        const maxHistory = 50;
        if (newHistory.length > maxHistory) {
          newHistory.shift();
        }
        
        set({
          history: newHistory,
          currentHistoryIndex: newHistory.length - 1,
        }, false, 'addToHistory');
      },

      undo: () => {
        const { currentHistoryIndex } = get();
        if (currentHistoryIndex > 0) {
          set({
            currentHistoryIndex: currentHistoryIndex - 1,
          }, false, 'undo');
        }
      },

      redo: () => {
        const { history, currentHistoryIndex } = get();
        if (currentHistoryIndex < history.length - 1) {
          set({
            currentHistoryIndex: currentHistoryIndex + 1,
          }, false, 'redo');
        }
      },

      get canUndo() {
        return get().currentHistoryIndex > 0;
      },

      get canRedo() {
        const { history, currentHistoryIndex } = get();
        return currentHistoryIndex < history.length - 1;
      },

      // キャンバス操作
      clear: () => {
        set({
          history: [],
          currentHistoryIndex: -1,
        }, false, 'clear');
      },

      // 保存機能
      saveDrawing: (name?: string) => {
        const { history, currentHistoryIndex, savedDrawings } = get();
        
        if (currentHistoryIndex < 0 || !history[currentHistoryIndex]) {
          console.warn('No drawing to save');
          return;
        }
        
        const dataURL = history[currentHistoryIndex];
        const now = new Date();
        const defaultName = `おえかき ${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // サムネイル作成（実際の実装では縮小版を作成）
        const thumbnail = dataURL; // 簡略化
        
        const newDrawing: SavedDrawing = {
          id: crypto.randomUUID(),
          name: name || defaultName,
          dataURL,
          createdAt: now,
          thumbnail,
        };
        
        const newSavedDrawings = [newDrawing, ...savedDrawings];
        
        // 保存数を20に制限
        if (newSavedDrawings.length > 20) {
          newSavedDrawings.splice(20);
        }
        
        set({
          savedDrawings: newSavedDrawings,
        }, false, 'saveDrawing');
        
        // ローカルストレージに保存
        try {
          localStorage.setItem('koto-drawings', JSON.stringify(newSavedDrawings));
        } catch (error) {
          console.error('Failed to save to localStorage:', error);
        }
      },

      deleteSavedDrawing: (id: string) => {
        const { savedDrawings } = get();
        const newSavedDrawings = savedDrawings.filter(drawing => drawing.id !== id);
        
        set({
          savedDrawings: newSavedDrawings,
        }, false, 'deleteSavedDrawing');
        
        // ローカルストレージを更新
        try {
          localStorage.setItem('koto-drawings', JSON.stringify(newSavedDrawings));
        } catch (error) {
          console.error('Failed to update localStorage:', error);
        }
      },

      loadDrawing: (id: string) => {
        const { savedDrawings } = get();
        const drawing = savedDrawings.find(d => d.id === id);
        
        if (drawing) {
          set({
            history: [drawing.dataURL],
            currentHistoryIndex: 0,
          }, false, 'loadDrawing');
        }
      },
    }),
    {
      name: 'drawing-store',
      partialize: (state: DrawingStore) => ({
        currentColor: state.currentColor,
        brushSize: state.brushSize,
        savedDrawings: state.savedDrawings,
      }),
    }
  )
);

// ローカルストレージから保存済み描画を読み込み
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('koto-drawings');
    if (saved) {
      const savedDrawings = JSON.parse(saved);
      useDrawingStore.setState({ savedDrawings });
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
}