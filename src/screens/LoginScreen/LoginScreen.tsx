// src/screens/LoginScreen/LoginScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { STRINGS } from '../../constants/strings';
import { COLORS } from '../../constants/colors';
import StyledInput from '../../components/common/StyledInput';
import StyledButton from '../../components/common/StyledButton';
import { styles } from './LoginScreen.styles';
import { postSendOtp } from '../../redux/store/thunks/authThunk';
import { AppDispatch, RootState } from '../../redux/store/store';
// 1. Import the setPhoneNumber action
import { setPhoneNumber as setGlobalPhoneNumber } from '../../redux/store/slices/authSlice';
type RootStackParamList = {
  OtpVerification: { phoneNumber: string };
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OtpVerification'
>;

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const { loading } = useSelector((state: RootState) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const isPhoneValid = phoneNumber.length === 10;

  useEffect(() => {
    // This effect now also dispatches the phone number to the Redux store
    if (phoneNumber.length > 0 && !isPhoneValid) {
      setPhoneError('Phone number must be 10 digits.');
    } else {
      setPhoneError(null);
      // 2. Dispatch the phone number to keep the global state in sync
      dispatch(setGlobalPhoneNumber(phoneNumber));
    }
  }, [phoneNumber, isPhoneValid, dispatch]);

  const handleSendOtp = async (): Promise<void> => {
    if (!isPhoneValid) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }

    const params = { phoneNumber: `+91${phoneNumber}` };

    try {
      await dispatch(postSendOtp(params)).unwrap();
      navigation.navigate('OtpVerification', { phoneNumber });
    } catch (error: any) {
      Alert.alert(
        'Error Sending OTP',
        error || 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{STRINGS.welcomeBack}</Text>
            <Text style={styles.subtitle}>{STRINGS.loginPrompt}</Text>
          </View>
          <StyledInput
            label={STRINGS.phoneOrEmail}
            placeholder={STRINGS.enterDetailsPlaceholder}
            value={phoneNumber}
            // 3. The onChangeText now only updates local state, letting the useEffect handle the logic
            onChangeText={text => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
            keyboardType="phone-pad"
            maxLength={10}
            error={phoneError}
          />
          <View style={styles.footerContainer}>
            <StyledButton
              title={loading ? 'Sending...' : STRINGS.sendOtp}
              onPress={handleSendOtp}
              disabled={!isPhoneValid || loading}
              variant="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;