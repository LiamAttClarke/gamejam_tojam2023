import { Socket } from "socket.io";
import { RoomManager } from "../../RoomManager";
import constants from "../../../../shared/constants";
import onDirectionChange from "../onDirectionChange";

export default (socket: Socket) => () => {
  console.log(`create room, socket id: ${socket.id}`);

  const roomManager = RoomManager.getInstance();

  roomManager.createRoom(socket);

  socket.on(constants.MSG_TYPES.DIRECTION_CHANGE, onDirectionChange(socket));
}
