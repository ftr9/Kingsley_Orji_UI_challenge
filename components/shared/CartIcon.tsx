import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import useCart from '@/store/Cart.store';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const CartIcon = () => {
  const { items: cartItems } = useCart();

  return (
    <View>
      {cartItems.length !== 0 && (
        <Animated.View
          key={Math.random()}
          entering={FadeIn.delay(500).duration(1000)}
          exiting={FadeOut.duration(500)}
          style={styles.numberContainer}
        >
          <Text style={{ fontSize: 10 }}>{cartItems.length}</Text>
        </Animated.View>
      )}

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/1174/1174408.png',
        }}
        style={{
          height: 28,
          width: 28,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  numberContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    transform: [{ translateY: 4 }],
  },
});
