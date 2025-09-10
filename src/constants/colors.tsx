/**
 * Defines the central color palette for the Sattvik (Jain Food App) application.
 * This theme is inspired by the colors significant to Jain culture, focusing on
 * purity, harmony, and auspiciousness.
 */
export const COLORS = {      // Deep Red: For error messages and alerts.
  primary: '#FF9933',      // Saffron/Orange for primary actions
    primaryLight: '#FFD6A9',   // Lighter orange for disabled state
    secondary: '#2E8B57',    // Green for secondary actions/success
    background: '#FEFDFB',  // A very light, clean off-white
    textDark: '#343434',
    textLight: '#FFFFFF',
    placeholder: '#A9A9A9',
    border: '#E0E0E0',
    lightGrey: '#F5F5F5',
    error: '#D32F2F',
};





export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  // Font sizes
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
};
export const FONTS = {
  family: 'Roboto', // Replace with your app's font if you have one
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

const appTheme = { COLORS, SIZES, FONTS, SHADOWS};

export default appTheme;
