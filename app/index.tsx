import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { MILK_SHAKES } from '@/constants/Data/MilkShakes';
import { generateInterpolationRange } from '@/utils/generateInterpolationRange';
import StackImage from '@/components/StackImage';

const MainPage = () => {
  const dragSharedValue = useSharedValue(30);

  const incrementHandle = () => {
    if (dragSharedValue.value >= 10 * MILK_SHAKES.length) return;
    dragSharedValue.value = withTiming(dragSharedValue.value + 10, {
      duration: 600,
    });
  };

  const decrementHandle = () => {
    if (dragSharedValue.value < 20) return;
    dragSharedValue.value = withTiming(dragSharedValue.value - 10, {
      duration: 600,
    });
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Button title="increment" onPress={incrementHandle}></Button>

      <Button title="Decrement" onPress={decrementHandle}></Button>

      {MILK_SHAKES.map((milkshakes, index) => {
        return (
          <StackImage
            key={`${index}`}
            interpolationRange={generateInterpolationRange(index * 10)}
            dragSharedValue={dragSharedValue}
            source={milkshakes.imageSrc}
          />
        );
      })}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});
