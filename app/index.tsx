import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import CartIcon from '@/components/shared/CartIcon';
import { MENU } from '@/constants/Data/Menu';
import MenuItem from '@/components/MenuItem';
import FadeInFromBottom from '@/components/animation/FadeInFromBottom';

const RootPageHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Menu
      </Text>
      <CartIcon />
    </View>
  );
};

const RootPage = () => {
  const router = useRouter();

  const menuItemClickHandle = (link: any) => {
    return () => {
      router.push(link);
    };
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <RootPageHeader />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        data={MENU}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => (
          <FadeInFromBottom index={index}>
            <MenuItem
              onClick={menuItemClickHandle(`/foods/${item.link}`)}
              {...item}
            />
          </FadeInFromBottom>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginBottom: 15,
            }}
          ></View>
        )}
      />
    </View>
  );
};

export default RootPage;

const styles = StyleSheet.create({});
