import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkContext = createContext();

export const useNetwork = () => {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error('useNetwork must be used within NetworkProvider');
  return ctx;
};

export const NetworkProvider = ({ children }) => {
  const [networkState, setNetworkState] = useState({
    isConnected:         true,
    type:                'unknown',
    isInternetReachable: true,
    isPoorConnection:    false,
  });

  const refresh = useCallback(async () => {
    const state = await NetInfo.fetch();
    setNetworkState({
      isConnected:         state.isConnected,
      type:                state.type,
      isInternetReachable: state.isInternetReachable,
      isPoorConnection:    state.details?.isConnectionExpensive || false,
    });
  }, []);

  useEffect(() => {
    refresh();
    const unsub = NetInfo.addEventListener(state => {
      setNetworkState({
        isConnected:         state.isConnected,
        type:                state.type,
        isInternetReachable: state.isInternetReachable,
        isPoorConnection:    state.details?.isConnectionExpensive || false,
      });
    });
    return () => unsub();
  }, []);

  return (
    <NetworkContext.Provider value={{ ...networkState, refresh }}>
      {children}
    </NetworkContext.Provider>
  );
};
