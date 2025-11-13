import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PROCEDURES } from '../../data/proceduresData';
import { useSavedProcedures } from '../../contexts/SavedProceduresContext';

export default function ProcedureDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { toggleSaved, isSaved } = useSavedProcedures();
  
  const procedure = PROCEDURES.find(p => p.id === id);
  
  if (!procedure) return null;

  const saved = isSaved(id as string);

  const steps = [
    'Patient preparation and positioning',
    'Administer appropriate anesthesia',
    'Sterilize the surgical area',
    'Perform the procedure following protocol',
    'Monitor vital signs throughout',
    'Complete post-procedure care',
  ];

  const equipment = ['Sterile gloves', 'Surgical drapes', 'Scalpel', 'Sutures', 'Antiseptic solution', 'Gauze pads'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSaved(id as string)}>
          <Text style={styles.save}>{saved ? '❤️' : '🤍'} {saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{procedure.name}</Text>
        <Text style={styles.specialty}>{procedure.specialty}</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{procedure.duration}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Complexity</Text>
            <Text style={styles.infoValue}>{procedure.complexity}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Anesthesia</Text>
            <Text style={styles.infoValue}>{procedure.anesthesia}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step-by-Step Protocol</Text>
          {steps.map((step, i) => (
            <View key={i} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Equipment</Text>
          {equipment.map((item, i) => (
            <Text key={i} style={styles.equipmentItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.sourceCard}>
          <Text style={styles.sourceLabel}>Protocol Source</Text>
          <Text style={styles.sourceValue}>{procedure.hospital}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF' },
  back: { fontSize: 16, color: '#0A4D8C' },
  save: { fontSize: 16, color: '#0A4D8C', fontWeight: '600' },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  specialty: { fontSize: 16, color: '#0A4D8C', fontWeight: '600', marginBottom: 20 },
  infoGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  infoCard: { flex: 1, backgroundColor: '#FFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  infoLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
  step: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#0A4D8C', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumberText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  stepText: { flex: 1, fontSize: 15, color: '#333', lineHeight: 22 },
  equipmentItem: { fontSize: 15, color: '#333', marginBottom: 8 },
  sourceCard: { backgroundColor: '#E8F1F8', padding: 16, borderRadius: 12, marginTop: 8 },
  sourceLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  sourceValue: { fontSize: 16, fontWeight: '700', color: '#0A4D8C' },
});
