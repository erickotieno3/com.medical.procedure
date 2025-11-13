import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { API_CONFIG, isSupabaseConfigured, isOpenAIConfigured } from '../config/apiConfig';

export default function SettingsScreen() {
  const [supabaseUrl, setSupabaseUrl] = useState(API_CONFIG.supabase.url);
  const [supabaseKey, setSupabaseKey] = useState(API_CONFIG.supabase.anonKey);
  const [openaiKey, setOpenaiKey] = useState(API_CONFIG.openai.apiKey);

  const handleSave = () => {
    Alert.alert(
      'Configuration Saved',
      'Please restart the app for changes to take effect. Update the config/apiConfig.ts file with your tokens.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>API Settings</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Configuration Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Supabase:</Text>
          <Text style={[styles.statusValue, isSupabaseConfigured() ? styles.active : styles.inactive]}>
            {isSupabaseConfigured() ? '✓ Configured' : '✗ Not Configured'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>OpenAI:</Text>
          <Text style={[styles.statusValue, isOpenAIConfigured() ? styles.active : styles.inactive]}>
            {isOpenAIConfigured() ? '✓ Configured' : '✗ Not Configured'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supabase Configuration</Text>
        <Text style={styles.label}>Project URL</Text>
        <TextInput
          style={styles.input}
          value={supabaseUrl}
          onChangeText={setSupabaseUrl}
          placeholder="https://your-project.supabase.co"
          placeholderTextColor="#999"
          editable={false}
        />
        <Text style={styles.label}>Anon Key</Text>
        <TextInput
          style={styles.input}
          value={supabaseKey}
          onChangeText={setSupabaseKey}
          placeholder="Your Supabase anon key"
          placeholderTextColor="#999"
          secureTextEntry
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OpenAI Configuration (Optional)</Text>
        <Text style={styles.label}>API Key</Text>
        <TextInput
          style={styles.input}
          value={openaiKey}
          onChangeText={setOpenaiKey}
          placeholder="sk-..."
          placeholderTextColor="#999"
          secureTextEntry
          editable={false}
        />
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>📝 How to Add Your Tokens:</Text>
        <Text style={styles.instructionsText}>
          1. Open config/apiConfig.ts in your code editor{'\n'}
          2. Add your Supabase URL and anon key{'\n'}
          3. (Optional) Add OpenAI API key for enhanced AI features{'\n'}
          4. Save the file and restart the app{'\n'}
          5. Return here to verify configuration status
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>View Instructions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#2563eb', padding: 20, paddingTop: 50 },
  backButton: { color: '#fff', fontSize: 16, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statusCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 12 },
  statusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statusLabel: { fontSize: 16, color: '#666' },
  statusValue: { fontSize: 16, fontWeight: '600' },
  active: { color: '#10b981' },
  inactive: { color: '#ef4444' },
  section: { backgroundColor: '#fff', margin: 20, marginTop: 0, padding: 20, borderRadius: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, fontSize: 14, color: '#999' },
  instructions: { backgroundColor: '#fef3c7', margin: 20, marginTop: 0, padding: 20, borderRadius: 12 },
  instructionsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  instructionsText: { fontSize: 14, lineHeight: 22, color: '#666' },
  button: { backgroundColor: '#2563eb', margin: 20, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
