import { IProduct } from '@/interfaces';
import { create } from 'zustand';

interface ICart {
  cart: IProduct[];
  isVisible: boolean;
  addToTheCart: (product: IProduct) => void;
  clearCart: () => void;
  removeFromCart: (index: number) => void;
  totalPrice: () => number;
  toggleVisible: () => void;
}

const useCartStore = create((set) => ({
  cart: [],
  isVisible: false,
  addToTheCart: (product: IProduct) => set((state: ICart) => ({ cart: [...state.cart, product] })),
  clearCart: () => set({ cart: [] }),
  removeFromCart: (index: number) => set((state: ICart) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  totalPrice: () => {
    const cart = (useCartStore.getState() as ICart).cart;
    return cart.reduce((total, product) => total + product.price, 0);
  },
  toggleVisible: () => {
    set((state: ICart) => ({ isVisible: !state.isVisible }));
  }
}));

export default useCartStore;
