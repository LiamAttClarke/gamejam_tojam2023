import { Vector } from "./Vector";

export interface Trail {
  id: string;
  ownerId: string;
  points: Vector[];
}
