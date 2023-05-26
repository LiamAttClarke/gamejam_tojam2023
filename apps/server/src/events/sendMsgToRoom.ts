import { Socket } from "socket.io";
import { RoomManager } from "../RoomManager";

export default (socket: Socket) => (roomId: string, message: string) => {
  const roomManager = RoomManager.getInstance();

  roomManager.sendMessage(roomId, message)
}
