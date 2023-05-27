import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { onConnect } from './events/onConnect';
import { onUpdateClients } from './events/onUpdateClients';
import { RoomManager } from './RoomManager';

const app = express();
app.use(express.static('./public'));

const port = process.env.PORT || 3000;
const server = createServer(app).listen(port);
console.log(`Server listening on port ${port}`);

const io = new Server(server);
RoomManager.setIo(io);

io.on('connection', onConnect);

const TARGET_UPDATES_PER_SECOND = 30;
setInterval(onUpdateClients, 1000/TARGET_UPDATES_PER_SECOND);
