import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

/**
 * A reusable component for entering a 4-digit OTP.
 * @param {object} props
 * @param {function(string): void} props.onComplete - Callback when all digits are filled.
 */
const OtpInput = ({ onComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== '' && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={el => (inputs.current[index] = el)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          value={otp[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    backgroundColor: COLORS.background,
  },
});

export default OtpInput;
