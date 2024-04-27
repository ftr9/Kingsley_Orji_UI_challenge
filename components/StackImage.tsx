import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
  useSharedValue,
  useAnimatedRef,
} from 'react-native-reanimated';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Dimensions';
import useStackImageGesture from './hooks/useStackImageGesture';

const SCALE_RANE = [0, 1, 0.5, 0.3, 0];
const TRANSLATION_X_RANGE = [-50, 0, 28, 40, 50];
const TRANSLATION_Y_RANGE = [-80, 0, 20.89, 29, 35];
const EXTRAPOLATE_CONFIG = {
  extrapolateRight: Extrapolation.CLAMP,
  extrapolateLeft: Extrapolation.CLAMP,
};

const StackImage = ({
  source,
  dragSharedValue,
  interpolationRange,
  productSize,
  index,
  isClickedSharedValue,
  sizeSharedValue,
  isAddedToCardSharedValue,
}: {
  source: any;
  dragSharedValue: SharedValue<number>;
  interpolationRange: number[];
  productSize: number;
  index: number;
  isClickedSharedValue: SharedValue<number>;
  sizeSharedValue: SharedValue<number>;
  isAddedToCardSharedValue: SharedValue<number>;
}) => {
  const tappedActiveId = useActiveSelectedFoodStore(
    store => store.tappedActiveId
  );

  const { tapGesture, flingGesture } = useStackImageGesture({
    dragSharedValue,
    isClickedSharedValue,
    sizeSharedValue,
    productSize,
  });

  //For Add To Cart Animation ONLY
  const leftPosSharedValue = useSharedValue(0);
  const bottomPosSharedValue = useSharedValue(0);
  const opacitySharedValue = useSharedValue(0);
  const imageHeightSharedValue = useSharedValue(80);
  const imageWidthSharedValue = useSharedValue(80);

  //For Size Selection and add to cart animation (translation INCLUDED)
  const sizeAnimatedStyles = useAnimatedStyle(() => {
    let interpolatedScale = 1;
    if (sizeSharedValue.value === 1) {
      interpolatedScale = withTiming(0.5, { duration: 500 });
    }
    if (sizeSharedValue.value === 2) {
      interpolatedScale = withTiming(0.7, { duration: 500 });
    }
    if (sizeSharedValue.value === 3) {
      interpolatedScale = withTiming(0.9, { duration: 500 });
    }
    if (sizeSharedValue.value === 4) {
      interpolatedScale = withTiming(0.8, { duration: 500 });
    }

    if (isAddedToCardSharedValue.value === 1) {
      leftPosSharedValue.value = withTiming(
        250 * Math.min(3 / sizeSharedValue.value, 2),
        {
          duration: 1000,
        }
      );
      bottomPosSharedValue.value = withTiming(
        -400 * Math.min(3 / sizeSharedValue.value, 2),
        { duration: 1000 }
      );
      opacitySharedValue.value = withTiming(0, { duration: 1000 }, finished => {
        if (finished) {
          isAddedToCardSharedValue.value = 0;
        }
      });
      imageHeightSharedValue.value = withTiming(20, { duration: 1000 });
      imageWidthSharedValue.value = withTiming(20, { duration: 1000 });
    } else {
      opacitySharedValue.value = withTiming(1, { duration: 200 });
      leftPosSharedValue.value = 0;
      bottomPosSharedValue.value = 0;
      imageHeightSharedValue.value = 80;
      imageWidthSharedValue.value = 80;
    }

    return {
      transform: [
        { scale: interpolatedScale },
        {
          translateX: leftPosSharedValue.value,
        },
        { translateY: bottomPosSharedValue.value },
      ],
      opacity: opacitySharedValue.value,
      height: `${imageHeightSharedValue.value}%`,
      width: `${imageWidthSharedValue.value}%`,
    };
  });

  //For one time click only....
  const clickedAnimatedStyles = useAnimatedStyle(() => {
    const interpolateLeft = interpolate(
      isClickedSharedValue.value,
      [0, 1],
      [0, 0.1 * SCREEN_WIDTH]
    );
    const interpolateBottom = interpolate(
      isClickedSharedValue.value,
      [0, 1],
      [0, 0.15 * SCREEN_HEIGHT]
    );

    return {
      left: interpolateLeft,
      bottom: interpolateBottom,
    };
  });

  //for moving products in 3d direction...
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

  const activeTappedProduct = tappedActiveId !== -1 && tappedActiveId !== index;
  if (activeTappedProduct) {
    return null;
  }

  return (
    <GestureDetector gesture={Gesture.Simultaneous(flingGesture, tapGesture)}>
      <Animated.Image
        source={source}
        style={[
          {
            width: '80%',
            height: '80%',
            position: 'absolute',
          },
          tappedActiveId !== -1 && sizeAnimatedStyles,
          clickedAnimatedStyles,
          imageAnimatedStyle,
        ]}
        resizeMode="contain"
      ></Animated.Image>
    </GestureDetector>
  );
};

export default StackImage;
