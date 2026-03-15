import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DisclaimerScreen() {
  const currentDate = 'March 15, 2026';
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Disclaimer</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Notice</Text>
        <Text style={styles.text}>
          The Medical-Surgical Procedure Guide app is designed for educational and informational purposes only. 
          It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Doctor-Patient Relationship</Text>
        <Text style={styles.text}>
          Use of this app does not create a doctor-patient relationship. Always seek the advice of your physician 
          or other qualified health provider with any questions you may have regarding a medical condition.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Situations</Text>
        <Text style={styles.text}>
          If you think you may have a medical emergency, call your doctor or emergency services immediately. 
          Do not rely on this app for emergency medical situations.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content Accuracy</Text>
        <Text style={styles.text}>
          While we strive to keep the information accurate and up-to-date, medical knowledge changes rapidly. 
          We make no representations or warranties of any kind about the completeness, accuracy, or reliability 
          of the information contained in this app.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Responsibility</Text>
        <Text style={styles.text}>
          You acknowledge that you are using this app at your own risk. You are responsible for verifying 
          any medical information before acting upon it.
        </Text>
      </View>
      
      <Text style={styles.lastUpdated}>Last Updated: {currentDate}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});
