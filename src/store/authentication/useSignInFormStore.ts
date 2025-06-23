import { create } from "zustand";

export const useSignInStore = create((set) => ({
  username: "",
  password: "",
  isAuth: false,
  error: "",
  setField: (field: any, value: any) =>
    set((state: any) => ({ ...state, [field]: value })),
}));
