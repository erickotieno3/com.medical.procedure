// app/hooks/useAdAccess.js
import { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { hasActiveAccess, getRemainingAccessMs } from '../services/AdManager';

export function useAdAccess() {
  const [hasAccess,   setHasAccess]   = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [loading,     setLoading]     = useState(true);

  const check = useCallback(async () => {
    const active = await hasActiveAccess();
    if (active) {
      setHasAccess(true);
      setRemainingMs(await getRemainingAccessMs());
    } else {
      setHasAccess(false);
      setRemainingMs(0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { check(); }, [check]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', s => { if (s === 'active') check(); });
    return () => sub.remove();
  }, [check]);

  useEffect(() => {
    if (!hasAccess || remainingMs <= 0) return;
    const id = setInterval(() => {
      setRemainingMs(prev => {
        const next = prev - 1000;
        if (next <= 0) { clearInterval(id); setHasAccess(false); return 0; }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [hasAccess, remainingMs]);

  return { hasAccess, remainingMs, loading };
}
