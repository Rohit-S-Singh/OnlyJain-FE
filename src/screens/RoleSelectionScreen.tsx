import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { getFontSize } from '../utils/fonts';

// ========================================================================
// Type Definitions
// ========================================================================

interface RoleButtonProps {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

// ========================================================================
// Sub-components (Modular Approach)
// ========================================================================

/**
 * Renders the header section with the title and progress bar.
 */
const ScreenHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>{STRINGS.selectYourRole}</Text>
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarFill} />
    </View>
  </View>
);

/**
 * A reusable button component for role selection.
 */
const RoleButton: React.FC<RoleButtonProps> = ({ title, onPress, style }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ========================================================================
// Main Screen Component
// ========================================================================

const RoleSelectionScreen: React.FC = () => {

  const handleSelectRole = (role: 'customer' | 'vendor') => {
    // Navigate to the next screen based on the selected role
    console.log(`Selected role: ${role}`);
    // Example: navigation.navigate(role === 'customer' ? 'CustomerFlow' : 'VendorFlow');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        <ScreenHeader />

        <RoleButton
          title={STRINGS.iAmACustomer}
          onPress={() => handleSelectRole('customer')}
          style={styles.customerButton}
        />

        <RoleButton
          title={STRINGS.iAmAVendor}
          onPress={() => handleSelectRole('vendor')}
          style={styles.vendorButton}
        />
      </View>
    </SafeAreaView>
  );
};

// ========================================================================
// Styles
// ========================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  // Header styles
  headerContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 6,
    width: 150,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '50%', // Represents step 1 of 2
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  // Button styles
  button: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 8,
  },
  customerButton: {
    backgroundColor: COLORS.primary,
  },
  vendorButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: getFontSize(18),
    fontWeight: 'bold',
  },
});

export default RoleSelectionScreen;

