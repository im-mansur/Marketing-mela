
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
    // Since we are not using a real-time backend anymore,
    // we just load the default data.
    const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    const dataWithDate = { ...defaultMelaData, eventDate: defaultMelaData.eventDate || fifteenDaysFromNow.toISOString() };
    setData(dataWithDate);
    setIsLoading(false);
  }, []);
  
  const updateData = useCallback((newData: MelaData) => {
    // Update the data in the local state.
    // This will not persist across reloads or be shared with other users.
    setData(newData);
    toast({
        title: "Success!",
        description: "Your changes have been saved locally.",
    });
  }, [toast]);
  
  return { data, updateData, isLoading };
}
