import { Player } from "./Player";
import { Trail } from "./Trail";

export interface Game {
  id: string;
  startTimeMS: number;
  players: Player[];
  trails: Trail[];
}
