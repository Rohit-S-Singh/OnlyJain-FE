// src/screens/HomeScreen/HomeScreen.tsx

import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});

export default HomeScreen;
