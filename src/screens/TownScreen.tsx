import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TownScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#9e9e9e',
    fontWeight: '500',
  },
});

export default TownScreen;
