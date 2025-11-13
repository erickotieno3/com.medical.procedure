import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type Props = {
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  specialties: string[];
};

export default function FilterBar({ selectedSpecialty, onSelectSpecialty, specialties }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Specialty</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <TouchableOpacity 
          style={[styles.chip, selectedSpecialty === 'All' && styles.chipActive]} 
          onPress={() => onSelectSpecialty('All')}
        >
          <Text style={[styles.chipText, selectedSpecialty === 'All' && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {specialties.map(specialty => (
          <TouchableOpacity 
            key={specialty} 
            style={[styles.chip, selectedSpecialty === specialty && styles.chipActive]} 
            onPress={() => onSelectSpecialty(specialty)}
          >
            <Text style={[styles.chipText, selectedSpecialty === specialty && styles.chipTextActive]}>{specialty}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#E0E0E0' },
  title: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  scroll: { flexDirection: 'row' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0', marginRight: 8 },
  chipActive: { backgroundColor: '#0A4D8C' },
  chipText: { fontSize: 14, color: '#666' },
  chipTextActive: { color: '#FFF', fontWeight: '600' },
});
