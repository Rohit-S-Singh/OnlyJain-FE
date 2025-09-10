import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, SHADOWS, SIZES } from '../../constants/colors';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  onPress,
  disabled,
  variant = 'primary',
}) => {
  const backgroundColor =
    variant === 'primary' ? COLORS.primary : COLORS.secondary;
  const disabledColor =
    variant === 'primary' ? COLORS.primaryLight : COLORS.placeholder;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && { backgroundColor: disabledColor },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: hp(2),
        borderRadius: SIZES.radius,
        alignItems: 'center',
        ...SHADOWS.medium,
      },
      buttonDisabled: {
        elevation: 0,
        shadowOpacity: 0,
      },
      buttonText: {
        color: COLORS.textLight,
        fontSize: hp(2),
        fontWeight: 'bold',
      },
});

export default StyledButton;
