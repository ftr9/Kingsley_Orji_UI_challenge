import { Gesture } from 'react-native-gesture-handler';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { SharedValue, runOnJS, withTiming } from 'react-native-reanimated';
import { MovementDirection } from '@/types';

interface IUseStackImageGestureArgs {
  dragSharedValue: SharedValue<number>;
  isClickedSharedValue: SharedValue<number>;
  sizeSharedValue: SharedValue<number>;
  productSize: number;
}

const useStackImageGesture = ({
  dragSharedValue,
  isClickedSharedValue,
  sizeSharedValue,
  productSize,
}: IUseStackImageGestureArgs) => {
  const tappedActiveId = useActiveSelectedFoodStore(
    store => store.tappedActiveId
  );

  const setTapStatusAndIdAction = useActiveSelectedFoodStore(
    store => store.setTapStatusAndId
  );

  const setIdAndDirectionAction = useActiveSelectedFoodStore(
    store => store.setIdAndDirection
  );

  const flingGesture = Gesture.Pan()
    .enabled(tappedActiveId === -1)
    .onEnd(e => {
      //scrolled up
      if (e.translationY < 0) {
        if (dragSharedValue.value >= 10 * productSize) return;

        dragSharedValue.value = withTiming(dragSharedValue.value + 10, {
          duration: 600,
        });

        runOnJS(setIdAndDirectionAction)(
          dragSharedValue.value / 10,
          MovementDirection.DOWN
        );
      } else {
        if (dragSharedValue.value <= 10) return;

        dragSharedValue.value = withTiming(dragSharedValue.value - 10, {
          duration: 600,
        });

        runOnJS(setIdAndDirectionAction)(
          dragSharedValue.value / 10 - 2,
          MovementDirection.UP
        );
      }
    });

  const tapGesture = Gesture.LongPress()
    .minDuration(100)
    .onEnd(e => {
      const activeIndex = dragSharedValue.value / 10 - 1;
      runOnJS(setTapStatusAndIdAction)(true, activeIndex);
      isClickedSharedValue.value = withTiming(1, { duration: 500 });
      sizeSharedValue.value = 4;
      //setTapStatusAndIdAction(true, index);
    });

  return {
    tapGesture,
    flingGesture,
  };
};

export default useStackImageGesture;
