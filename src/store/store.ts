import { IProduct } from '@/interfaces';
import { create } from 'zustand';

interface ICart {
  cart: IProduct[];
}

const useCartStore = create((set) => ({
  cart: [],
  addToTheCart: (product: IProduct) => set((state: ICart) => ({ cart: [...state.cart, product] })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
