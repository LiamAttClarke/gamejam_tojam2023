import { Socket } from 'socket.io';
import constants from '../../../shared/constants';
import { RoomManager } from '../RoomManager';
import createRoom from './createRoom';
import joinRoom from './joinRoom';
import leaveRoom from './leaveRoom';
import sendMsgToRoom from './sendMsgToRoom';


export const onConnect = (socket: Socket) => {
  console.log('received new connection from FE', socket.id);

  socket.on(constants.MSG_TYPES.CREATE_ROOM, createRoom(socket));
  socket.on(constants.MSG_TYPES.JOIN_ROOM, joinRoom(socket));
  socket.on(constants.MSG_TYPES.LEAVE_ROOM, leaveRoom(socket));
  socket.on(constants.MSG_TYPES.SEND_MSG_TO_ROOM, sendMsgToRoom(socket));
  socket.on(constants.MSG_TYPES.DISCONNECT, leaveRoom(socket));
}
