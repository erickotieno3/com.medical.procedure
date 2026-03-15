import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WatchAdScreen        from '../app/screens/WatchAdScreen';
import DisclaimerScreen     from '../app/screens/DisclaimerScreen';
import AffiliateScreen      from '../app/screens/AffiliateScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:     false,
        tabBarActiveTintColor:   '#2c3e50',
        tabBarInactiveTintColor: '#95a5a6',
      }}
    >
      <Tab.Screen
        name="Home"
        component={DisclaimerScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Affiliate"
        component={AffiliateScreen}
        options={{ tabBarLabel: 'Shop' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdGate"  component={WatchAdScreen} />
      <Stack.Screen name="Main"    component={MainTabs} />
      <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
    </Stack.Navigator>
  );
}
