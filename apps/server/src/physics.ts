import { PhysicsBody } from "../../shared/types/PhysicsBody"
import { IVector } from "../../shared/types/IVector";

export interface IComputeNextPhysicsBodyPosition {
  (deltaT: number, body: PhysicsBody): IVector;
}

// FOR: IVAN
export const computeNextPosition: IComputeNextPhysicsBodyPosition = (deltaT: number, body: PhysicsBody) => {

  let time_factor: number = (deltaT / body.lastDeltaT);
  let delta_x: number = (body.position.x - body.lastPosition.x + body.acceleration.x) * time_factor;
  let delta_y: number = (body.position.y - body.lastPosition.y + body.acceleration.y) * time_factor;
  let new_x: number = body.lastPosition.x + delta_x;
  let new_y: number = body.lastPosition.y + delta_y;
  body.lastDeltaT = deltaT;
  body.lastPosition = body.position;
  body.position.x = new_x;
  body.position.y = new_y;
  // why do we need to return anything? let's just update it here
  return { x: new_x, y: new_y };
};

