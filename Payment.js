import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Payment = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Payment;
