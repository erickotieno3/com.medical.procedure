import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNetwork } from '../context/NetworkContext';

export default function NetworkStatus() {
  const { isConnected, type, isInternetReachable } = useNetwork();
  const slideAnim = useRef(new Animated.Value(-60)).current;
  const isOffline  = !isConnected || isInternetReachable === false;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue:         isOffline ? 0 : -60,
      duration:        300,
      useNativeDriver: true,
    }).start();
  }, [isOffline]);

  return (
    <Animated.View
      style={[
        styles.banner,
        isOffline ? styles.offline : styles.online,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.dot} />
      <Text style={styles.text}>
        {isOffline
          ? `No internet connection (${type})`
          : `Back online (${type})`}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position:       'absolute',
    top:            0,
    left:           0,
    right:          0,
    zIndex:         9999,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  offline: { backgroundColor: '#e74c3c' },
  online:  { backgroundColor: '#27ae60' },
  dot: {
    width:        8,
    height:       8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight:  8,
  },
  text: {
    color:      '#fff',
    fontSize:   13,
    fontWeight: '600',
  },
});
