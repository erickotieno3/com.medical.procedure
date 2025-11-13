import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import PasswordGate from '../components/PasswordGate';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    if (!loading && user && hasAccess) {
      router.replace('/home');
    }
  }, [user, loading, hasAccess]);

  const checkAccess = async () => {
    const access = await AsyncStorage.getItem('testing_access');
    setHasAccess(access === 'granted');
    setCheckingAccess(false);
  };

  const handleAccessGranted = async () => {
    await AsyncStorage.setItem('testing_access', 'granted');
    setHasAccess(true);
  };

  if (checkingAccess || loading) {
    return <View style={styles.container} />;
  }

  if (!hasAccess) {
    return <PasswordGate onSuccess={handleAccessGranted} />;
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68e2a7143631ac7b294a62f0_1759685183353_714045e5.png' }} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>HyriseCrown Medical</Text>
      <Text style={styles.subtitle}>Evidence-Based Procedures for Healthcare Professionals</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={styles.link}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A4D8C', justifyContent: 'center', alignItems: 'center', padding: 24 },
  logo: { width: 200, height: 100, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#E8F1F8', textAlign: 'center', marginBottom: 32 },
  btn: { backgroundColor: '#FFF', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, marginBottom: 16 },
  btnText: { fontSize: 16, fontWeight: '700', color: '#0A4D8C' },
  link: { fontSize: 14, color: '#E8F1F8', textDecorationLine: 'underline' },
});
