import { create } from 'zustand';

interface IBurger {
  isVisible: boolean;
  toggleVisible: () => void;
}

const useBurgerStore = create((set) => ({
  isVisible: false,
  toggleVisible: () => {
    set((state: IBurger) => ({ isVisible: !state.isVisible }));
  }
}));

export default useBurgerStore;
