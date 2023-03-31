import { create } from "zustand";
const useUserInfoStore = create((set) => ({
  isLogin: [],
  setLogin: (isLogin) => set({ isLogin: isLogin }),
  userRole:[],
  setUserRole: (userRole) => set({userRole: userRole})
}));

export default useUserInfoStore;