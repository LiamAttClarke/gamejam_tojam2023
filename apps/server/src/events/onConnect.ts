import { Socket } from 'socket.io';
import constants from '../../../shared/constants';
import createRoom from './rooms/createRoom';
import joinRoom from './rooms/joinRoom';
import leaveRoom from './rooms/leaveRoom';
import sendMsgToRoom from './rooms/sendMsgToRoom';


export const onConnect = (socket: Socket) => {
  console.log('received new connection from FE', socket.id);

  socket.on(constants.MSG_TYPES.CREATE_ROOM, createRoom(socket));
  socket.on(constants.MSG_TYPES.JOIN_ROOM, joinRoom(socket));
  socket.on(constants.MSG_TYPES.LEAVE_ROOM, leaveRoom(socket));
  socket.on(constants.MSG_TYPES.DISCONNECT, leaveRoom(socket));
}
