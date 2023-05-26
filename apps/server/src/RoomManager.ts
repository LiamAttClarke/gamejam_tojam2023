import { Server, Socket } from "socket.io";
import Room from "./types/Room";
import RoomState from "./RoomState";
import constants from "../../shared/constants";

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
    this.rooms.push({ id: roomId, users: [socket], state: new RoomState() });
    socket.join(roomId);
  }

  // TODO: add constraint to make sure a player can't join more than one room.
  joinRoom(roomId: string, socket: Socket) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      room.users.push(socket);
      socket.join(roomId);
    }
  }

  leaveRoom(roomId: string, socket: Socket) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      room.users = room.users.filter(user => user.id !== socket.id);
      socket.leave(roomId);
      if (room.users.length === 0) {
        this.rooms = this.rooms.filter(r => r.id !== roomId);
      }
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
    this.rooms = this.rooms.map(room => {
      room.users = room.users.filter(user => user.id !== socket.id);
      return room;
    });
    // Removing empty rooms
    this.rooms = this.rooms.filter(room => room.users.length > 0);
  }

  getRooms() {
    return this.rooms;
  }
}
