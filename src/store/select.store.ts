import { create } from 'zustand';

interface ISelect {
    lang: string;
    currency: string;
    setLang: (data: string) => void;
    setCurrency: (data: string) => void;
}
  
const useSelectStore = create<ISelect>((set) => ({
    lang: 'EN',
    currency: 'USD',
    setLang: (data) => set({ lang: data }),
    setCurrency: (data) => set({ currency: data })
}));
  
export default useSelectStore;
