import { IVector } from "./IVector";

export interface Trail {
  id: string;
  ownerId: string;
  points: IVector[];
}
