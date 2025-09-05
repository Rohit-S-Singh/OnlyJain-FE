import React, { useState, FC } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,  
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import StyledButton from '../components/common/Button';
import StyledInput from '../components/common/Input';
import OtpInput from '../components/common/OtpInput';

// ========================================================================
// Type Definitions for Sub-component Props
// ========================================================================
interface PhoneNumberInputViewProps {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  onSendOtp: () => void;
}

interface OtpVerificationViewProps {
  onVerifyOtp: (otp: string) => void;
  onResendOtp: () => void;
  disabled: boolean;
}

// ========================================================================
// Sub-component for the Phone Number Input View
// ========================================================================
const PhoneNumberInputView: FC<PhoneNumberInputViewProps> = ({ phoneNumber, setPhoneNumber, onSendOtp }) => {
  return (
    <View style={styles.sectionContainer}>
      <StyledInput
        label={STRINGS.phoneOrEmail}
        placeholder={STRINGS.enterDetailsPlaceholder}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        containerStyle={{}}
        error={null}
        // You can add an icon prop to StyledInput if you implement it
      />
      <StyledButton
        title={STRINGS.sendOtp}
        onPress={onSendOtp}
        style={{}}
        textStyle={{}}
        disabled={false}
      />
    </View>
  );
};

// ========================================================================
// Sub-component for the OTP Verification View
// ========================================================================
const OtpVerificationView: FC<OtpVerificationViewProps> = ({ onVerifyOtp, onResendOtp, disabled }) => {
  return (
    // The entire view is semi-transparent and non-interactive when disabled
    <View style={[styles.sectionContainer, disabled && styles.disabledSection]}>
      <Text style={styles.label}>{STRINGS.enterOtp}</Text>
      <Text style={styles.subLabel}>{STRINGS.verifyAccount}</Text>
      <OtpInput onComplete={onVerifyOtp} />
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>{STRINGS.didntReceiveOtp} </Text>
        <TouchableOpacity onPress={onResendOtp} disabled={disabled} style={styles.resendButton}>
          <Text style={styles.resendButtonText}>{STRINGS.resend}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ========================================================================
// Main LoginScreen Component
// ========================================================================
const LoginScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleSendOtp = (): void => {
    console.log('Sending OTP to:', phoneNumber);
    setIsOtpSent(true); 
  };

  const handleVerifyOtp = (otp: string): void => {
    if (isOtpSent) {
      console.log('Verifying OTP:', otp);
      // On success, navigate to the next screen
    }
  };
  
  const handleResendOtp = (): void => {
    if (isOtpSent) {
      console.log('Resending OTP...');
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Main Title and Subtitle */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{STRINGS.welcomeBack}</Text>
            <Text style={styles.subtitle}>{STRINGS.loginPrompt}</Text>
          </View>

          {/* Both components are now rendered sequentially */}
          <PhoneNumberInputView
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSendOtp={handleSendOtp}
          />
          <OtpVerificationView
            onVerifyOtp={handleVerifyOtp}
            onResendOtp={handleResendOtp}
            disabled={!isOtpSent} // OTP view is disabled until OTP is sent
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// ========================================================================
// Styles (Updated to match the image)
// ========================================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0FFF0', // A light green background like the image
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.placeholder,
    marginTop: 4,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 40,
  },
  disabledSection: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: 'left',
  },
  subLabel: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginBottom: 20,
    textAlign: 'left',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  resendButton: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  resendButtonText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
