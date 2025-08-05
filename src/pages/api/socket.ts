
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import type { MelaData } from '@/lib/types';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: NetSocket & {
    server: SocketServer;
  };
}

// This is the correct path for the client to connect to.
const SOCKET_IO_PATH = '/api/socket_io';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new IOServer(res.socket.server, {
      path: SOCKET_IO_PATH, // Use the correct path
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });

      socket.on('data-update', (data: MelaData) => {
        console.log('Received data-update from', socket.id);
        socket.broadcast.emit('data-updated', data);
      });
    });
  }
  res.end();
}
