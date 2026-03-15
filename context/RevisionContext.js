// context/RevisionContext.js
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
  const [progress, setProgress]     = useState({});
  const [bookmarks, setBookmarks]   = useState([]);
  const [history, setHistory]       = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  // Load saved progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setProgress(saved.progress || {});
        setBookmarks(saved.bookmarks || []);
        setHistory(saved.history || []);
      }
    } catch (e) {
      console.error('Failed to load revision progress:', e);
    }
  };

  const saveProgress = async (newProgress, newBookmarks, newHistory) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        progress:  newProgress,
        bookmarks: newBookmarks,
        history:   newHistory,
      }));
    } catch (e) {
      console.error('Failed to save revision progress:', e);
    }
  };

  // Mark a procedure step as completed
  const markStepComplete = useCallback((procedureId, stepIndex) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        [procedureId]: {
          ...prev[procedureId],
          completedSteps: [
            ...new Set([...(prev[procedureId]?.completedSteps || []), stepIndex])
          ],
          lastRevised: new Date().toISOString(),
        }
      };
      saveProgress(updated, bookmarks, history);
      return updated;
    });
  }, [bookmarks, history]);

  // Mark entire procedure as revised
  const markProcedureRevised = useCallback((procedureId, score) => {
    const entry = {
      procedureId,
      score,
      date: new Date().toISOString(),
    };
    setProgress(prev => {
      const updated = {
        ...prev,
        [procedureId]: {
          ...prev[procedureId],
          timesRevised: (prev[procedureId]?.timesRevised || 0) + 1,
          lastScore:    score,
          lastRevised:  new Date().toISOString(),
          completedSteps: [],
        }
      };
      const newHistory = [entry, ...history].slice(0, 100);
      setHistory(newHistory);
      saveProgress(updated, bookmarks, newHistory);
      return updated;
    });
  }, [bookmarks, history]);

  // Toggle bookmark
  const toggleBookmark = useCallback((procedureId) => {
    setBookmarks(prev => {
      const updated = prev.includes(procedureId)
        ? prev.filter(id => id !== procedureId)
        : [...prev, procedureId];
      saveProgress(progress, updated, history);
      return updated;
    });
  }, [progress, history]);

  // Reset all progress
  const resetProgress = useCallback(async () => {
    setProgress({});
    setBookmarks([]);
    setHistory([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  // Stats
  const getStats = useCallback(() => {
    const totalProcedures  = PROCEDURES.length;
    const revisedCount     = Object.keys(progress).filter(
      id => progress[id]?.timesRevised > 0
    ).length;
    const totalRevisions   = Object.values(progress).reduce(
      (sum, p) => sum + (p.timesRevised || 0), 0
    );
    const averageScore     = history.length > 0
      ? Math.round(history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length)
      : 0;

    return {
      totalProcedures,
      revisedCount,
      totalRevisions,
      averageScore,
      completionPercent: Math.round((revisedCount / totalProcedures) * 100),
      bookmarkCount: bookmarks.length,
    };
  }, [progress, history, bookmarks]);

  return (
    <RevisionContext.Provider value={{
      progress,
      bookmarks,
      history,
      currentSession,
      setCurrentSession,
      markStepComplete,
      markProcedureRevised,
      toggleBookmark,
      resetProgress,
      getStats,
    }}>
      {children}
    </RevisionContext.Provider>
  );
};
