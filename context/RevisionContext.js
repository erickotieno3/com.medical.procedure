import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROCEDURES } from '../data/procedures';
const RevisionContext = createContext();
export const useRevision = () => {
  const ctx = useContext(RevisionContext);
  if (!ctx) throw new Error('useRevision must be used within RevisionProvider');
  return ctx;
};
const STORAGE_KEY = 'revision_progress';
export const RevisionProvider = ({ children }) => {
  const [progress, setProgress]   = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory]     = useState([]);
  useEffect(() => { loadProgress(); }, []);
  const loadProgress = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) { const s = JSON.parse(raw); setProgress(s.progress||{}); setBookmarks(s.bookmarks||[]); setHistory(s.history||[]); }
    } catch(e) { console.error('load error',e); }
  };
  const save = async (p,b,h) => {
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({progress:p,bookmarks:b,history:h})); }
    catch(e) { console.error('save error',e); }
  };
  const markStepComplete = useCallback((procedureId, stepIndex) => {
    setProgress(prev => {
      const updated = { ...prev, [procedureId]: { ...prev[procedureId], completedSteps: [...new Set([...(prev[procedureId]?.completedSteps||[]), stepIndex])], lastRevised: new Date().toISOString() }};
      save(updated, bookmarks, history); return updated;
    });
  }, [bookmarks, history]);
  const markProcedureRevised = useCallback((procedureId, score) => {
    const entry = { procedureId, score, date: new Date().toISOString() };
    setProgress(prev => {
      const updated = { ...prev, [procedureId]: { ...prev[procedureId], timesRevised:(prev[procedureId]?.timesRevised||0)+1, lastScore:score, lastRevised:new Date().toISOString(), completedSteps:[] }};
      const newHistory = [entry, ...history].slice(0,100);
      setHistory(newHistory); save(updated, bookmarks, newHistory); return updated;
    });
  }, [bookmarks, history]);
  const toggleBookmark = useCallback((procedureId) => {
    setBookmarks(prev => { const updated = prev.includes(procedureId) ? prev.filter(id=>id!==procedureId) : [...prev,procedureId]; save(progress,updated,history); return updated; });
  }, [progress, history]);
  const resetProgress = useCallback(async () => { setProgress({}); setBookmarks([]); setHistory([]); await AsyncStorage.removeItem(STORAGE_KEY); }, []);
  const getStats = useCallback(() => {
    const total = PROCEDURES.length;
    const revised = Object.keys(progress).filter(id=>progress[id]?.timesRevised>0).length;
    const totalRev = Object.values(progress).reduce((s,p)=>s+(p.timesRevised||0),0);
    const avgScore = history.length>0 ? Math.round(history.reduce((s,h)=>s+(h.score||0),0)/history.length) : 0;
    return { totalProcedures:total, revisedCount:revised, totalRevisions:totalRev, averageScore:avgScore, completionPercent:Math.round((revised/total)*100), bookmarkCount:bookmarks.length };
  }, [progress, history, bookmarks]);
  return (
    <RevisionContext.Provider value={{ progress, bookmarks, history, markStepComplete, markProcedureRevised, toggleBookmark, resetProgress, getStats }}>
      {children}
    </RevisionContext.Provider>
  );
};
