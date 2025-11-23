import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Welcome, Doctor</Text>
          <Text style={styles.headerTitle}>Medical Procedures</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
           <Ionicons name="person-circle-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput placeholder="Search procedures..." style={styles.searchInput} placeholderTextColor="#999"/>
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          <CategoryItem icon="bandage" title="First Aid" color="#FF6B6B" />
          <CategoryItem icon="cut" title="Surgery" color="#4ECDC4" />
          <CategoryItem icon="medkit" title="Pharmacy" color="#1A535C" />
          <CategoryItem icon="thermometer" title="Diagnosis" color="#FFE66D" />
        </View>

        {/* RECENT GUIDES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Guides</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>

        {/* CARDS - CLICKABLE NOW */}
        <ProcedureCard 
          title="Appendectomy" 
          subtitle="Surgical removal of appendix" 
          time="15 min read" 
          tag="Surgery"
          onPress={() => navigation.navigate('Detail')} 
        />
        <ProcedureCard 
          title="CPR Standard" 
          subtitle="Emergency life support" 
          time="5 min read" 
          tag="First Aid"
          onPress={() => navigation.navigate('Detail')}
        />
         <View style={{height: 40}} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

// --- COMPONENTS ---
const CategoryItem = ({ icon, title, color }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const ProcedureCard = ({ title, subtitle, time, tag, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <View>
        <View style={styles.tagContainer}><Text style={styles.tagText}>{tag}</Text></View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={24} color="#ccc" />
  </TouchableOpacity>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { backgroundColor: '#007BFF', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerGreeting: { color: '#B3D7FF', fontSize: 14, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, padding: 5 },
  scrollContent: { padding: 20 },
  searchContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: -40, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 25 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  categoryGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  categoryItem: { alignItems: 'center', width: '22%' },
  iconContainer: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  categoryTitle: { fontSize: 12, color: '#555', fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAllText: { color: '#007BFF', fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardContent: { flex: 1 },
  tagContainer: { backgroundColor: '#E3F2FD', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  tagText: { color: '#007BFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#888', marginBottom: 8 },
  timeContainer: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 12, color: '#666', marginLeft: 4 },
});