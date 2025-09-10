// src/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';

// 1. Import all the necessary screens for your flow
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen/OtpVerificationScreen';

import { RootState } from '../redux/store/store';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated, isNewUser } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // User is logged out: show the authentication flow
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
          </>
        ) : isNewUser ? (
          // User is logged in BUT is new: show the onboarding flow
          <>
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
            {/* Add other onboarding screens here, like RestaurantDetailsScreen */}
          </>
        ) : (
          // User is logged in AND is an existing user: show the main app
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
