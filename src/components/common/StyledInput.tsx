import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Dimensions } from 'react-native';

// ========================================================================
// Theme & Constants (Self-contained for portability)
// ========================================================================

const COLORS = {
  primary: '#FF9933',
  secondary: '#2E8B57',
  background: '#FEFDFB',
  textDark: '#343434',
  placeholder: '#A9A9A9',
  border: '#E0E0E0',
  lightGrey: '#F5F5F5',
  error: '#D32F2F',
};

const SIZES = {
  radius: 12,
};

// Responsive Helpers
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;


// ========================================================================
// Reusable StyledInput Component
// ========================================================================

interface StyledInputProps extends TextInputProps {
  label: string;
  error?: string | null;
}

const StyledInput: React.FC<StyledInputProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && { borderBottomColor: COLORS.primary },
          error ? { borderBottomColor: COLORS.error } : {},
        ]}
        placeholderTextColor={COLORS.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: hp(1.8),
    color: COLORS.textDark,
    marginBottom: hp(1),
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomWidth: 2,
    borderRadius: SIZES.radius,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: hp(2),
    color: COLORS.textDark,
    letterSpacing: 0, 
  },
  errorText: {
    color: COLORS.error,
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
});

export default StyledInput;

