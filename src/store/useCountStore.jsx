import create from "zustand";

const useCountStore = create((set) => ({
  count: 0,
  startCounting: () => {
    const start = Date.now();
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - start;
      const newCount = Math.min(Math.floor(elapsed / 30), 100);
      set({ count: newCount });
      if (newCount === 100) {
        clearInterval(intervalId);
      }
    }, 30);
  },
}));

export default useCountStore;
