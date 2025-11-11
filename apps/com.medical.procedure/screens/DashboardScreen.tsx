import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DashboardCard from '../components/DashboardCard';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <DashboardCard title="Total Procedures" value={42} />
      <DashboardCard title="Pending Approvals" value={7} />
      <DashboardCard title="Completed" value={35} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f2f5',
  },
});

export default DashboardScreen;
