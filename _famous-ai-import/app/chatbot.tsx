import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ChatBot from '../components/ChatBot';

export default function ChatBotScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AI Assistant</Text>
      </View>
      <ChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#E0E0E0' },
  back: { fontSize: 16, color: '#0A4D8C', marginRight: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
});
