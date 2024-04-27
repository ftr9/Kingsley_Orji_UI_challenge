import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ICartCounter {
  onIncrementClick: () => boolean;
  onDecrementClick: () => boolean;
}

const CartCounter = ({ onIncrementClick, onDecrementClick }: ICartCounter) => {
  const [cartCount, setCartCount] = useState(1);

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      entering={FadeInDown.duration(500)}
    >
      <TouchableOpacity
        onPress={() => {
          if (cartCount <= 0) return;

          if (onDecrementClick()) {
            setCartCount(cartCount - 1);
          }
        }}
      >
        <Ionicons size={22} name="remove-outline" />
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{cartCount}</Text>
      <TouchableOpacity
        onPress={() => {
          if (onIncrementClick()) {
            setCartCount(cartCount + 1);
          }
        }}
      >
        <Ionicons size={22} name="add"></Ionicons>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CartCounter;
