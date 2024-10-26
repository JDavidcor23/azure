import { useState, useEffect } from 'react';
import { QuizEntry } from '../types/quiz';

const STORAGE_KEY = 'quiz_entries';

export function useQuizStorage() {
  const [successEntries, setSuccessEntries] = useState<QuizEntry[]>([]);
  const [errorEntries, setErrorEntries] = useState<QuizEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { success, errors } = JSON.parse(stored);
      setSuccessEntries(success || []);
      setErrorEntries(errors || []);
    }
  }, []);

  const saveEntries = (success: QuizEntry[], errors: QuizEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ success, errors }));
    setSuccessEntries(success);
    setErrorEntries(errors);
  };

  const addEntry = (entry: Omit<QuizEntry, 'timestamp'>) => {
    const fullEntry = { ...entry, timestamp: Date.now() };
    
    if (entry.userAnswer.toLowerCase().trim() === entry.correctAnswer.toLowerCase().trim()) {
      saveEntries([...successEntries, fullEntry], errorEntries);
    } else {
      saveEntries(successEntries, [...errorEntries, fullEntry]);
    }
  };

  const updateConcept = (timestamp: number, newConcept: string, type: 'success' | 'errors') => {
    if (type === 'success') {
      const updatedEntries = successEntries.map(entry =>
        entry.timestamp === timestamp ? { ...entry, concept: newConcept } : entry
      );
      saveEntries(updatedEntries, errorEntries);
    } else {
      const updatedEntries = errorEntries.map(entry =>
        entry.timestamp === timestamp ? { ...entry, concept: newConcept } : entry
      );
      saveEntries(successEntries, updatedEntries);
    }
  };

  return {
    successEntries,
    errorEntries,
    addEntry,
    updateConcept
  };
}