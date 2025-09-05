import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './authenticationNavigator';

/**
 * RootNavigator is the central navigation controller.
 * It will decide whether to show the authentication flow (AuthNavigator)
 * or the main app flow (Customer/Vendor navigators) based on the user's
 * login state.
 *
 * For now, it defaults to showing the AuthNavigator.
 */
const RootNavigator = () => {
  const isUserLoggedIn = false; // This will be determined by Redux state later

  return (
    <NavigationContainer>
      {/* A splash screen could be shown here while checking login state.
        Currently, it directly shows the AuthNavigator.
      */}
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
