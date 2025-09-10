// src/screens/OtpVerificationScreen/OtpVerificationScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { STRINGS } from '../../constants/strings';
import { COLORS } from '../../constants/colors';
import { styles } from './OtpVerificationScreen.styles';
import { AppDispatch, RootState } from '../../redux/store/store';
import { postSendOtp, postVerifyOtp } from '../../redux/store/thunks/authThunk';

// Define navigation prop types for type safety
type RootStackParamList = {
  Login: undefined;
  OtpVerification: { phoneNumber: string };
};
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'OtpVerification'>;
type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const OtpInput = ({ onComplete }: { onComplete: (otp: string) => void }) => {
  const [otp, setOtp] = React.useState('');
  return (
    <TextInput
      style={styles.otpInput}
      placeholder="----"
      placeholderTextColor={COLORS.placeholder}
      maxLength={4}
      keyboardType="number-pad"
      onChangeText={text => {
        setOtp(text);
        if (text.length === 4) {
          onComplete(text);
        }
      }}
      value={otp}
    />
  );
};

const OtpVerificationScreen: React.FC = () => {
  const route = useRoute<OtpScreenRouteProp>();
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const { phoneNumber } = route.params;
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleVerifyOtp = async (otp: string): Promise<void> => {
    const params = { phoneNumber: `+91${phoneNumber}`, otp };
    try {
      // Dispatch the thunk and wait for the result
      await dispatch(postVerifyOtp(params)).unwrap();
      // On success, the AppNavigator will automatically switch screens.
      // We don't need to navigate manually here.
      console.log('✅ OTP Verified Successfully!');
    } catch (rejectedValue) {
      // .unwrap() throws the rejected payload on failure
      Alert.alert('Verification Failed', rejectedValue as string);
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    const params = { phoneNumber: `+91${phoneNumber}` };
    try {
      await dispatch(postSendOtp(params)).unwrap();
      Alert.alert('OTP Resent!', 'A new code has been sent to your number.');
    } catch (rejectedValue) {
      Alert.alert('Error', rejectedValue as string);
    }
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{STRINGS.enterOtp}</Text>
            <Text style={styles.subtitle}>
              {`Enter the code sent to +91 ${phoneNumber}`}
            </Text>
          </View>

          <OtpInput onComplete={handleVerifyOtp} />

          <View style={styles.footerContainer}>
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                {STRINGS.didntReceiveOtp}{' '}
              </Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={loading}
                style={styles.resendButton}>
                <Text style={styles.resendButtonText}>{loading ? 'Resending...' : STRINGS.resend}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleChangeNumber} style={styles.changeNumberButton}>
              <Text style={styles.changeNumberButtonText}>Change Number?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;