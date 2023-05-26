import { Socket } from "socket.io";
import Curve from "../../shared/dtos/Curve";

import Point from '../../shared/types/Point';

export default class RoomState {
  curves: Curve[];
  players: Map<Socket, Point>;

  constructor() {
    this.curves = [];
    this.players = new Map();
  }
}
