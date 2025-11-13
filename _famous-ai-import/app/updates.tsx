import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface Update {
  id: string;
  title: string;
  source: string;
  date: Date;
  type: 'procedure' | 'guideline' | 'blog';
}

export default function UpdatesScreen() {
  const [updates] = useState<Update[]>([
    { id: '1', title: 'New Laparoscopic Cholecystectomy Protocol', source: 'Johns Hopkins', date: new Date(), type: 'procedure' },
    { id: '2', title: 'Updated Wound Care Guidelines', source: 'NHS UK', date: new Date(), type: 'guideline' },
    { id: '3', title: 'Understanding Minimally Invasive Surgery', source: 'Auto Blog', date: new Date(), type: 'blog' },
    { id: '4', title: 'Arthroscopy Best Practices 2025', source: 'Mayo Clinic', date: new Date(), type: 'procedure' },
    { id: '5', title: 'Dermatology Procedure Updates', source: 'Health Canada', date: new Date(), type: 'guideline' },
  ]);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'procedure': return '#2563eb';
      case 'guideline': return '#10b981';
      case 'blog': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Latest Updates</Text>
        <Text style={styles.subtitle}>Auto-synced from global sources</Text>
      </View>

      <ScrollView style={styles.content}>
        {updates.map(update => (
          <TouchableOpacity key={update.id} style={styles.card}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(update.type) }]}>
              <Text style={styles.typeText}>{update.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.cardTitle}>{update.title}</Text>
            <View style={styles.meta}>
              <Text style={styles.source}>📍 {update.source}</Text>
              <Text style={styles.date}>{update.date.toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#1f2937', padding: 20, paddingTop: 60 },
  backText: { color: '#fff', fontSize: 16, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#9ca3af', marginTop: 5 },
  content: { flex: 1, padding: 15 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  typeBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 10 },
  typeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 10 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  source: { color: '#6b7280', fontSize: 12 },
  date: { color: '#9ca3af', fontSize: 12 },
});
