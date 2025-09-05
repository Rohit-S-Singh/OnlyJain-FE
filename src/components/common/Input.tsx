import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

/**
 * A reusable, styled text input component.
 * @param {object} props
 * @param {string} props.label - The label text to display above the input.
 * @param {string} props.placeholder - The placeholder text.
 * @param {string} props.value - The value of the input.
 * @param {function} props.onChangeText - Function to call on text change.
 * @param {string} [props.keyboardType='default'] - The keyboard type to use.
 * @param {object} [props.containerStyle] - Optional styles for the container.
 * @param {string} [props.error] - An error message to display below the input.
 */
const StyledInput = ({ label, placeholder, value, onChangeText, keyboardType = 'default', containerStyle, error }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.errorBorder : null]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textDark,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    marginTop: 5,
    fontSize: 12,
  },
});

export default StyledInput;
