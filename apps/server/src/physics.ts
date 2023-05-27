import { PhysicsBody } from "../../shared/types/PhysicsBody"
import { Vector } from "../../shared/types/Vector";

export interface IComputeNextPhysicsBodyPosition {
  (deltaT: number, body: PhysicsBody): Vector;
}

// FOR: IVAN
export const computeNextPosition: IComputeNextPhysicsBodyPosition = (deltaT, body) => {
  return { x: 0, y: 0 };
};

