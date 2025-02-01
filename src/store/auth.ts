import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type authState = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isVerified: boolean;
  isLoggedIn: boolean;
}

type actions = {
  update: (v: Partial<authState>) => void
  clear: () => void
}

const payload = {
  _id: "",
  name: "",
  email: '',
  token: '',
  isVerified: false,
  isLoggedIn: false,
}

const useAuthStore = create<authState & actions>()((persist((set) => ({
  ...payload,

  update: payload => set({ ...payload }),
  clear: () => set({ ...payload }),
}),
  {
    name: 'user-web-storage',
  }
)))

export default useAuthStore
