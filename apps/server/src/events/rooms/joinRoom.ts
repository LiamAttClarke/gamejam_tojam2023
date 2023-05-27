import { Socket } from "socket.io";
import { RoomManager } from "../../RoomManager";
import constants from "../../../../shared/constants";
import onDirectionChange from "../onDirectionChange";

export default (socket: Socket) => (roomId: string) => {
  const roomManager = RoomManager.getInstance();

  roomManager.joinRoom(roomId, socket)

  socket.on(constants.MSG_TYPES.DIRECTION_CHANGE, onDirectionChange(socket));
}
