
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { readData, writeData } from '@/lib/firebase';
import { useToast } from './use-toast';
import { defaultMelaData } from '@/lib/data';


export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const remoteData = await readData();
            setData(remoteData);
        } catch (error) {
            console.error("Failed to fetch data from Firebase", error);
            toast({
                title: "Error",
                description: "Could not load event data. Please try again later.",
                variant: "destructive"
            });
        }
    };
    fetchData();
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
  
  return { data, updateData, isLoading: data === null };
}
