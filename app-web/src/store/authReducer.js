import { create } from "zustand";
const useUserInfoStore = create((set) => ({
  isLogin: false,
  setLogin: (isLogin) => set({ isLogin: isLogin }),
  user:[],
  setUser: (user) => set({user: user})
}));

export default useUserInfoStore;