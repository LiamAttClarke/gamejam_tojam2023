import { IVector } from "./IVector";

export interface Trail {
  id: string;
  playerId: string;
  points: IVector[];
}
