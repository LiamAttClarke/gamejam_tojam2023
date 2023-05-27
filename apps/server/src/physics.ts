import { PhysicsBody } from "../../shared/types/PhysicsBody"
import { IVector } from "../../shared/types/IVector";

export interface IComputeNextPhysicsBodyPosition {
  (deltaT: number, body: PhysicsBody): IVector;
}

// FOR: IVAN
export const computeNextPosition: IComputeNextPhysicsBodyPosition = (deltaT, body) => {
  return { x: 0, y: 0 };
};

