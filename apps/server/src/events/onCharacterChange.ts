import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";
import { CharacterKind } from "../../../shared/types/Character";

export default (socket: Socket) => (character: CharacterKind) => {
  console.log(`${socket.id} wants to change character ${character}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if(!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  const player = room.getPlayer(socket.id);
  if(player) {
    // TODO: 🤷 I have no idea what I'm doing; halp
    player.character = character;
  }

  // TODO: find player in room, set their new direction
  // room.game.players.set(socket, direction);
}
