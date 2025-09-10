import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Import the shared theme file
import { COLORS } from '../constants/colors';// NOTE: Adjust this path to your project structure
import { useDispatch } from 'react-redux';
import { logout } from '../redux/store/slices/authSlice';

// ========================================================================
// Modular Sub-components (within the same file)
// ========================================================================

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * A reusable input component with custom focus styling.
 */
const FormInput: React.FC<FormInputProps> = ({ placeholder, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[
        styles.input,
        isFocused && { borderBottomColor: COLORS.primary },
      ]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  disabled?: boolean;
}

/**
 * A reusable button component for primary actions.
 */
const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, backgroundColor, disabled }) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor },
      disabled && { backgroundColor: COLORS.placeholder }, // Use placeholder color for disabled state
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ========================================================================
// Main Screen Component
// ========================================================================

const CreateProfileScreen = () => {
  // --- State Management ---
  const [fullName, setFullName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [locationAccessGranted, setLocationAccessGranted] = useState(false);
  const dispatch = useDispatch();
  // --- Validation Logic ---
  const isProceedDisabled = !fullName || !businessAddress || !locationAccessGranted;

  // --- Event Handlers ---

  /**
   * Handles the logic for requesting location permission.
   */

   const handleLogout = () => {
          dispatch(logout());
      };

  const handleAllowLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location to register your business.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationAccessGranted(true);
          Alert.alert('Success', 'Location access granted!');
        } else {
          Alert.alert('Permission Denied', 'Location access is required to proceed.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For iOS, permission is handled differently (usually in Info.plist)
      // This is a placeholder for iOS logic.
      setLocationAccessGranted(true);
      Alert.alert('Success', 'Location access granted!');
    }
  };

  /**
   * Handles the final submission of the profile.
   */
  const handleProceed = () => {
    if (isProceedDisabled) {
      Alert.alert('Incomplete Profile', 'Please provide your name, address, and grant location access.');
      return;
    }
    console.log('Proceeding with profile creation...');
    console.log({ fullName, businessAddress });
    Alert.alert('Profile Created!', `Welcome, ${fullName}!`);
    // Navigate to the next screen here
  };

  // --- Render Method ---
  return (
    <SafeAreaView style={styles.safeArea}>
       <TouchableOpacity onPress={handleLogout}>
                      <Text>Log Out</Text>
                  </TouchableOpacity>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Create Your Profile</Text>

            <View style={styles.inputContainer}>
              <FormInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <FormInput
                placeholder="Business Address"
                value={businessAddress}
                onChangeText={setBusinessAddress}
              />
            </View>

            <View style={styles.buttonContainer}>
              <ActionButton
                title={locationAccessGranted ? 'Location Access Granted' : 'Allow Location Access'}
                onPress={handleAllowLocation}
                backgroundColor={locationAccessGranted ? COLORS.secondary : COLORS.primary}
              />
              <ActionButton
                title="Proceed"
                onPress={handleProceed}
                backgroundColor={COLORS.secondary}
                disabled={isProceedDisabled}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ========================================================================
// Stylesheet
// ========================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.secondary, // Using theme secondary color
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS.placeholder, // Using theme placeholder color
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.placeholder, // Using theme placeholder color
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 25,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateProfileScreen;
