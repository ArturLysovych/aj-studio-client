import { IProduct } from '@/interfaces';
import { create } from 'zustand';

interface ICart {
  cart: IProduct[];
  addToTheCart: (product: IProduct) => void;
  clearCart: () => void;
  removeFromCart: (index: number) => void;
  totalPrice: () => number;
}

const useCartStore = create((set) => ({
  cart: [],
  addToTheCart: (product: IProduct) => set((state: ICart) => ({ cart: [...state.cart, product] })),
  clearCart: () => set({ cart: [] }),
  removeFromCart: (index: number) => set((state: ICart) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  totalPrice: () => {
    const cart = (useCartStore.getState() as ICart).cart;
    return cart.reduce((total, product) => total + product.price, 0);
  },
}));

export default useCartStore;
