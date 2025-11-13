import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Resources() {
  const router = useRouter();

  const resources = [
    { id: '1', title: 'WHO Surgical Safety Checklist', category: 'Guidelines', hospital: 'WHO' },
    { id: '2', title: 'Infection Control Protocols', category: 'Safety', hospital: 'CDC' },
    { id: '3', title: 'Emergency Procedures Manual', category: 'Emergency', hospital: 'Johns Hopkins' },
    { id: '4', title: 'Anesthesia Guidelines', category: 'Anesthesia', hospital: 'ASA' },
    { id: '5', title: 'Sterile Technique Standards', category: 'Safety', hospital: 'NHS UK' },
    { id: '6', title: 'Post-Op Care Protocols', category: 'Recovery', hospital: 'Mayo Clinic' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Resources</Text>
      </View>

      <ScrollView style={styles.content}>
        {resources.map(resource => (
          <TouchableOpacity key={resource.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{resource.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{resource.category}</Text>
              </View>
            </View>
            <Text style={styles.hospital}>Source: {resource.hospital}</Text>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadText}>📥 Download PDF</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF' },
  back: { fontSize: 16, color: '#0A4D8C', marginRight: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', flex: 1, marginRight: 8 },
  badge: { backgroundColor: '#E8F1F8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#0A4D8C' },
  hospital: { fontSize: 14, color: '#666', marginBottom: 12 },
  downloadBtn: { backgroundColor: '#0A4D8C', padding: 10, borderRadius: 8, alignItems: 'center' },
  downloadText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
});
