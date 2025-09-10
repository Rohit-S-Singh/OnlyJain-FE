// src/screens/OtpVerificationScreen/OtpVerificationScreen.styles.ts

import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: hp(5),
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: hp(2),
    color: COLORS.placeholder,
    marginTop: hp(1),
    textAlign: 'center',
  },
  footerContainer: {
    marginTop: hp(4),
  },
  otpInput: {
    width: '100%',
    textAlign: 'center',
    fontSize: hp(3),
    letterSpacing: wp(5),
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    padding: hp(1),
    color: COLORS.textDark,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
  },
  resendText: {
    fontSize: hp(1.8),
    color: COLORS.placeholder,
  },
  resendButton: {
    marginLeft: wp(1),
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },
  // --- Styles for the "Change Number" link ---
  changeNumberButton: {
    marginTop: hp(2),
    alignItems: 'center',
  },
  changeNumberButtonText: {
    color: COLORS.placeholder,
    fontSize: hp(1.8),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
