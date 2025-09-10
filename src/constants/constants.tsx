/**
 * Defines the color palette for the Sattvik app.
 * Using a central file for colors ensures consistency and makes
 * theme changes easier in the future.
 */
export const COLORS = {
  primary: '#FF9F43', // Saffron Orange
  secondary: '#2ECC71', // Leaf Green
  background: '#FDFDFD', // Off-White
  textDark: '#3D3D3D', // Earthy Gray
  textLight: '#FFFFFF',
  placeholder: '#A9A9A9', // Light Gray
  lightGray: '#F1F1F1',
  border: '#E0E0E0',
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
}
export const FONTS = {
  family: 'Roboto',
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  semiBold: 'Roboto-SemiBold',
  bold: 'Roboto-Bold',
  extraBold: 'Roboto-ExtraBold',
  black: 'Roboto-Black',
};
export const icons = {
  back: require('../assets/icons/back.png'),
  menu: require('../assets/icons/menu.png'),
  search: require('../assets/icons/search.png'),
  user: require('../assets/icons/user.png'),
  cart: require('../assets/icons/cart.png'),
  home: require('../assets/icons/home.png'),
  categories: require('../assets/icons/categories.png'),
  orders: require('../assets/icons/orders.png'),
  profile: require('../assets/icons/profile.png'),
};
export const images = {
  logo: require('../assets/images/logo.png'),
  splash: require('../assets/images/splash.png'),
  placeholder: require('../assets/images/placeholder.png'),
};

/**
 * Central repository for all user-facing strings in the app.
 * This helps in managing text content and preparing for future
 * localization (multi-language support).
 */


const appTheme = { COLORS, SIZES, FONTS, SHADOWS, icons, images };

export default appTheme;