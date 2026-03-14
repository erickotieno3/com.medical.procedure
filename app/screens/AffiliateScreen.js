import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEDISAVE_AFFILIATE_ID = 'YOUR_AFFILIATE_ID'; // Get this from Medisave

export default function AffiliateScreen() {
  const trackClick = async (productId) => {
    try {
      // Store click in AsyncStorage for attribution
      await AsyncStorage.setItem('last_affiliate_click', Date.now().toString());
      
      // Open Medisave with affiliate link
      const affiliateUrl = `https://www.medisave.co.uk/?affiliate_id=${MEDISAVE_AFFILIATE_ID}&product=${productId}`;
      Linking.openURL(affiliateUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const products = [
    { id: 'stethoscope', name: 'Stethoscope', price: '£99.99' },
    { id: 'bp-monitor', name: 'Blood Pressure Monitor', price: '£49.99' },
    { id: 'thermometer', name: 'Digital Thermometer', price: '£19.99' },
  ];

  return (
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Medical Supplies from Medisave UK
      </Text>
      <Text style={{ textAlign: 'center', margin: 10 }}>
        5% Commission on all purchases! 90-day cookie tracking.
      </Text>
      
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => trackClick(product.id)}
          style={{
            backgroundColor: '#f0f0f0',
            padding: 20,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>{product.name}</Text>
          <Text style={{ color: 'green' }}>{product.price}</Text>
          <Text style={{ color: 'blue', marginTop: 5 }}>Tap to buy →</Text>
        </TouchableOpacity>
      ))}
      
      <Text style={{ fontSize: 12, color: 'gray', textAlign: 'center', margin: 20 }}>
        Commissions paid monthly via PayPal. Min. £50 payout.
      </Text>
    </ScrollView>
  );
}
