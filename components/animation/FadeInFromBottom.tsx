import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT } from '@/constants/Dimensions';

const FadeInFromBottom = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const entering = () => {
    'worklet';
    const animations = {
      originY: withDelay(
        150 * index,
        withTiming(0, {
          duration: 1000,
          easing: Easing.out(Easing.bezierFn(0.31, 0.08, 0.65, 0.22)),
        })
      ),

      opacity: withDelay(
        350 * index,
        withTiming(1, {
          duration: 1200,
          easing: Easing.out(Easing.bezierFn(0.31, 0.08, 0.65, 0.22)),
        })
      ),
    };
    const initialValues = {
      originY: SCREEN_HEIGHT,
      opacity: 0,
    };
    return {
      initialValues,
      animations,
    };
  };

  return <Animated.View entering={entering}>{children}</Animated.View>;
};

export default FadeInFromBottom;

const styles = StyleSheet.create({});
