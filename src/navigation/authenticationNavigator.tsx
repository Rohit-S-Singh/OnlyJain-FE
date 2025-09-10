import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
// Other auth screens like RoleSelectionScreen will be added here

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false, // Hides the header for a cleaner look
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* Example of how other screens will be added:
        <AuthStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
