import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SPECIALTIES } from '../constants/procedures';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/StatsCard';
import UpdateNotification from '../components/UpdateNotification';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowUpdate(true), 3000);
    return () => clearTimeout(timer);
  }, []);

   return (
    <>
      <UpdateNotification 
        visible={showUpdate} 
        message="5 new procedures synced from Johns Hopkins" 
        onDismiss={() => setShowUpdate(false)} 
      />
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}</Text>
          <Text style={styles.role}>{user?.role || 'Healthcare Professional'}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'G')[0].toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68e2aa50c3cd3f6e9b19642f_1759685280204_040cdc06.webp' }} style={styles.hero} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Statistics</Text>
        <StatsCard title="Total Procedures" value="80+" icon="📚" color="#0A4D8C" />
        <StatsCard title="Specialties Covered" value="8" icon="🏥" color="#2C5F8D" />
        <StatsCard title="Hospital Sources" value="7" icon="🌍" color="#4A90E2" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/procedures')}>
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>Browse Procedures</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/chatbot')}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>AI Assistant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/blog')}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionText}>Auto Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/admin')}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Admin Panel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/updates')}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Latest Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/resources')}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Resources</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/saved')}>
            <Text style={styles.actionIcon}>❤️</Text>
            <Text style={styles.actionText}>Saved Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/profile')}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>My Profile</Text>
          </TouchableOpacity>
        </View>


      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.grid}>
          {SPECIALTIES.map(specialty => (
            <TouchableOpacity key={specialty.id} style={styles.specialtyCard} onPress={() => router.push('/procedures')}>
              <Image source={{ uri: specialty.icon }} style={styles.specialtyIcon} />
              <Text style={styles.specialtyName}>{specialty.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50 },
  greeting: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  role: { fontSize: 14, color: '#666', marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0A4D8C', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  hero: { width: '100%', height: 200, marginBottom: 20 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  actionCard: { flex: 1, backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  actionIcon: { fontSize: 32, marginBottom: 8 },
  actionText: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  specialtyCard: { width: '31%', backgroundColor: '#FFF', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  specialtyIcon: { width: 48, height: 48, marginBottom: 8 },
  specialtyName: { fontSize: 12, fontWeight: '600', color: '#1A1A1A', textAlign: 'center' },
});
