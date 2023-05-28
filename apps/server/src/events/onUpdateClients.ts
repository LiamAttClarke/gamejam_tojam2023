import { Room } from '../Room';
import { RoomManager } from '../RoomManager';
import broadcastRoomState from './rooms/broadcastRoomState';

export const onUpdateClients = () => {
  console.clear();
  console.log('ROOMS')
  for(const room of RoomManager.getInstance().getRooms()) {
    console.log(`- id: ${room.id}`);
    for(const player of room.getPlayers()) {
      console.log(`- player: ${player.id}`);
    }
    console.log();
  }
  console.log('')

  for(const room of RoomManager.getInstance().getRooms()) {
    broadcastRoomState(room.id, room.getGameSnapshot());
  }
}
