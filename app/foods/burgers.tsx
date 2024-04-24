import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProductPage from '@/components/shared/ProductPage';

import { BURGERS } from '@/constants/Data/Burgers';

const Burgers = () => {
  return <ProductPage products={BURGERS} />;
};

export default Burgers;

const styles = StyleSheet.create({});
