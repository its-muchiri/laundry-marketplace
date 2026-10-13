import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as JobProvider } from './src/context/JobContext';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <JobProvider>
          <AppNavigator />
        </JobProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);