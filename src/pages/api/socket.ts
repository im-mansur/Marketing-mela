
import type { NextApiRequest } from 'next';
import { Server as IOServer } from 'socket.io';
import type { MelaData } from '@/lib/types';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { NextApiResponse } from 'next';

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: NetSocket & {
    server: SocketServer;
  };
}

const SOCKET_IO_PATH = '/api/socket_io';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new IOServer(res.socket.server, {
      path: SOCKET_IO_PATH,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  } else {
    console.log('Socket is already running');
  }

  // Handle POST request from the admin panel to broadcast updates
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data: MelaData = JSON.parse(body);
        res.socket.server.io?.emit('data-updated', data);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
    return;
  }

  res.end();
}
