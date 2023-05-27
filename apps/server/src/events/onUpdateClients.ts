import { RoomManager } from '../RoomManager';
import broadcastRoomState from './rooms/broadcastRoomState';

export const onUpdateClients = () => {
  for(const room of RoomManager.getInstance().getRooms()) {
    broadcastRoomState(room.id, room.getGameSnapshot());
  }
}
