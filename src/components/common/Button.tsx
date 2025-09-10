import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

/**
 * A reusable, styled button component for consistent look and feel.
 * @param {object} props
 * @param {string} props.title - The text to display on the button.
 * @param {function} props.onPress - The function to execute when pressed.
 * @param {object} [props.style] - Optional custom styles for the button container.
 * @param {object} [props.textStyle] - Optional custom styles for the button text.
 * @param {boolean} [props.disabled] - If true, the button is not pressable.
 */
const StyledButton = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? COLORS.placeholder : COLORS.primary }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StyledButton;

