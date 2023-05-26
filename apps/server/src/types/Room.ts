import { Socket } from "socket.io";

export default interface Room {
  id: string;
  users: Socket[];
}
