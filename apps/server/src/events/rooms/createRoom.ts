import { Socket } from "socket.io";
import { RoomManager } from "../../RoomManager";

export default (socket: Socket) => () => {
  console.log(`create room, socket id: ${socket.id}`);

  const roomManager = RoomManager.getInstance();

  roomManager.createRoom(socket);
}
