import { Socket } from "socket.io";
import RoomState from "../RoomState";

export default interface Room {
  id: string;
  sockets: Socket[];
  state: RoomState;
}
