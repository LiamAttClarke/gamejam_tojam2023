import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";
import { Vector } from "../../../shared/types/Vector";

export default (socket: Socket) => (direction: Vector) => {
  console.log(`${socket.id} wants to move ${direction}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if(!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  room.state.players.set(socket, direction);
}
