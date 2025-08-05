
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { useToast } from './use-toast';
import { defaultMelaData } from '@/lib/data';


export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // This hook now uses local state instead of Firebase.
    // It initializes the data with a default set.
    const loadDefaultData = () => {
      try {
        const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
        setData(initialData);
      } catch (error) {
          console.error("Failed to load default data", error);
          toast({
              title: "Error Loading Data",
              description: "Could not load event data.",
              variant: "destructive"
          });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDefaultData();
  }, [toast]);

  const updateData = useCallback(async (newData: MelaData) => {
    // This function now just updates the local state.
    // Changes will not persist across devices.
    setData(newData);
     toast({
        title: "Success!",
        description: "Changes have been saved locally."
    });
  }, [toast]);
  
  return { data, updateData, isLoading };
}
