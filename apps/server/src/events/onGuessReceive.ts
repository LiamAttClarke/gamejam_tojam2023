import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";

export default (socket: Socket) => (guess: string): Record<string, any> => {
  console.log(`${socket.id} is making a guess: ${guess}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if (!room) {
    console.log(`Can't find room, whoops!`);
    return { error_occured: true, correct_guess: false };
  }

  const player = room.getPlayer(socket.id);
  if (player) {
    player.name = guess;
    return { error_occured: true, correct_guess: false };
  }

  socket.to(room.id).emit(`A guess was made, ${guess}!`);

  const correct_answer = room.game?.term;
  if (guess === correct_answer) {
    return { error_occured: false, correct_guess: true };
  }

  return { error_occured: false, correct_guess: false };
};
