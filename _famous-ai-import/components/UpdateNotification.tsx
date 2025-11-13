import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface UpdateNotificationProps {
  message: string;
  onDismiss: () => void;
  visible: boolean;
}

export default function UpdateNotification({ message, onDismiss, visible }: UpdateNotificationProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔄</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>New Update Available</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#6b7280',
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#9ca3af',
  },
});
