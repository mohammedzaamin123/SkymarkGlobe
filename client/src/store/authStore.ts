import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout as authLogout, User } from '../lib/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  showLoginModal: boolean;
  showSignupModal: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthData: (user: User | null, token: string | null) => void;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      showLoginModal: false,
      showSignupModal: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthData: (user, token) => set({ user, token }),
      setShowLoginModal: (show) => set({ showLoginModal: show, showSignupModal: false }),
      setShowSignupModal: (show) => set({ showSignupModal: show, showLoginModal: false }),
      logout: async () => {
        try {
          await authLogout();
          set({ user: null, token: null });
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
