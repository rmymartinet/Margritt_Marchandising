import create from "zustand";

export const useShoppingIsClickedStore = create((set) => ({
  isClicked: false,
  setIsClicked: (isClicked) => set({ isClicked }),
}));
