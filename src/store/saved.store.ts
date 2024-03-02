import { create } from 'zustand';

interface ISaved {
  isVisible: boolean;
  toggleVisible: () => void;
}

const useSavedStore = create<ISaved>((set) => ({
  isVisible: true,
  toggleVisible: () => {
    set((state: any) => ({ isVisible: !state.isVisible }));
  }
}));

export default useSavedStore;
