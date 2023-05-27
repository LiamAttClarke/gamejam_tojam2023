import { IVector } from './IVector'

export interface PhysicsBody {
  position: IVector;
  lastPosition: IVector;
  lastDeltaT: number;
  acceleration: IVector;
  mass: number;
  drag: number;
};
