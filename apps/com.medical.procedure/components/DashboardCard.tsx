import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  value: string | number;
};

const DashboardCard: React.FC<Props> = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DashboardCard;
