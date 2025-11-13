import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  id: string;
  name: string;
  specialty: string;
  duration: string;
  hospital: string;
  complexity: string;
};

export default function ProcedureCard({ id, name, specialty, duration, hospital, complexity }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/procedure/${id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.badge, complexity === 'Simple' ? styles.simple : styles.moderate]}>
          <Text style={styles.badgeText}>{complexity}</Text>
        </View>
      </View>
      <Text style={styles.specialty}>{specialty}</Text>
      <View style={styles.details}>
        <Text style={styles.detail}>⏱ {duration}</Text>
        <Text style={styles.detail}>🏥 {hospital}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', flex: 1, marginRight: 8 },
  specialty: { fontSize: 14, color: '#0A4D8C', fontWeight: '600', marginBottom: 8 },
  details: { flexDirection: 'row', gap: 12 },
  detail: { fontSize: 12, color: '#666' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  simple: { backgroundColor: '#E8F5E9' },
  moderate: { backgroundColor: '#FFF3E0' },
  badgeText: { fontSize: 11, fontWeight: '600' },
});
