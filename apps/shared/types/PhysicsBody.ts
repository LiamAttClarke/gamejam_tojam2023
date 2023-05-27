import { Vector } from './Vector'

export interface PhysicsBody {
  position: Vector;
  lastPosition: Vector;
  acceleration: Vector;
  mass: number;
  drag: number;
};
