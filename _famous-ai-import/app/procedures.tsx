import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProcedureCard from '../components/ProcedureCard';
import FilterBar from '../components/FilterBar';
import { PROCEDURES } from '../data/proceduresData';
import { SPECIALTIES } from '../constants/procedures';

export default function Procedures() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const router = useRouter();

  const filtered = PROCEDURES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || p.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Procedures</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.search} 
          placeholder="Search procedures..." 
          value={search} 
          onChangeText={setSearch}
        />
      </View>

      <FilterBar 
        selectedSpecialty={selectedSpecialty} 
        onSelectSpecialty={setSelectedSpecialty}
        specialties={SPECIALTIES.map(s => s.name)}
      />

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Text style={styles.count}>{filtered.length} procedures found</Text>
        {filtered.map(proc => (
          <ProcedureCard key={proc.id} {...proc} />
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
  searchContainer: { padding: 16, backgroundColor: '#FFF' },
  search: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#F8FAFB' },
  list: { flex: 1 },
  listContent: { padding: 16 },
  count: { fontSize: 14, color: '#666', marginBottom: 12, fontWeight: '600' },
});
