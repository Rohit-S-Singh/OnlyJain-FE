// src/screens/OtpVerificationScreen/OtpVerificationScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { STRINGS } from '../../constants/strings';
import { COLORS } from '../../constants/colors';
import { styles } from './OtpVerificationScreen.styles';

// Define navigation prop types for type safety
type RootStackParamList = {
  Login: undefined; // Added Login to the param list
  OtpVerification: { phoneNumber: string };
};
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'OtpVerification'>;
type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


const OtpInput = ({ onComplete }: { onComplete: (otp: string) => void }) => {
  const [otp, setOtp] = useState('');
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
  const navigation = useNavigation<OtpScreenNavigationProp>(); // Hook for navigation
  const { phoneNumber } = route.params;
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = (otp: string): void => {
    setLoading(true);
    setTimeout(() => {
      if (otp.length === 4) {
        Alert.alert('Success!', 'You are logged in.');
        // Navigate to the main app screen here
      } else {
        Alert.alert('Invalid Code', 'The OTP you entered is incorrect.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleResendOtp = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('OTP Resent!', 'Please check your messages again.');
    }, 1500);
  };

  const handleChangeNumber = () => {
    navigation.goBack(); // Navigate to the previous screen in the stack
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

            {/* --- NEW CHANGE HERE --- */}
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
