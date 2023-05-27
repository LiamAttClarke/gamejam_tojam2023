import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { onConnect } from './events/onConnect';
import { onUpdateClients } from './events/onUpdateClients';
import { RoomManager } from './RoomManager';

import cors from 'cors';

const whitelist = ['http://localhost:5173']; // adjust the list to your needs
const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void => {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(express.static('./public'));
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
const server = createServer(app).listen(port);
console.log(`Server listening on port ${port}`);

const io = new Server(server, { cors: {
  origin: whitelist,
  methods: ["GET", "POST"],
}});
RoomManager.setIo(io);

io.on('connection', onConnect);

const TARGET_UPDATES_PER_SECOND = 30;
setInterval(onUpdateClients, 1000/TARGET_UPDATES_PER_SECOND);
