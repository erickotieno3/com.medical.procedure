import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from './AuthContext';

interface SavedProceduresContextType {
  savedProcedures: string[];
  toggleSaved: (procedureId: string) => Promise<void>;
  isSaved: (procedureId: string) => boolean;
  loading: boolean;
}

const SavedProceduresContext = createContext<SavedProceduresContextType>({} as SavedProceduresContextType);

export const useSavedProcedures = () => useContext(SavedProceduresContext);

export const SavedProceduresProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedProcedures, setSavedProcedures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSavedProcedures();
    } else {
      setSavedProcedures([]);
      setLoading(false);
    }
  }, [user]);

  const loadSavedProcedures = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('saved_procedures')
      .select('procedure_id')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setSavedProcedures(data.map(item => item.procedure_id));
    }
    setLoading(false);
  };

  const toggleSaved = async (procedureId: string) => {
    if (!user) return;

    const isCurrentlySaved = savedProcedures.includes(procedureId);

    if (isCurrentlySaved) {
      await supabase
        .from('saved_procedures')
        .delete()
        .eq('user_id', user.id)
        .eq('procedure_id', procedureId);
      setSavedProcedures(prev => prev.filter(id => id !== procedureId));
    } else {
      await supabase
        .from('saved_procedures')
        .insert({ user_id: user.id, procedure_id: procedureId });
      setSavedProcedures(prev => [...prev, procedureId]);
    }
  };

  const isSaved = (procedureId: string) => savedProcedures.includes(procedureId);

  return (
    <SavedProceduresContext.Provider value={{ savedProcedures, toggleSaved, isSaved, loading }}>
      {children}
    </SavedProceduresContext.Provider>
  );
};
