// src/screens/LoginScreen/LoginScreen.styles.ts

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
});
