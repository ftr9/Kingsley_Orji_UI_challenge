import { create } from 'zustand';

import { MovementDirection } from '@/types';

interface IActiveSelectedFoodStore {
  activeId: number;
  direction: MovementDirection;
  setIdAndDirection: (id: number, direction: MovementDirection) => void;
}

const useActiveSelectedFoodStore = create<IActiveSelectedFoodStore>(set => {
  return {
    activeId: -1,
    direction: MovementDirection.NEUTRAL,

    setIdAndDirection(id, direction) {
      set(prevState => {
        const newState = { ...prevState };
        newState.activeId = id;
        newState.direction = direction;

        return newState;
      });
    },
  };
});

export default useActiveSelectedFoodStore;
