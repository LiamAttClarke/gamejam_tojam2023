import { Socket } from "socket.io";
import Point from '../../shared/types/Point';

export default class RoomState {
  players: Map<Socket, Point>;

  constructor() {
    this.players = new Map();
  }
}
