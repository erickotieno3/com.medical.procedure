// app/screens/RevisionResultScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { getProcedureById, PROCEDURES } from '../../data/procedures';

export default function RevisionResultScreen({ route, navigation }) {
  const { procedureId, score }   = route.params;
  const procedure                = getProcedureById(procedureId);
  const { progress, getStats }   = useRevision();
  const stats                    = getStats();
  const timesRevised             = progress[procedureId]?.timesRevised || 0;

  const getScoreColor = (s) => s >= 80 ? '#27ae60' : s >= 50 ? '#f39c12' : '#e74c3c';
  const getMessage    = (s) =>
    s === 100 ? 'Perfect! All steps completed.' :
    s >= 80   ? 'Great work! Almost there.' :
    s >= 50   ? 'Good effort. Keep practising.' :
                'Keep going - revision makes perfect.';

  // Suggest next procedure
  const unrevised = PROCEDURES.filter(
    p => p.id !== procedureId && !(progress[p.id]?.timesRevised > 0)
  );
  const nextSuggestion = unrevised[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Score circle */}
      <View style={[styles.scoreCircle, { borderColor: getScoreColor(score) }]}>
        <Text style={[styles.scoreNum, { color: getScoreColor(score) }]}>{score}%</Text>
        <Text style={styles.scoreLabel}>Score</Text>
      </View>

      <Text style={styles.message}>{getMessage(score)}</Text>
      <Text style={styles.procedureTitle}>{procedure?.title}</Text>
      <Text style={styles.meta}>Revised {timesRevised} time{timesRevised !== 1 ? 's' : ''}</Text>

      {/* Overall stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Your Progress</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.totalRevisions}</Text>
            <Text style={styles.statLbl}>Total revisions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.completionPercent}%</Text>
            <Text style={styles.statLbl}>Procedures done</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.averageScore}%</Text>
            <Text style={styles.statLbl}>Average score</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => navigation.navigate('RevisionDetail', { procedureId })}
      >
        <Text style={styles.btnPrimaryText}>Revise Again</Text>
      </TouchableOpacity>

      {nextSuggestion && (
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('RevisionDetail', { procedureId: nextSuggestion.id })}
        >
          <Text style={styles.btnSecondaryText}>Next: {nextSuggestion.title}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btnOutline}
        onPress={() => navigation.navigate('RevisionHome')}
      >
        <Text style={styles.btnOutlineText}>Back to All Procedures</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f5f6fa' },
  content:        { alignItems: 'center', padding: 24, paddingTop: 60 },
  scoreCircle:    { width: 140, height: 140, borderRadius: 70, borderWidth: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  scoreNum:       { fontSize: 40, fontWeight: '700' },
  scoreLabel:     { fontSize: 14, color: '#7f8c8d' },
  message:        { fontSize: 18, fontWeight: '600', color: '#2c3e50', textAlign: 'center', marginBottom: 8 },
  procedureTitle: { fontSize: 15, color: '#7f8c8d', textAlign: 'center', marginBottom: 4 },
  meta:           { fontSize: 13, color: '#95a5a6', marginBottom: 24 },
  statsCard:      { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%', marginBottom: 24, elevation: 2 },
  statsTitle:     { fontSize: 16, fontWeight: '600', color: '#2c3e50', marginBottom: 16, textAlign: 'center' },
  statsRow:       { flexDirection: 'row', justifyContent: 'space-around' },
  statItem:       { alignItems: 'center' },
  statNum:        { fontSize: 24, fontWeight: '700', color: '#2c3e50' },
  statLbl:        { fontSize: 12, color: '#95a5a6', marginTop: 4, textAlign: 'center' },
  btnPrimary:     { backgroundColor: '#27ae60', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 12 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSecondary:   { backgroundColor: '#3498db', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 12 },
  btnSecondaryText:{ color: '#fff', fontWeight: '600', fontSize: 15 },
  btnOutline:     { padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#bdc3c7' },
  btnOutlineText: { color: '#7f8c8d', fontSize: 15 },
});
