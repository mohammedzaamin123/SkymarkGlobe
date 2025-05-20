import { create } from 'zustand';
import { logOut } from '../lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  showLoginModal: boolean;
  showSignupModal: boolean;
  setUser: (user: User | null) => void;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  showLoginModal: false,
  showSignupModal: false,
  setUser: (user) => set({ user }),
  setShowLoginModal: (show) => set({ showLoginModal: show, showSignupModal: false }),
  setShowSignupModal: (show) => set({ showSignupModal: show, showLoginModal: false }),
  logout: async () => {
    try {
      await logOut();
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },
}));
