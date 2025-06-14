import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AdminState {
  isAuthenticated: boolean;
  sessionId: string | null;
  loginTime: string | null;
}

interface AdminActions {
  login: (sessionId: string) => void;
  logout: () => void;
  checkSession: () => Promise<boolean>;
}

type AdminStore = AdminState & AdminActions;

const DEFAULT_STATE: AdminState = {
  isAuthenticated: false,
  sessionId: null,
  loginTime: null,
};

export const useAdminStore = create<AdminStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...DEFAULT_STATE,

        login: (sessionId: string) => {
          set(
            {
              isAuthenticated: true,
              sessionId,
              loginTime: new Date().toISOString(),
            },
            false,
            'login'
          );
        },

        logout: async () => {
          // サーバーサイドでセッションを削除
          try {
            await fetch('/api/auth/session', {
              method: 'DELETE',
            });
          } catch (error) {
            console.error('Logout API error:', error);
          }

          set(
            {
              isAuthenticated: false,
              sessionId: null,
              loginTime: null,
            },
            false,
            'logout'
          );
        },

        checkSession: async () => {
          const { sessionId } = get();

          if (!sessionId) {
            set({ isAuthenticated: false }, false, 'checkSession:noSession');
            return false;
          }

          try {
            const response = await fetch('/api/auth/session');
            const data = await response.json();

            if (data.authenticated) {
              set({ isAuthenticated: true }, false, 'checkSession:valid');
              return true;
            } else {
              set(
                {
                  isAuthenticated: false,
                  sessionId: null,
                  loginTime: null,
                },
                false,
                'checkSession:invalid'
              );
              return false;
            }
          } catch (error) {
            console.error('Session check error:', error);
            set(
              {
                isAuthenticated: false,
                sessionId: null,
                loginTime: null,
              },
              false,
              'checkSession:error'
            );
            return false;
          }
        },
      }),
      {
        name: 'admin-store',
        partialize: (state: AdminStore) => ({
          sessionId: state.sessionId,
          loginTime: state.loginTime,
          // isAuthenticated は永続化しない（セッション確認で決定）
        }),
      }
    ),
    {
      name: 'admin-store',
    }
  )
);

// 初期化時にセッションをチェック
if (typeof window !== 'undefined') {
  const store = useAdminStore.getState();
  if (store.sessionId) {
    store.checkSession();
  }
}
