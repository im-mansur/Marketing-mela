
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { useToast } from './use-toast';
import { defaultMelaData } from '@/lib/data';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const socketInitializer = useCallback(async () => {
    // We call this on the client side only, so we can safely fetch the API route
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
      // Request initial data when connected
      socket.emit('get-initial-data');
    });

    socket.on('initial-data', (initialData: MelaData) => {
        // Use initial data from server, but ensure eventDate is in the future
        const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const dataWithDate = { ...initialData, eventDate: initialData.eventDate || fifteenDaysFromNow.toISOString() };
        setData(dataWithDate);
        setIsLoading(false);
    });

    socket.on('data-updated', (updatedData: MelaData) => {
      setData(updatedData);
      toast({
        title: "Update Received!",
        description: "The event data has been updated live.",
      });
    });
    
    // Disconnect socket on cleanup
    return () => {
        socket.disconnect();
    }

  }, [toast]);

  useEffect(() => {
    // Initialize socket connection
    const cleanupPromise = socketInitializer();
    
    // Return the cleanup function
    return () => {
      cleanupPromise.then(cleanup => cleanup());
    }
  }, [socketInitializer]);
  
  const updateData = useCallback((newData: MelaData) => {
    if (socket) {
      socket.emit('update-data', newData);
       toast({
          title: "Success!",
          description: "Your changes have been broadcasted.",
      });
    }
  }, [toast]);
  
  return { data, updateData, isLoading };
}
