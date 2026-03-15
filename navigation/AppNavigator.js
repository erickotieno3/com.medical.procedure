import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WatchAdScreen         from '../app/screens/WatchAdScreen';
import DisclaimerScreen      from '../app/screens/DisclaimerScreen';
import AffiliateScreen       from '../app/screens/AffiliateScreen';
import RevisionHomeScreen    from '../app/screens/RevisionHomeScreen';
import RevisionDetailScreen  from '../app/screens/RevisionDetailScreen';
import RevisionResultScreen  from '../app/screens/RevisionResultScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:           false,
        tabBarActiveTintColor:   '#2c3e50',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle:             { paddingBottom: 6, height: 60 },
      }}
    >
      <Tab.Screen name="Revise"     component={RevisionHomeScreen} options={{ tabBarLabel: 'Revise' }} />
      <Tab.Screen name="Shop"       component={AffiliateScreen}    options={{ tabBarLabel: 'Shop' }} />
      <Tab.Screen name="Disclaimer" component={DisclaimerScreen}   options={{ tabBarLabel: 'About' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdGate"         component={WatchAdScreen} />
      <Stack.Screen name="Main"           component={MainTabs} />
      <Stack.Screen name="RevisionHome"   component={RevisionHomeScreen} />
      <Stack.Screen name="RevisionDetail" component={RevisionDetailScreen} />
      <Stack.Screen name="RevisionResult" component={RevisionResultScreen} />
    </Stack.Navigator>
  );
}
