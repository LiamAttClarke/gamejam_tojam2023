import { Socket } from "socket.io"
import { RoomManager } from "../RoomManager";

export default (socket: Socket) => (name: string) => {
  console.log(`${socket.id} wants to change name to ${name}`);

  const roomManager = RoomManager.getInstance();

  const room = roomManager.getRoomForSocket(socket);

  if(!room) {
    console.log(`Can't find room, whoops!`);
    return;
  }

  const player = room.getPlayer(socket.id);
  if(player) {
    // TODO: 🤷 I have no idea what I'm doing; halp
    player.name = name;
  }

  // TODO: find player in room, set their new direction
  // room.game.players.set(socket, direction);
}
