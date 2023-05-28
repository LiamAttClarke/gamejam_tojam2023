import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";
import { IVector } from "../../../shared/types/IVector";

export default (socket: Socket) => () => {
  console.log(`${socket.id} wants to start recording a trail.`);

  const room = RoomManager.getInstance().getRoomForSocket(socket);

  if(!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  const player = room.getPlayer(socket.id);
  if(!player) {
    console.log(`Can't find player, whoops!`);
    return;
  }

  room.startTrail(player.id);

  // TODO: find player in room, set their new direction
  // room.game.players.set(socket, direction);
}
