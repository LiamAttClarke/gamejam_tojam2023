import { RoomManager } from '../RoomManager';
import sendMsgToRoom from './rooms/sendMsgToRoom';

export const onUpdateClients = () => {
  for(const room of RoomManager.getInstance().getRooms()) {
    sendMsgToRoom(room.id, room.state);
  }
}
