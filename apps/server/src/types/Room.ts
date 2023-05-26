import { Socket } from "socket.io";
import RoomState from "../RoomState";

export default interface Room {
  id: string;
  users: Socket[];
  state: RoomState;
}
