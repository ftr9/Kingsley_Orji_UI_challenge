import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const SCALE_RANE = [0, 1, 0.5, 0.3, 0];
const TRANSLATION_X_RANGE = [-50, 0, 28, 43, 55];
const TRANSLATION_Y_RANGE = [-80, 0, 20.89, 29, 35];
const EXTRAPOLATE_CONFIG = {
  extrapolateRight: Extrapolation.CLAMP,
  extrapolateLeft: Extrapolation.CLAMP,
};

const StackImage = ({
  source,
  dragSharedValue,
  interpolationRange,
}: {
  source: any;
  dragSharedValue: SharedValue<number>;
  interpolationRange: number[];
}) => {
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
    <Animated.Image
      source={source}
      style={[
        {
          width: '75%',
          position: 'absolute',
        },
        imageAnimatedStyle,
      ]}
      resizeMode="contain"
    ></Animated.Image>
  );
};

export default StackImage;
