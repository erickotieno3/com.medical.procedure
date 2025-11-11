/**
 * 🚀 Unified Medical UI/UX Starter
 * Single-file entry for Expo
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Helper function for logging
const useLogger = () => {
  const [logs, setLogs] = useState([]);

  const log = (msg) => {
    const timestamp = new Date().toLocaleString();
    const entry = `[${timestamp}] ${msg}`;
    setLogs((prev) => [...prev, entry]);
    console.log(entry);
  };

  return [logs, log];
};

export default function App() {
  const [logs, log] = useLogger();

  useEffect(() => {
    log('🚀 Starting Unified Medical App...');
    log('✅ Dependencies check skipped (managed by npm/yarn).');
    log('✅ Expo Dev Server ready.');
    // You can add more startup steps here
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unified Medical App Logs</Text>
      <ScrollView style={styles.logContainer}>
        {logs.map((entry, idx) => (
          <Text key={idx} style={styles.logText}>{entry}</Text>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  logText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Courier',
  },
});
