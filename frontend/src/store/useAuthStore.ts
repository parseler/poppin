import create from 'zustand';

// 상태 타입 정의
interface AuthState {
  accessToken: string | null;
  userTsid: string | null;
  userRole: string | null;
  setTokens: (accessToken: string, userTsid: string, userRole: string) => void;
  clearTokens: () => void;
}

// zustand 스토어 생성
const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userTsid: null,
  userRole: null,
  setTokens: (accessToken: string, userTsid: string | null, userRole: string | null) => set({ accessToken, userTsid, userRole }),
  clearTokens: () => set({ accessToken: null, userTsid: null, userRole: null }),
}));

export default useAuthStore;