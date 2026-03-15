import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { NetworkProvider } from './context/NetworkContext';
import { RevisionProvider } from './context/RevisionContext';
import NetworkStatus from './components/NetworkStatus';
import { networkMonitor } from './services/networkService';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    networkMonitor.init();
  }, []);

  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <RevisionProvider>
          <NavigationContainer>
            <NetworkStatus />
            <AppNavigator />
          </NavigationContainer>
        </RevisionProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
