import { IProduct } from '@/interfaces';
import { create } from 'zustand';

interface IPopup {
    isShow: boolean;
    good: IProduct | null;
    setIsShow: () => void;
    setGood: (data: IProduct | null) => void;
}

const useGoodPopupStore = create<IPopup>((set) => ({
    isShow: false,
    good: null,
    setIsShow: () => set((state) => ({ isShow: !state.isShow })),
    setGood: (data) => set({ good: data })
}));

export default useGoodPopupStore;
