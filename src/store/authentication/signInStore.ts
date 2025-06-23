import { create } from 'zustand'

type AuthState = {
  user: { username: string } | null
  loading: boolean
  setUser: (user: { username: string } | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
