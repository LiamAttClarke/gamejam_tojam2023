import { Server, Socket } from "socket.io";

interface Room {
  id: string;
  users: Socket[];
}

export class RoomManager {
  private static instance: RoomManager;
  private static io: Server;

  private rooms: Room[] = [];

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
    this.rooms.push({ id: roomId, users: [socket] });
    socket.join(roomId);
  }

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

  sendMessage(roomId: string, message: string) {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      RoomManager.io.to(roomId).emit('receive message', message);
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
}
