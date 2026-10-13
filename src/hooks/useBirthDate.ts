import { useState, useEffect } from 'react';
import { BirthDate } from '@/types';

const STORAGE_KEY = 'life-in-weeks-birthdate';

export function useBirthDate() {
  const [birthDate, setBirthDate] = useState<BirthDate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as BirthDate;
        setBirthDate(parsed);
      } catch {
        // Invalid JSON, ignore
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever birthDate changes
  useEffect(() => {
    if (!isHydrated) return;

    if (birthDate) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(birthDate));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [birthDate, isHydrated]);

  const saveBirthDate = (date: BirthDate) => {
    setBirthDate(date);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const reset = () => {
    setBirthDate(null);
    setIsEditing(false);
  };

  return {
    birthDate,
    isEditing,
    isHydrated,
    showInput: !birthDate || isEditing,
    saveBirthDate,
    startEditing,
    cancelEditing,
    reset,
  };
}
