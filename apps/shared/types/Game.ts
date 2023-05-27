import { Player } from "./Player";
import { Trail } from "./Trail";

export interface Game {
  id: string;
  startTimeMS: number;
  term: string;
  clue: string;
  lastGuess: string;
  players: Player[];
  trails: Trail[];
}
