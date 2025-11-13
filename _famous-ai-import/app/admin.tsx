import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { medicalSources } from '../services/autoUpdateService';

export default function AdminPanel() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [autoBlog, setAutoBlog] = useState(true);
  const [updateInterval, setUpdateInterval] = useState('1 hour');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [stats, setStats] = useState({
    totalProcedures: 82,
    blogPosts: 45,
    activeUsers: 1247,
    updatesSynced: 156,
  });

  const runManualUpdate = () => {
    setLastUpdate(new Date());
    setStats(prev => ({ ...prev, updatesSynced: prev.updatesSynced + 1 }));
  };

  const intervals = ['15 min', '30 min', '1 hour', '6 hours', '24 hours'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Autopilot & Self-Updating System</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalProcedures}</Text>
            <Text style={styles.statLabel}>Total Procedures</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.blogPosts}</Text>
            <Text style={styles.statLabel}>Blog Posts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.activeUsers}</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.updatesSynced}</Text>
            <Text style={styles.statLabel}>Updates Synced</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Automation Settings</Text>
          
          <View style={styles.setting}>
            <View>
              <Text style={styles.settingLabel}>Auto-Update Procedures</Text>
              <Text style={styles.settingDesc}>Sync from global hospitals</Text>
            </View>
            <Switch value={autoUpdate} onValueChange={setAutoUpdate} />
          </View>

          <View style={styles.setting}>
            <View>
              <Text style={styles.settingLabel}>Auto-Generate Blog Posts</Text>
              <Text style={styles.settingDesc}>AI-powered content creation</Text>
            </View>
            <Switch value={autoBlog} onValueChange={setAutoBlog} />
          </View>

          <TouchableOpacity style={styles.configCard} onPress={() => router.push('/settings')}>
            <Text style={styles.configIcon}>⚙️</Text>
            <View style={styles.configInfo}>
              <Text style={styles.configTitle}>API Configuration</Text>
              <Text style={styles.configDesc}>Manage Supabase and OpenAI tokens</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>


          <Text style={styles.sectionTitle}>Update Interval</Text>
          <View style={styles.intervalGrid}>
            {intervals.map(int => (
              <TouchableOpacity
                key={int}
                style={[styles.intervalBtn, updateInterval === int && styles.intervalActive]}
                onPress={() => setUpdateInterval(int)}
              >
                <Text style={[styles.intervalText, updateInterval === int && styles.intervalTextActive]}>{int}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sources ({medicalSources.length})</Text>
          {medicalSources.map(source => (
            <View key={source.name} style={styles.sourceCard}>
              <View style={styles.sourceStatus} />
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceName}>{source.name}</Text>
                <Text style={styles.sourceRegion}>{source.region}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.updateBtn} onPress={runManualUpdate}>
          <Text style={styles.updateBtnText}>🔄 Run Manual Update Now</Text>
        </TouchableOpacity>

        <Text style={styles.lastUpdate}>Last update: {lastUpdate.toLocaleString()}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#7c3aed', padding: 20, paddingTop: 60 },
  backBtn: { marginBottom: 10 },
  backText: { color: '#fff', fontSize: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#ddd6fe', marginTop: 5 },
  content: { flex: 1 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  statCard: { width: '48%', backgroundColor: '#fff', margin: '1%', padding: 20, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#7c3aed' },
  statLabel: { color: '#6b7280', marginTop: 5, fontSize: 12 },
  section: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 15, color: '#1f2937' },
  setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  settingLabel: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  settingDesc: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  configCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f9ff', padding: 15, borderRadius: 10, marginTop: 15 },
  configIcon: { fontSize: 24, marginRight: 12 },
  configInfo: { flex: 1 },
  configTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  configDesc: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  arrow: { fontSize: 20, color: '#2563eb' },
  intervalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  intervalBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, backgroundColor: '#f3f4f6', marginRight: 10, marginBottom: 10 },
  intervalActive: { backgroundColor: '#7c3aed' },
  intervalText: { color: '#6b7280', fontWeight: '600' },
  intervalTextActive: { color: '#fff' },
  sourceCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  sourceStatus: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981', marginRight: 12 },
  sourceInfo: { flex: 1 },
  sourceName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  sourceRegion: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  updateBtn: { backgroundColor: '#7c3aed', margin: 15, padding: 18, borderRadius: 12, alignItems: 'center' },
  updateBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  lastUpdate: { textAlign: 'center', color: '#6b7280', marginBottom: 30 },
});

