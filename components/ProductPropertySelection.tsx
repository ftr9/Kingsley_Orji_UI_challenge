import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import Animated, { SharedValue, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { IProduct } from '@/types';

import useCart from '@/store/Cart.store';
import ToggleType from './ToggleType';
import { usePathname } from 'expo-router';
import RoundedIcon from './shared/RoundedIcon';
import CartCounter from './shared/CartCounter';
import Button from './shared/Button';

interface IProductPropSelectionProp {
  sizeSharedValue: SharedValue<number>;
  products: IProduct[];
  isAddedToCardSharedValue: SharedValue<number>;
}

const findProductById = (id: number, products: IProduct[]) => {
  const selectedProduct = products.find(product => product.id === id);
  return selectedProduct;
};

const ProductPropSelection = ({
  sizeSharedValue,
  products,
  isAddedToCardSharedValue,
}: IProductPropSelectionProp) => {
  const pathname = usePathname();

  const tappedActiveId = useActiveSelectedFoodStore(
    store => store.tappedActiveId
  );

  const [addToCartAction, cartItems, removeFromCart] = useCart(state => [
    state.addToCart,
    state.items,
    state.removeFromCart,
  ]);

  const [activeSize, setActiveSize] = useState<
    'Small' | 'Medium' | 'Large' | 'Default'
  >('Default');

  const smallClickHandle = () => {
    sizeSharedValue.value = 1;
    setActiveSize('Small');
  };

  const mediumClickHandle = () => {
    sizeSharedValue.value = 2;
    setActiveSize('Medium');
  };

  const largeClickHandle = () => {
    sizeSharedValue.value = 3;
    setActiveSize('Large');
  };

  const isSmallSelected = activeSize === 'Small';
  const isMediumSelected = activeSize === 'Medium';
  const isLargeSelected = activeSize === 'Large';

  const addCartClickHandle = () => {
    if (activeSize === 'Default') return;
    const selectedProduct = findProductById(tappedActiveId, products);
    if (selectedProduct) {
      addToCartAction(selectedProduct);
    }
    isAddedToCardSharedValue.value = 1;
  };

  const incrementCartHandle = () => {
    if (activeSize === 'Default') return false;
    const selectedProduct = findProductById(tappedActiveId, products);
    if (selectedProduct) {
      addToCartAction(selectedProduct);
    }
    isAddedToCardSharedValue.value = 1;
    return true;
  };

  const decrementCartHandle = () => {
    if (activeSize === 'Default') return false;
    removeFromCart();
    return true;
  };

  if (tappedActiveId === -1) {
    return;
  }

  return (
    <Animated.View
      entering={SlideInDown.duration(200)}
      style={styles.mainContainer}
    >
      {/**SIZES SELECTION */}
      <View style={styles.sizeSelectionContainer}>
        <RoundedIcon
          isActive={isSmallSelected}
          onClick={smallClickHandle}
          name="Small"
        >
          <Ionicons
            color={isSmallSelected ? 'white' : 'black'}
            name="cafe-outline"
            size={18}
          />
        </RoundedIcon>
        <RoundedIcon
          isActive={isMediumSelected}
          onClick={mediumClickHandle}
          name="Medium"
        >
          <Ionicons
            color={isMediumSelected ? 'white' : 'black'}
            name="cafe-outline"
            size={18}
          />
        </RoundedIcon>

        <RoundedIcon
          isActive={isLargeSelected}
          onClick={largeClickHandle}
          name="Large"
        >
          <Ionicons
            color={isLargeSelected ? 'white' : 'black'}
            name="cafe-outline"
            size={18}
          />
        </RoundedIcon>
        <RoundedIcon isActive={false} name="More">
          <Ionicons name="arrow-forward-outline" size={18} />
        </RoundedIcon>
      </View>

      {/**CALL-TO-ACTION */}
      <View style={styles.ctaContainer}>
        {pathname.includes('milkshakes') && (
          <ToggleType leftText="Hot" rightText="Iced " />
        )}
        {pathname.includes('burgers') && <Button>Customize</Button>}

        <View style={{ marginLeft: 10 }}>
          {cartItems.length === 0 ? (
            <RoundedIcon isActive={false} onClick={addCartClickHandle}>
              <Ionicons name="add" />
            </RoundedIcon>
          ) : (
            <CartCounter
              onIncrementClick={incrementCartHandle}
              onDecrementClick={decrementCartHandle}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default ProductPropSelection;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  sizeSelectionContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
  },
  ctaContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
