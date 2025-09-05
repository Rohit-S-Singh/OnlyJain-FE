import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text } from 'react-native';
/**
 * The main entry point for the Sattvik app.
 * It wraps the entire application with necessary providers.
 */
const App = () => {
  return (
    <SafeAreaProvider>
      {/* In the future, a Redux Provider will wrap the RootNavigator 
        to manage global state.
      */}
      <View style={{ flex: 1 }}>
        <Text>App Component</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
