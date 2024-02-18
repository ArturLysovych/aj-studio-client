import { create } from 'zustand';
import useTokenStore from './token.store';

const useLikesStore = create((set) => ({
    likes: useTokenStore((state: any) => state.user.likes),
}));
  
export default useLikesStore;