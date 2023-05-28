import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";

export default (socket: Socket) => (guess: string): void => {
  console.log(`${socket.id} is making a guess: ${guess}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if (!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  const player = room.getPlayer(socket.id);
  if (player) {
    player.name = guess;
    return;
  }

  socket.to(room.id).emit(`A guess was made, ${guess}!`);

  room.game?.guesses.push(guess);
  const correct_answer = room.game?.term;
  if (guess === correct_answer) {
    return;
  }

  return;
};
