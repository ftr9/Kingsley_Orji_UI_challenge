import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { generateInterpolationRange } from '@/utils/generateInterpolationRange';
import StackImage from '@/components/StackImage';
import ActiveFoodIndicator from '@/components/ActiveFoodIndicator';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { MovementDirection, IProduct } from '@/types';
import Header from '@/components/Header';

interface IProductPageProps {
  products: IProduct[];
}

const ProductPage = ({ products }: IProductPageProps) => {
  const dragSharedValue = useSharedValue(30);

  const setIdAndDirectionAction = useActiveSelectedFoodStore(
    store => store.setIdAndDirection
  );

  useEffect(() => {
    setIdAndDirectionAction(2, MovementDirection.NEUTRAL);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ActiveFoodIndicator products={products} />
      <View style={{ flex: 1 }}>
        {products.map((milkshakes, index) => {
          return (
            <StackImage
              key={index}
              interpolationRange={generateInterpolationRange(index * 10)}
              dragSharedValue={dragSharedValue}
              source={milkshakes.imageSrc}
              productSize={products.length}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({});
