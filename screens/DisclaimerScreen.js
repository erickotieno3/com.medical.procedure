import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

export default function DisclaimerScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Disclaimer</Text>

      <Text style={styles.text}>
      This application is intended for educational and informational purposes only.
      The information provided does not constitute medical advice, diagnosis, or treatment.
      </Text>

      <Text style={styles.text}>
      Always seek the advice of a qualified healthcare professional regarding any
      medical procedure or condition.
      </Text>

      <Text style={styles.text}>
      The developers of this application assume no responsibility for any medical
      decisions made using this information.
      </Text>

      <Button title="I Understand" onPress={() => navigation.replace("Home")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{padding:20},
  title:{fontSize:24,fontWeight:"bold",marginBottom:20},
  text:{fontSize:16,marginBottom:15}
});