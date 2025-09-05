import React,{ useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,  
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar,
  Alert 
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import StyledButton from '../components/common/Button';
import StyledInput from '../components/common/Input';
import OtpInput from '../components/common/OtpInput';
import { getFontSize } from '../utils/fonts';

// ========================================================================
// Type Definitions
// ========================================================================
interface PhoneNumberInputViewProps {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  onSendOtp: () => void;
  isValid: boolean;
  error: string | null;
  loading: boolean;
}

interface OtpVerificationViewProps {
  onVerifyOtp: (otp: string) => void;
  onResendOtp: () => void;
  disabled: boolean;
  loading: boolean;
}

// ========================================================================
// Sub-components
// ========================================================================
const PhoneNumberInputView: React.FC<PhoneNumberInputViewProps> = ({ phoneNumber, setPhoneNumber, onSendOtp, isValid, error, loading }) => {
  return (
    <View style={styles.sectionContainer}>
      <StyledInput
        label={STRINGS.phoneOrEmail}
        placeholder={STRINGS.enterDetailsPlaceholder}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={10}
        error={error}
      />
      <StyledButton
        title={loading ? 'Sending...' : STRINGS.sendOtp}
        onPress={onSendOtp}
        disabled={!isValid || loading}
      />
    </View>
  );
};

const OtpVerificationView: React.FC<OtpVerificationViewProps> = ({ onVerifyOtp, onResendOtp, disabled, loading }) => {
  return (
    <View style={[styles.sectionContainer, disabled && styles.disabledSection]}>
      <Text style={styles.label}>{STRINGS.enterOtp}</Text>
      <Text style={styles.subLabel}>{STRINGS.verifyAccount}</Text>
      {/* The OtpInput component itself doesn't have a loading state, but the parent view is disabled */}
      <OtpInput onComplete={onVerifyOtp} disabled={disabled} />
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
// Main LoginScreen Component with Firebase Logic
// ========================================================================
const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // This state will hold the confirmation result from Firebase
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const isPhoneValid = phoneNumber.length === 10;

  useEffect(() => {
    if (phoneNumber.length > 0 && phoneNumber.length < 10) {
      setPhoneError('Phone number must be 10 digits.');
    } else {
      setPhoneError(null);
    }
  }, [phoneNumber]);

  // --- Firebase Handler Functions ---

  const handleSendOtp = async (): Promise<void> => {
    if (!isPhoneValid) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    try {
      // Use the Indian country code +91
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation); // Store the confirmation object
      setIsOtpSent(true);
      Alert.alert('OTP Sent!', 'Please check your messages.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string): Promise<void> => {
    if (isOtpSent && confirm) {
      setLoading(true);
      try {
        await confirm.confirm(otp);
        // User is now signed in!
        Alert.alert('Success!', 'You are logged in.');
        // Here you would navigate to the next screen (e.g., RoleSelectionScreen)
      } catch (error: any) {
        Alert.alert('Invalid Code', error.message || 'The OTP you entered is incorrect.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleResendOtp = (): void => {
    if (isOtpSent) {
      // For simplicity, we can just call handleSendOtp again.
      // In a real app, you might want a timer here.
      handleSendOtp();
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
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{STRINGS.welcomeBack}</Text>
            <Text style={styles.subtitle}>{STRINGS.loginPrompt}</Text>
          </View>

          <PhoneNumberInputView
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSendOtp={handleSendOtp}
            isValid={isPhoneValid}
            error={phoneError}
            loading={loading && !isOtpSent}
          />
          <OtpVerificationView
            onVerifyOtp={handleVerifyOtp}
            onResendOtp={handleResendOtp}
            disabled={!isOtpSent}
            loading={loading && isOtpSent}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0FFF0',
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
    fontSize: getFontSize(32),
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize:getFontSize(18),
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
    fontSize: getFontSize(16),
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: 'left',
  },
  subLabel: {
    fontSize: getFontSize(14),
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
    fontSize: getFontSize(14),
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
    fontSize: getFontSize(14),
    fontWeight: 'bold',
  },
});

export default LoginScreen;

