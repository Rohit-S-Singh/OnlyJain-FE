import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import StyledInput from '../components/common/Input';
import OtpInput from '../components/common/OtpInput';
import StyledButton from '../components/common/Button';

/**
 * The main screen for user authentication.
 * Handles both phone/email input and OTP verification.
 */
const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Placeholder function for sending OTP
  const handleSendOtp = () => {
    // Add logic to validate phone number and call API
    console.log('Sending OTP to:', phoneNumber);
    setIsOtpSent(true); // Move to OTP view
  };

  // Placeholder function for verifying OTP
  const handleVerifyOtp = (otp) => {
    console.log('Verifying OTP:', otp);
    // Add logic to call verification API
    // On success, navigate to RoleSelection or Home
  };
  
  // Placeholder function for resending OTP
  const handleResendOtp = () => {
    console.log('Resending OTP...');
    // Add timer and resend logic
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{STRINGS.welcomeBack}</Text>
          <Text style={styles.subtitle}>{STRINGS.loginPrompt}</Text>

          {!isOtpSent ? (
            <View style={styles.inputContainer}>
              <StyledInput
                label={STRINGS.phoneOrEmail}
                placeholder={STRINGS.enterDetailsPlaceholder}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <StyledButton title={STRINGS.sendOtp} onPress={handleSendOtp} />
            </View>
          ) : (
            <View style={styles.otpContainer}>
              <Text style={styles.otpHeader}>{STRINGS.enterOtp}</Text>
              <Text style={styles.otpSubHeader}>{STRINGS.verifyAccount}</Text>
              <OtpInput onComplete={handleVerifyOtp} />
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>{STRINGS.didntReceiveOtp} </Text>
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={[styles.resendText, styles.resendLink]}>{STRINGS.resend}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.placeholder,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
  },
  otpHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  otpSubHeader: {
    fontSize: 16,
    color: COLORS.placeholder,
    marginBottom: 30,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
