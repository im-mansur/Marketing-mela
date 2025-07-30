
"use client";

import { useState, useEffect } from 'react';
import type { MelaData } from '@/lib/types';
import { defaultMelaData } from '@/lib/data';

const STORAGE_KEY = 'melaData';

export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);

  useEffect(() => {
    try {
      const storedData = window.localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        setData(initialData);
      }
    } catch (error) {
      console.error("Failed to access localStorage", error);
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
      setData(initialData);
    }
  }, []);

  const updateData = (newData: MelaData) => {
    // When updating, we replace the whole object.
    // This is because form libraries often work with the whole object.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
  };
  
  return { data, updateData, isLoading: data === null };
}
