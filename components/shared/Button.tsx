import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcc419',
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
