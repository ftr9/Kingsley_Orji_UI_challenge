import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IToggleTypeElementProps {
  onRendered: (e: LayoutChangeEvent) => void;
  onClick: () => void;
  children: string;
}

const ToggleTypeElement = ({
  onRendered,
  onClick,
  children,
}: IToggleTypeElementProps) => {
  return (
    <TouchableOpacity
      onLayout={onRendered}
      onPress={onClick}
      style={styles.toggleTypeElement}
    >
      <Text style={{ textAlign: 'center' }}>{children}</Text>
    </TouchableOpacity>
  );
};

interface IToggleType {
  leftText: string;
  rightText: string;
}

const ToggleType = ({ leftText, rightText }: IToggleType) => {
  const slideAbleElWidthSharedValue = useSharedValue(0);
  const leftPosSharedValue = useSharedValue(0);
  const leftAndRightElWidth = useRef<[number, number]>([0, 0]);

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: slideAbleElWidthSharedValue.value,
    };
  }, []);

  const animatedLeftPos = useAnimatedStyle(() => {
    return {
      left: leftPosSharedValue.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.slideAbleElContainer}>
        <View style={styles.slideAbleElTrack}>
          <Animated.View
            style={[styles.slideAble, animatedWidthStyle, animatedLeftPos]}
          ></Animated.View>
        </View>
      </View>

      <ToggleTypeElement
        onRendered={e => {
          slideAbleElWidthSharedValue.value = e.nativeEvent.layout.width;
          leftAndRightElWidth.current[0] = e.nativeEvent.layout.width;
        }}
        onClick={() => {
          slideAbleElWidthSharedValue.value = withTiming(
            leftAndRightElWidth.current[0]
          );
          leftPosSharedValue.value = withTiming(0);
        }}
      >
        {leftText}
      </ToggleTypeElement>

      <View style={{ marginHorizontal: 2 }}></View>

      <ToggleTypeElement
        onRendered={e => {
          leftAndRightElWidth.current[1] = e.nativeEvent.layout.width;
        }}
        onClick={() => {
          slideAbleElWidthSharedValue.value = withTiming(
            leftAndRightElWidth.current[1]
          );
          leftPosSharedValue.value = withTiming(leftAndRightElWidth.current[0]);
        }}
      >
        {rightText}
      </ToggleTypeElement>
    </View>
  );
};

export default ToggleType;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: '#ced4da',
    borderRadius: 100,
    height: 40,
  },
  slideAbleElContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#f1f3f5',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideAbleElTrack: {
    height: '90%',
    width: '98%',
    borderRadius: 100,
  },
  slideAble: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  toggleTypeElement: {
    paddingHorizontal: 10,
    minWidth: 65,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
