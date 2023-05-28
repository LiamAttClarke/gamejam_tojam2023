import { Socket } from "socket.io";
import { RoomManager } from "../../RoomManager";
import constants from "../../../../shared/constants";
import onDirectionChange from "../onDirectionChange";
import onNameChange from "../onNameChange";
import onCharacterChange from "../onCharacterChange";
import onGuessReceive from "../onGuessReceive";
import onTrailOn from "../onTrailOn";
import onTrailOff from "../onTrailOff";

export default (socket: Socket) => () => {
  console.log(`create room, socket id: ${socket.id}`);

  const roomManager = RoomManager.getInstance();

  roomManager.createRoom(socket);

  socket.on(constants.MSG_TYPES.DIRECTION_CHANGE, onDirectionChange(socket));
  socket.on(constants.MSG_TYPES.NAME_CHANGE, onNameChange(socket));
  socket.on(constants.MSG_TYPES.CHARACTER_CHANGE, onCharacterChange(socket));
  socket.on(constants.MSG_TYPES.TRAIL_ON, onTrailOn(socket));
  socket.on(constants.MSG_TYPES.TRAIL_OFF, onTrailOff(socket));
}
