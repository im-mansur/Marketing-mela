"use client";

import { useState, useEffect } from 'react';
import type { MelaData } from '@/lib/types';
import { defaultMelaData } from '@/lib/data';

const STORAGE_KEY = 'melaData';

export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);

  useEffect(() => {
    try {
      // Clear old data to ensure updates are applied
      window.localStorage.removeItem(STORAGE_KEY);
      
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      setData(initialData);

    } catch (error) {
      console.error("Failed to read from localStorage", error);
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
      setData(initialData);
    }
  }, []);

  const updateData = (newData: Partial<MelaData>) => {
    if (!data) return;
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };
  
  return { data, updateData, isLoading: data === null };
}
