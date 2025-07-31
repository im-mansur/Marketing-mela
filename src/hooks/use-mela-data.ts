
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { readData, writeData } from '@/lib/firebase';
import { useToast } from './use-toast';
import { defaultMelaData } from '@/lib/data';


export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const remoteData = await readData();
          if (remoteData) {
            setData(remoteData);
          } else {
            const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
            const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
            await writeData(initialData);
            setData(initialData);
          }
      } catch (error) {
          console.error("Failed to fetch data from Firebase", error);
          toast({
              title: "Error",
              description: "Could not load event data. Using default data.",
              variant: "destructive"
          });
          const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
          setData({ ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Ensure this only runs on the client
    if (typeof window !== "undefined") {
        fetchData();
    }

  }, [toast]);

  const updateData = useCallback(async (newData: MelaData) => {
    try {
        await writeData(newData);
        setData(newData);
         toast({
            title: "Success!",
            description: "Event details have been updated."
        });
    } catch(error) {
        console.error("Failed to update data in Firebase", error);
        toast({
            title: "Error",
            description: "Could not save changes. Please check your connection and try again.",
            variant: "destructive"
        });
    }
  }, [toast]);
  
  return { data, updateData, isLoading };
}
