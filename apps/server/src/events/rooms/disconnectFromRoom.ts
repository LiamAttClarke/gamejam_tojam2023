import { Socket } from "socket.io";
import { RoomManager } from "../RoomManager";

export default (socket: Socket) => (roomId: string) => {
  const roomManager = RoomManager.getInstance();

  roomManager.leaveRoom(roomId, socket);
}
