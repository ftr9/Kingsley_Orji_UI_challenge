import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CartIcon from './CartIcon';

const Header = () => {
  return (
    <View style={styles.container}>
      <Ionicons color={'#868e96'} name="chevron-back" size={24} />
      <CartIcon />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
