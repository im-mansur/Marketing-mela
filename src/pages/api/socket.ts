
import type { NextApiRequest } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import type { MelaData } from '@/lib/types';
import { defaultMelaData } from '@/lib/data';
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

// Use in-memory storage for the single source of truth
let melaData: MelaData = {
  ...defaultMelaData,
  eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (req.method === 'POST') {
     // This part is for admin panel to post data, which will then be broadcasted
     let body = '';
     req.on('data', (chunk) => {
       body += chunk.toString();
     });
     req.on('end', () => {
       try {
         const data: MelaData = JSON.parse(body);
         melaData = data; // Update server's master copy
         res.socket.server.io?.emit('data-updated', melaData);
         res.status(200).json({ success: true });
       } catch (error) {
         res.status(400).json({ error: 'Invalid JSON' });
       }
     });
     return;
  }

  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new IOServer(res.socket.server, {
      path: SOCKET_IO_PATH,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);

      socket.on('get-initial-data', () => {
        socket.emit('initial-data', melaData);
      });

      socket.on('update-data', (updatedData: MelaData) => {
        melaData = updatedData;
        socket.broadcast.emit('data-updated', melaData);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  } else {
    console.log('Socket is already running');
  }

  res.end();
}
