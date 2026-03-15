// app/screens/RevisionHomeScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { PROCEDURES, CATEGORIES } from '../../data/procedures';

export default function RevisionHomeScreen({ navigation }) {
  const { progress, bookmarks, getStats } = useRevision();
  const [search, setSearch]               = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const stats = getStats();

  const filtered = PROCEDURES.filter(p => {
    const matchSearch   = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const getDifficultyColor = (d) =>
    ({ beginner: '#27ae60', intermediate: '#f39c12', advanced: '#e74c3c' }[d] || '#95a5a6');

  const getProgressPercent = (id) => {
    const p = progress[id];
    if (!p) return 0;
    const proc = PROCEDURES.find(pr => pr.id === id);
    if (!proc) return 0;
    return Math.round(((p.completedSteps?.length || 0) / proc.steps.length) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Stats bar */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{stats.totalRevisions}</Text>
          <Text style={styles.statLabel}>Revisions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{stats.completionPercent}%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{stats.averageScore}%</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{stats.bookmarkCount}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search procedures..."
        placeholderTextColor="#95a5a6"
        value={search}
        onChangeText={setSearch}
      />

      {/* Category filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {['All', ...CATEGORIES].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Procedure list */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map(proc => {
          const pct        = getProgressPercent(proc.id);
          const isBookmarked = bookmarks.includes(proc.id);
          const timesRevised = progress[proc.id]?.timesRevised || 0;
          return (
            <TouchableOpacity
              key={proc.id}
              style={styles.card}
              onPress={() => navigation.navigate('RevisionDetail', { procedureId: proc.id })}
            >
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardCategory}>{proc.category}</Text>
                  <Text style={styles.cardTitle}>{proc.title}</Text>
                </View>
                <View style={styles.cardRight}>
                  {isBookmarked && <Text style={styles.bookmark}>★</Text>}
                  <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(proc.difficulty) }]}>
                    <Text style={styles.diffText}>{proc.difficulty}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: pct + '%' }]} />
                </View>
                <Text style={styles.progressText}>{pct}%</Text>
              </View>
              <Text style={styles.cardMeta}>
                {proc.steps.length} steps
                {timesRevised > 0 ? `  •  Revised ${timesRevised}x` : '  •  Not yet revised'}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f5f6fa' },
  statsRow:       { flexDirection: 'row', backgroundColor: '#2c3e50', padding: 16 },
  statBox:        { flex: 1, alignItems: 'center' },
  statNum:        { fontSize: 22, fontWeight: '700', color: '#fff' },
  statLabel:      { fontSize: 11, color: '#bdc3c7', marginTop: 2 },
  search:         { margin: 12, padding: 12, backgroundColor: '#fff', borderRadius: 10, fontSize: 15, color: '#2c3e50' },
  categories:     { paddingLeft: 12, marginBottom: 8, maxHeight: 44 },
  catChip:        { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ecf0f1', marginRight: 8 },
  catChipActive:  { backgroundColor: '#2c3e50' },
  catText:        { fontSize: 13, color: '#7f8c8d' },
  catTextActive:  { color: '#fff', fontWeight: '600' },
  list:           { flex: 1, paddingHorizontal: 12 },
  card:           { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  cardTop:        { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  cardCategory:   { fontSize: 11, color: '#3498db', fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  cardTitle:      { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  cardRight:      { alignItems: 'flex-end', gap: 6 },
  bookmark:       { fontSize: 18, color: '#f39c12' },
  diffBadge:      { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  diffText:       { fontSize: 11, color: '#fff', fontWeight: '600' },
  progressRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  progressBar:    { flex: 1, height: 6, backgroundColor: '#ecf0f1', borderRadius: 3, marginRight: 8 },
  progressFill:   { height: 6, backgroundColor: '#27ae60', borderRadius: 3 },
  progressText:   { fontSize: 12, color: '#7f8c8d', width: 35 },
  cardMeta:       { fontSize: 12, color: '#95a5a6' },
});
