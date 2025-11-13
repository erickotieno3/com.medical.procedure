import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSavedProcedures } from '../contexts/SavedProceduresContext';
import ProcedureCard from '../components/ProcedureCard';
import { PROCEDURES } from '../data/proceduresData';

export default function SavedProcedures() {
  const router = useRouter();
  const { savedProcedures } = useSavedProcedures();

  const saved = PROCEDURES.filter(p => savedProcedures.includes(p.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Saved Procedures</Text>
      </View>

      <ScrollView style={styles.content}>
        {saved.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📌</Text>
            <Text style={styles.emptyText}>No saved procedures yet</Text>
            <Text style={styles.emptySubtext}>Save procedures for quick access</Text>
          </View>
        ) : (
          <>
            <Text style={styles.count}>{saved.length} saved procedure{saved.length !== 1 ? 's' : ''}</Text>
            {saved.map(proc => (
              <ProcedureCard key={proc.id} {...proc} />
            ))}
          </>
        )}
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
  count: { fontSize: 14, color: '#666', marginBottom: 12, fontWeight: '600' },
  empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  emptySubtext: { fontSize: 16, color: '#666' },
});
