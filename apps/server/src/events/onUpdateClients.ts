import { RoomManager } from '../RoomManager';
import broadcastRoomState from './rooms/broadcastRoomState';
import { updatePhysicsBody } from '../physics';

export const onUpdateClients = () => {
  console.clear();
  console.log('ROOMS')
  for(const room of RoomManager.getInstance().getRooms()) {
    console.log(`- id: ${room.id}`);
    for(const player of room.getPlayers()) {
      console.log(`- player: ${player.id}, name: ${player.name}`);
      console.log(`  last position x: ${player.body.lastPosition.x}, last position y: ${player.body.lastPosition.y}`);
      console.log(`  x: ${player.body.position.x}, y: ${player.body.position.y}`)
      console.log(`  acceleration x: ${player.body.acceleration.x}, acceleration y: ${player.body.acceleration.y}`)
      console.log(`  drag: ${player.body.drag}`);
      console.log(`  lastDeltaT: ${player.body.lastDeltaT}`);
      console.log(`  mass: ${player.body.mass}`)
      //calculate next position for player
      const currentTime = new Date().getTime();
      updatePhysicsBody((currentTime-player.body.lastDeltaT)/1000, player.body);
    }
    console.log();
  }
  console.log('')

  for(const room of RoomManager.getInstance().getRooms()) {
    for(const player of room.getPlayers()) {
      if(player.currentTrailId) {
        // If we're ready to add a trail point..
        if(player.trailPointCooldown === 0) {
          room.addTrailPoint(player.id, player.body.position);
          player.trailPointCooldown = 10;
        } else {
          player.trailPointCooldown--;
        }
      }
    }

    broadcastRoomState(room.id, room.getGameSnapshot());
  }
}
