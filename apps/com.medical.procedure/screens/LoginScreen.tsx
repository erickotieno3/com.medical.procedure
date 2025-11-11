import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import MedicalButton from '../components/MedicalButton';

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '<YOUR_EXPO_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>',
    androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
    webClientId: '<YOUR_WEB_CLIENT_ID>',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google OAuth Success:', authentication);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Medical Procedure App</Text>
      <MedicalButton title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
  },
});

export default LoginScreen;
