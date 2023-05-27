import { Player } from "./Player";
import { Trail } from "./Trail";

export enum GameStatus {
  Active = 'active',
  Victory = 'victory',
  Failure = 'failure',
  Inactive = 'inactive',
}

export interface Game {
  id: string;
  status: GameStatus;
  durationMS: number;
  startTimeMS: number;
  lastUpdateMS: number;
  guesserId: string;
  term: string;
  clue: string;
  guesses: string[];
  players: Player[];
  trails: Trail[];
}
