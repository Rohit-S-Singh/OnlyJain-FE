import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';

/**
 * Placeholder screen for after the user logs in.
 * We will build the UI for this screen next.
 */
const RoleSelectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Login Successful!</Text>
      <Text style={styles.subtext}>Role Selection Screen will be built here.</Text>
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
  subtext: {
    fontSize: 16,
    color: COLORS.placeholder,
    marginTop: 10,
  },
});

export default RoleSelectionScreen;
