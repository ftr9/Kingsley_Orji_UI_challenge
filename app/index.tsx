import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const RootPage = () => {
  return (
    <View>
      <Text>RootPage</Text>
      <Link href={'/foods/milkshakes'}>Milkshakes</Link>
      <Link href={'/foods/burgers'}>Burgers</Link>
    </View>
  );
};

export default RootPage;

const styles = StyleSheet.create({});
