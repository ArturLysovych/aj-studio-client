import { create } from 'zustand';

interface IPopup {
  responseData: string;
  setResponse: (data: string) => void;
}

const usePopupStore = create<IPopup>((set) => ({
  responseData: '',
  setResponse: (data) => set({ responseData: data })
}));

export default usePopupStore;
