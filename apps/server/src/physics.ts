import { PhysicsBody } from "../../shared/types/PhysicsBody"
import { IVector } from "../../shared/types/IVector";

export interface IUpdatePhysicsBody {
  (deltaT: number, body: PhysicsBody): void;
}

// Any problems? Talk to Ivan
export const computeNextPosition: IUpdatePhysicsBody = (deltaT: number, body: PhysicsBody) => {

  let time_factor: number = (deltaT / body.lastDeltaT);
  let delta_x: number = (body.position.x - body.lastPosition.x + body.acceleration.x) * time_factor;
  let delta_y: number = (body.position.y - body.lastPosition.y + body.acceleration.y) * time_factor;
  let new_x: number = body.lastPosition.x + delta_x;
  let new_y: number = body.lastPosition.y + delta_y;
  body.lastDeltaT = deltaT;
  body.lastPosition = body.position;
  body.position.x = new_x;
  body.position.y = new_y;
};

