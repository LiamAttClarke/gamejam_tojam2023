import { IVector } from './IVector'

export interface PhysicsBody {
  position: IVector;
  lastPosition: IVector;
  acceleration: IVector;
  mass: number;
  drag: number;
};
