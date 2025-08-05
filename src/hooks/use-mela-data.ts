
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { useToast } from './use-toast';
import { defaultMelaData } from '@/lib/data';
import io, { type Socket } from 'socket.io-client';

export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const updateData = useCallback((newData: MelaData) => {
    // Update local state and localStorage immediately
    setData(newData);
    localStorage.setItem('melaData', JSON.stringify(newData));
    
    // Broadcast the update to other clients via the server
    fetch('/api/socket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    toast({
      title: "Success!",
      description: "Your changes have been saved and broadcasted.",
    });
  }, [toast]);

  useEffect(() => {
    // 1. Initialize data from localStorage or defaults
    const savedData = localStorage.getItem('melaData');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const dataWithDate = { ...defaultMelaData, eventDate: defaultMelaData.eventDate || fifteenDaysFromNow.toISOString() };
      setData(dataWithDate);
      localStorage.setItem('melaData', JSON.stringify(dataWithDate));
    }
    setIsLoading(false);

    // 2. Initialize Socket.IO connection
    // We must fetch the API route to ensure the socket server is running.
    fetch('/api/socket').finally(() => {
      const socket: Socket = io({ path: '/api/socket_io' });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('data-updated', (updatedData: MelaData) => {
        console.log('Received data update from server');
        setData(updatedData);
        localStorage.setItem('melaData', JSON.stringify(updatedData));
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
      
      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    })
  }, []); // Empty dependency array ensures this runs only once on mount
  
  return { data, updateData, isLoading };
}
