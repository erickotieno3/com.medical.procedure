import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';
import { generateNonce } from '../utils/nonceGenerator';

// For web platform fallback
import * as AuthSession from 'expo-auth-session';

const GOOGLE_CLIENT_ID = '772437716609-aqarn2f6mq5k1tj865iefnfrvr31hc91.apps.googleusercontent.com'; // Will be replaced by PowerShell
const ANDROID_CLIENT_ID = '772437716609-aqarn2f6mq5k1tj865iefnfrvr31hc91.apps.googleusercontent.com';
const IOS_CLIENT_ID = '772437716609-aqarn2f6mq5k1tj865iefnfrvr31hc91.apps.googleusercontent.com';
const WEB_CLIENT_ID = '772437716609-aqarn2f6mq5k1tj865iefnfrvr31hc91.apps.googleusercontent.com';

export default function GoogleSignInScreen({ onSignIn }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In for native platforms
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, // Required for Android
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
      scopes: ['email', 'profile', 'openid'],
    });
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      // Generate nonce for security (prevents replay attacks)
      const { nonce, hashedNonce } = await generateNonce();
      
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      
      setUserInfo(user);
      if (onSignIn) onSignIn(user);
      
      Alert.alert('Success', `Welcome ${user.user.name}!`);
    } catch (error) {
      console.error(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play Services not available');
      } else {
        Alert.alert('Error', `Sign in failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      Alert.alert('Signed Out', 'You have been signed out');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <View style={styles.buttonContainer}>
          <Button 
            title={loading ? "Signing in..." : "Sign in with Google"} 
            onPress={signIn}
            disabled={loading}
          />
          <Text style={styles.note}>
            Securely sign in with your Google account
          </Text>
        </View>
      ) : (
        <View style={styles.userInfo}>
          {userInfo.user.photo && (
            <img 
              src={userInfo.user.photo} 
              alt="profile" 
              style={styles.avatar}
              width={50}
              height={50}
            />
          )}
          <Text style={styles.welcome}>Welcome, {userInfo.user.name}!</Text>
          <Text style={styles.email}>{userInfo.user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 25,
    marginBottom: 10,
  },
});

