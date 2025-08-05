
import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';
import { defaultMelaData } from '@/lib/data';
import type { MelaData } from '@/lib/types';

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

let melaData: MelaData = {
    ...defaultMelaData,
    eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('get-initial-data', () => {
        socket.emit('initial-data', melaData);
      });
      
      socket.on('update-data', (newData: MelaData) => {
        melaData = newData;
        // Broadcast to all clients
        io.emit('data-updated', melaData);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
