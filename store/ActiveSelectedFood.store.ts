import { create } from 'zustand';

import { MovementDirection } from '@/types';

interface IActiveSelectedFoodStore {
  activeId: number;
  direction: MovementDirection;
  isTapped: boolean;
  tappedActiveId: number;

  setIdAndDirection: (id: number, direction: MovementDirection) => void;
  setTapStatusAndId: (status: boolean, activeId: number) => void;
}

const useActiveSelectedFoodStore = create<IActiveSelectedFoodStore>(set => {
  return {
    activeId: -1,
    direction: MovementDirection.NEUTRAL,
    isTapped: false,
    tappedActiveId: -1,

    setIdAndDirection(id, direction) {
      set(prevState => {
        const newState = { ...prevState };
        newState.activeId = id;
        newState.direction = direction;

        return newState;
      });
    },

    setTapStatusAndId(status, activeId) {
      set(prevState => {
        const newState = { ...prevState };
        newState.isTapped = status;
        newState.tappedActiveId = activeId;
        return newState;
      });
    },
  };
});

export default useActiveSelectedFoodStore;
