import { Room } from '../Room';
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
      if (winningConditionSatisfied(room)) {
        console.log("Game complete!");
      }

    }
    console.log();
  }
  console.log('')

  for(const room of RoomManager.getInstance().getRooms()) {
    broadcastRoomState(room.id, room.getGameSnapshot());
  }
}


function winningConditionSatisfied(room_to_check: Room): Boolean {
  //const guesser_id = room_to_check.game?.guesserId;
  const correct_answer = room_to_check.game?.term;
  let done:Boolean = false;
  while (room_to_check.game?.guesses.length !== 0) {
    const curr_guess = room_to_check.game?.guesses.pop();
    console.log("Player guessed " + curr_guess);
    if (!done && curr_guess === correct_answer) {
      console.log("Player won!");
    }


  };
  return done;
}
