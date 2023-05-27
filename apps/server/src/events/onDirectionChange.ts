import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";
import { IVector } from "../../../shared/types/IVector";

export default (socket: Socket) => (direction: IVector) => {
  console.log(`${socket.id} wants to move ${direction}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if(!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  // TODO: find player in room, set their new direction
  // room.game.players.set(socket, direction);
}
