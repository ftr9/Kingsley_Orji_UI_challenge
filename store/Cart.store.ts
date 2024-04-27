import { IProduct } from '@/types';
import { create } from 'zustand';

interface ICarts {
  items: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: () => void;
}

const useCart = create<ICarts>(set => {
  return {
    items: [],
    addToCart: product => {
      set(prevState => {
        const newState = { ...prevState };
        newState.items.push(product);
        return newState;
      });
    },
    removeFromCart: () => {
      set(prevState => {
        const newState = { ...prevState };
        newState.items.pop();
        return newState;
      });
    },
  };
});

export default useCart;
