import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';

const SCALE_RANE = [0, 1, 0.5, 0.3, 0];
const TRANSLATION_X_RANGE = [-50, 0, 28, 43, 55];
const TRANSLATION_Y_RANGE = [-80, 0, 20.89, 29, 35];
const EXTRAPOLATE_CONFIG = {
  extrapolateRight: Extrapolation.CLAMP,
  extrapolateLeft: Extrapolation.CLAMP,
};
enum MovementDirection {
  UP = 6,
  DOWN = 3,
}

const StackImage = ({
  source,
  dragSharedValue,
  interpolationRange,
  productSize,
}: {
  source: any;
  dragSharedValue: SharedValue<number>;
  interpolationRange: number[];
  productSize: number;
}) => {
  const setIdAndDirectionAction = useActiveSelectedFoodStore(
    store => store.setIdAndDirection
  );

  const flingGesture = Gesture.Pan().onEnd(e => {
    //scrolled up
    if (e.translationY < 0) {
      if (dragSharedValue.value >= 10 * productSize) return;

      runOnJS(setIdAndDirectionAction)(
        dragSharedValue.value / 10,
        MovementDirection.DOWN
      );

      dragSharedValue.value = withTiming(dragSharedValue.value + 10, {
        duration: 600,
      });
    } else {
      if (dragSharedValue.value <= 10) return;

      runOnJS(setIdAndDirectionAction)(
        dragSharedValue.value / 10 - 2,
        MovementDirection.UP
      );

      dragSharedValue.value = withTiming(dragSharedValue.value - 10, {
        duration: 600,
      });
    }
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolateScale = interpolate(
      dragSharedValue.value,
      interpolationRange,
      SCALE_RANE,
      EXTRAPOLATE_CONFIG
    );

    const interpolateX = interpolate(
      dragSharedValue.value,
      interpolationRange,
      TRANSLATION_X_RANGE,
      EXTRAPOLATE_CONFIG
    );

    const interpolateY = interpolate(
      dragSharedValue.value,
      interpolationRange,
      TRANSLATION_Y_RANGE,
      EXTRAPOLATE_CONFIG
    );

    return {
      transform: [{ scale: interpolateScale }],
      left: `${interpolateX}%`,
      bottom: `${interpolateY}%`,
    };
  });

  return (
    <GestureDetector gesture={flingGesture}>
      <Animated.Image
        source={source}
        style={[
          {
            width: '90%',
            position: 'absolute',
          },
          imageAnimatedStyle,
        ]}
        resizeMode="contain"
      ></Animated.Image>
    </GestureDetector>
  );
};

export default StackImage;
