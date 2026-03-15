// app/screens/RevisionDetailScreen.js
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated,
} from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { getProcedureById } from '../../data/procedures';

export default function RevisionDetailScreen({ route, navigation }) {
  const { procedureId }                    = route.params;
  const procedure                          = getProcedureById(procedureId);
  const { progress, markStepComplete, markProcedureRevised, toggleBookmark, bookmarks } = useRevision();
  const [activeTab, setActiveTab]          = useState('steps');
  const [showMnemonic, setShowMnemonic]    = useState(false);
  const flipAnim                           = useRef(new Animated.Value(0)).current;

  if (!procedure) return null;

  const procProgress  = progress[procedureId] || {};
  const completedSteps = procProgress.completedSteps || [];
  const isBookmarked  = bookmarks.includes(procedureId);
  const allDone       = completedSteps.length === procedure.steps.length;
  const score         = Math.round((completedSteps.length / procedure.steps.length) * 100);

  const handleStepPress = (index) => {
    markStepComplete(procedureId, index);
  };

  const handleFinish = () => {
    markProcedureRevised(procedureId, score);
    navigation.navigate('RevisionResult', { procedureId, score });
  };

  const toggleMnemonic = () => {
    Animated.timing(flipAnim, {
      toValue:         showMnemonic ? 0 : 1,
      duration:        300,
      useNativeDriver: true,
    }).start();
    setShowMnemonic(!showMnemonic);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark(procedureId)}>
          <Text style={styles.bookmarkBtn}>{isBookmarked ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.category}>{procedure.category}</Text>
        <Text style={styles.title}>{procedure.title}</Text>
        <Text style={styles.progress}>
          {completedSteps.length}/{procedure.steps.length} steps completed
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['steps', 'key points', 'mnemonic'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Steps tab */}
        {activeTab === 'steps' && procedure.steps.map((step, i) => {
          const done = completedSteps.includes(i);
          return (
            <TouchableOpacity
              key={i}
              style={[styles.stepCard, done && styles.stepDone]}
              onPress={() => handleStepPress(i)}
            >
              <View style={[styles.stepNum, done && styles.stepNumDone]}>
                <Text style={styles.stepNumText}>{done ? '✓' : i + 1}</Text>
              </View>
              <Text style={[styles.stepText, done && styles.stepTextDone]}>
                {step}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Key points tab */}
        {activeTab === 'key points' && procedure.keyPoints.map((point, i) => (
          <View key={i} style={styles.keyCard}>
            <View style={styles.keyDot} />
            <Text style={styles.keyText}>{point}</Text>
          </View>
        ))}

        {/* Mnemonic tab */}
        {activeTab === 'mnemonic' && (
          <TouchableOpacity style={styles.mnemonicCard} onPress={toggleMnemonic}>
            <Text style={styles.mnemonicLabel}>
              {showMnemonic ? 'Tap to hide' : 'Tap to reveal mnemonic'}
            </Text>
            {showMnemonic && (
              <Text style={styles.mnemonicText}>{procedure.mnemonics}</Text>
            )}
          </TouchableOpacity>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Finish button */}
      {activeTab === 'steps' && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.finishBtn, !allDone && styles.finishBtnDisabled]}
            onPress={handleFinish}
            disabled={!allDone}
          >
            <Text style={styles.finishText}>
              {allDone ? 'Complete Revision' : `Complete all ${procedure.steps.length} steps first`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#f5f6fa' },
  header:           { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingTop: 50, backgroundColor: '#2c3e50' },
  backBtn:          { padding: 4 },
  backText:         { color: '#fff', fontSize: 16 },
  bookmarkBtn:      { fontSize: 24, color: '#f39c12' },
  titleBlock:       { backgroundColor: '#2c3e50', paddingHorizontal: 16, paddingBottom: 20 },
  category:         { fontSize: 12, color: '#3498db', fontWeight: '600', textTransform: 'uppercase' },
  title:            { fontSize: 20, fontWeight: '700', color: '#fff', marginVertical: 4 },
  progress:         { fontSize: 13, color: '#bdc3c7' },
  tabs:             { flexDirection: 'row', backgroundColor: '#fff', elevation: 2 },
  tab:              { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive:        { borderBottomWidth: 2, borderBottomColor: '#3498db' },
  tabText:          { fontSize: 14, color: '#95a5a6' },
  tabTextActive:    { color: '#3498db', fontWeight: '600' },
  content:          { flex: 1, padding: 12 },
  stepCard:         { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8, alignItems: 'flex-start', elevation: 1 },
  stepDone:         { backgroundColor: '#eafaf1', borderLeftWidth: 3, borderLeftColor: '#27ae60' },
  stepNum:          { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ecf0f1', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepNumDone:      { backgroundColor: '#27ae60' },
  stepNumText:      { fontSize: 13, fontWeight: '700', color: '#2c3e50' },
  stepText:         { flex: 1, fontSize: 14, color: '#2c3e50', lineHeight: 20 },
  stepTextDone:     { color: '#7f8c8d', textDecorationLine: 'line-through' },
  keyCard:          { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8, alignItems: 'flex-start', elevation: 1 },
  keyDot:           { width: 8, height: 8, borderRadius: 4, backgroundColor: '#e74c3c', marginRight: 12, marginTop: 6 },
  keyText:          { flex: 1, fontSize: 14, color: '#2c3e50', lineHeight: 22 },
  mnemonicCard:     { backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', elevation: 2, marginTop: 20 },
  mnemonicLabel:    { fontSize: 14, color: '#3498db', marginBottom: 16 },
  mnemonicText:     { fontSize: 16, color: '#2c3e50', fontWeight: '600', textAlign: 'center', lineHeight: 26 },
  footer:           { padding: 16, backgroundColor: '#fff', elevation: 8 },
  finishBtn:        { backgroundColor: '#27ae60', padding: 16, borderRadius: 12, alignItems: 'center' },
  finishBtnDisabled:{ backgroundColor: '#bdc3c7' },
  finishText:       { color: '#fff', fontWeight: '700', fontSize: 16 },
});
