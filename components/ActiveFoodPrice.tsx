import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { IProduct } from '@/types';

interface IActiveFoodPrice {
  products: IProduct[];
}

const ActiveFoodPrice = ({ products }: IActiveFoodPrice) => {
  const activeId = useActiveSelectedFoodStore(store => store.activeId);
  const flatListRef = useRef<FlatList | null>(null);

  const shuffledProductArray = useMemo(() => {
    return [...products].sort(el => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    if (activeId === -1) return;

    const activeProductIndex = shuffledProductArray.findIndex(
      el => el.id === activeId
    );

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: activeProductIndex,
        animated: true,
      });
    }
  }, [activeId]);

  return (
    <View
      style={{
        height: 25,
      }}
    >
      <FlatList
        ref={flatListRef}
        onScrollToIndexFailed={() => {
          console.log('something went wrong...');
        }}
        showsVerticalScrollIndicator={false}
        data={shuffledProductArray}
        keyExtractor={(_, idx) => `${idx}`}
        renderItem={({ item }) => {
          return (
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {item.id} $
            </Text>
          );
        }}
      />
    </View>
  );
};

export default ActiveFoodPrice;

const styles = StyleSheet.create({});
