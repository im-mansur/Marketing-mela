
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

  useEffect(() => {
    // Initialize with default data from localStorage or the static file
    const savedData = localStorage.getItem('melaData');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const dataWithDate = { ...defaultMelaData, eventDate: defaultMelaData.eventDate || fifteenDaysFromNow.toISOString() };
      setData(dataWithDate);
    }
    setIsLoading(false);

    // This triggers the server to initialize the socket if it hasn't already.
    fetch('/api/socket');

    // Establish socket connection
    socket = io({
      path: '/api/socket_io', // Match the server path
    });
    
    socket.on('connect', () => {
        console.log('Connected to socket server');
    });

    socket.on('data-updated', (newData: MelaData) => {
      console.log('Received data update from server');
      setData(newData);
      localStorage.setItem('melaData', JSON.stringify(newData));
    });
    
    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
    });

    // Cleanup on component unmount
    return () => {
      if (socket) {
          socket.disconnect();
      }
    };
  }, []);

  const updateData = useCallback((newData: MelaData) => {
    // Update local state and localStorage immediately
    setData(newData);
    localStorage.setItem('melaData', JSON.stringify(newData));
    
    // Broadcast the update to other clients via the server
    if (socket) {
      socket.emit('data-update', newData);
    }

    toast({
      title: "Success!",
      description: "Your changes have been saved and broadcasted.",
    });
  }, [toast]);
  
  return { data, updateData, isLoading };
}
