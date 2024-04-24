import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MILK_SHAKES } from '@/constants/Data/MilkShakes';
import ProductPage from '@/components/shared/ProductPage';

const MilkShakes = () => {
  return <ProductPage products={MILK_SHAKES} />;
};

export default MilkShakes;

const styles = StyleSheet.create({});
