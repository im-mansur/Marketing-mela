
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
    // This useEffect hook will only run on the client side, after the component has mounted.
    // This is the correct place to fetch data from Firebase.
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const remoteData = await readData();
          setData(remoteData);
      } catch (error) {
          console.error("Failed to fetch data from Firebase", error);
          toast({
              title: "Error Loading Data",
              description: "Could not load event data. Displaying default data.",
              variant: "destructive"
          });
          // Set default data on error
          const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
          setData({ ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const updateData = useCallback(async (newData: MelaData) => {
    try {
        await writeData(newData);
        setData(newData); // Optimistically update the local state
         toast({
            title: "Success!",
            description: "Event details have been updated."
        });
    } catch(error) {
        console.error("Failed to update data in Firebase", error);
        toast({
            title: "Error Saving Data",
            description: "Could not save changes. Please check your connection and try again.",
            variant: "destructive"
        });
    }
  }, [toast]);
  
  return { data, updateData, isLoading };
}
