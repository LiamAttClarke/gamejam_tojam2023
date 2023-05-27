import { Server, Socket } from "socket.io";
import { Room } from "./Room";
import constants from "../../shared/constants";

// FOR: ALEX

/** Manages the lifecycle/CRUD of rooms
 *
 * Requirements:
 * Create, Join, Leave, Delete rooms
 * on create room, generate roomId and return to client
 */

/**  */
export class RoomManager {
  private static instance: RoomManager;
  private static io: Server;

  private rooms: Room[] = [];

  // Needs to be called first, when server starts up.
  public static setIo(io: Server): void {
    RoomManager.io = io;
  }

  private constructor() {}

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }

  createRoom(roomId: string, socket: Socket) {
    const room = new Room(roomId);
    room.addPlayer(socket);

    this.rooms.push(room);
    socket.join(roomId);
  }

  joinRoom(roomId: string, socket: Socket) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      room.addPlayer(socket)
      socket.join(roomId);
    }
  }

  leaveRoom(roomId: string, socket: Socket) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      room.removePlayer(socket.id)
    }
  }

  broadcastRoomState(roomId: string, message: string) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      RoomManager.io.to(roomId).emit(constants.MSG_TYPES.BROADCAST_ROOM_STATE, message);
    }
  }

  handleDisconnect(socket: Socket) {
    // Removing socket from all rooms
    for(const room of this.rooms) {
      room.removePlayer(socket.id);
    }
    // Removing empty rooms
    this.rooms = this.rooms.filter(room => room.getNumPlayers() > 0);
  }

  getRooms() {
    return this.rooms;
  }

  getRoomForSocket(socket: Socket) {
    for (const room of this.rooms) {
      if (room.hasSocket(socket)) return room;
    }

    return null;
  }
}
