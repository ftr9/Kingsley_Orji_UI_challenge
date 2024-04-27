import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { generateInterpolationRange } from '@/utils/generateInterpolationRange';
import StackImage from '@/components/StackImage';
import ActiveFoodIndicator from '@/components/ActiveFoodIndicator';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { MovementDirection, IProduct } from '@/types';
import Header from '@/components/shared/Header';
import { useShallow } from 'zustand/react/shallow';
import ProductPropSelection from '../ProductPropertySelection';

interface IProductPageProps {
  products: IProduct[];
}

const ProductPage = ({ products }: IProductPageProps) => {
  const dragSharedValue = useSharedValue(30);
  const isClickedSharedValue = useSharedValue(0);
  const sizeSharedValue = useSharedValue(0);
  const isAddedToCardSharedValue = useSharedValue(0);

  const [setIdAndDirectionAction, setTapStatusAndIdAction] =
    useActiveSelectedFoodStore(
      useShallow(store => [store.setIdAndDirection, store.setTapStatusAndId])
    );

  useEffect(() => {
    setIdAndDirectionAction(2, MovementDirection.NEUTRAL);

    return () => {
      setIdAndDirectionAction(-1, MovementDirection.NEUTRAL);
      setTapStatusAndIdAction(false, -1);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ActiveFoodIndicator products={products} />
      <View style={{ flex: 1 }}>
        {products.map((product, index) => {
          return (
            <StackImage
              key={index}
              interpolationRange={generateInterpolationRange(index * 10)}
              dragSharedValue={dragSharedValue}
              source={product.imageSrc}
              productSize={products.length}
              index={index}
              isClickedSharedValue={isClickedSharedValue}
              sizeSharedValue={sizeSharedValue}
              isAddedToCardSharedValue={isAddedToCardSharedValue}
            />
          );
        })}
      </View>
      <ProductPropSelection
        isAddedToCardSharedValue={isAddedToCardSharedValue}
        products={products}
        sizeSharedValue={sizeSharedValue}
      />
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({});
