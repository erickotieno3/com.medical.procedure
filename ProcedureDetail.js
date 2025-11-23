import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProcedureDetail() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header Image Placeholder (Blue Block for now) */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="medkit" size={60} color="white" />
      </View>

      {/* Back Button Overlay */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Appendectomy</Text>
          <View style={styles.metaRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>SURGERY</Text>
            </View>
            <Text style={styles.duration}>•  45 min procedure</Text>
          </View>
        </View>

        {/* Tools Needed Section */}
        <Text style={styles.sectionHeader}>Tools Needed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsRow}>
          <View style={styles.toolCard}><Text style={styles.toolText}>Scalpel</Text></View>
          <View style={styles.toolCard}><Text style={styles.toolText}>Forceps</Text></View>
          <View style={styles.toolCard}><Text style={styles.toolText}>Sutures</Text></View>
          <View style={styles.toolCard}><Text style={styles.toolText}>Anesthesia</Text></View>
        </ScrollView>

        {/* Steps Section */}
        <Text style={styles.sectionHeader}>Procedure Steps</Text>
        
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}><Text style={styles.stepNumText}>1</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Patient Preparation</Text>
            <Text style={styles.stepDesc}>Administer anesthesia and sterilize the abdomen area thoroughly.</Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}><Text style={styles.stepNumText}>2</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Incision</Text>
            <Text style={styles.stepDesc}>Make a small incision in the lower right abdomen.</Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}><Text style={styles.stepNumText}>3</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Removal</Text>
            <Text style={styles.stepDesc}>Locate the appendix, tie it off, and carefully remove it.</Text>
          </View>
        </View>

         <View style={{height: 50}} />
      </ScrollView>
      
      {/* Floating Action Button for Quick Notes */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create-outline" size={28} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  titleSection: { marginBottom: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  tag: { backgroundColor: '#E3F2FD', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { color: '#007BFF', fontWeight: 'bold', fontSize: 10 },
  duration: { color: '#888', marginLeft: 10 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#222' },
  toolsRow: { flexDirection: 'row', marginBottom: 25 },
  toolCard: {
    backgroundColor: '#F5F7FA', padding: 12, borderRadius: 10, marginRight: 10,
    borderWidth: 1, borderColor: '#EEE'
  },
  toolText: { color: '#555', fontWeight: '500' },
  stepItem: { flexDirection: 'row', marginBottom: 25 },
  stepNumber: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: '#007BFF',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  stepNumText: { color: '#fff', fontWeight: 'bold' },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  stepDesc: { fontSize: 14, color: '#666', lineHeight: 20 },
  fab: {
    position: 'absolute', bottom: 30, right: 30,
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#007BFF',
    justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000',
    shadowOffset: {width:0, height:4}, shadowOpacity:0.3, shadowRadius: 4
  }
});