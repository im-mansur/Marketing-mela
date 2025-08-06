
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { MelaData } from '@/lib/types';
import { useToast } from './use-toast';
import io, { type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function useMelaData() {
  const [data, setData] = useState<MelaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInitialDataAndConnect = async () => {
      // Fetch initial data from the server's in-memory store
      await fetch('/api/socket'); // Ensures the server is running

      socket = io({ path: '/api/socket_io' });

      socket.on('connect', () => {
        console.log('Socket connected');
        // Request the latest data from the server upon connecting
        socket?.emit('get-initial-data');
      });
      
      socket.on('initial-data', (initialData: MelaData) => {
        console.log('Received initial data from server');
        setData(initialData);
        setIsLoading(false);
      });

      socket.on('data-updated', (updatedData: MelaData) => {
        console.log('Received data update from server');
        setData(updatedData);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    };

    fetchInitialDataAndConnect();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const updateData = useCallback((newData: MelaData) => {
    // Optimistically update local state
    setData(newData);
    
    // Send the update to the server to be broadcasted
    if (socket) {
      socket.emit('update-data', newData);
    }

    toast({
      title: "Success!",
      description: "Your changes have been saved and broadcasted.",
    });
  }, [toast]);
  
  return { data, updateData, isLoading };
}
