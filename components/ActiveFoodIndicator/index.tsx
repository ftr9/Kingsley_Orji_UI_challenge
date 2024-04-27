import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActiveFoodIndicatorName from './ActiveFoodIndicatorName';
import ActiveFoodPrice from './ActiveFoodPrice';
import { IProduct } from '@/types';

interface IActiveFoodIndicator {
  products: IProduct[];
}

const ActiveFoodIndicator = ({ products }: IActiveFoodIndicator) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        {products.map((el, idx) => (
          <ActiveFoodIndicatorName
            key={`${idx}`}
            category={el.category}
            name={el.name}
            id={idx}
          />
        ))}
      </View>

      <ActiveFoodPrice products={products} />
    </View>
  );
};

export default ActiveFoodIndicator;

const styles = StyleSheet.create({});
