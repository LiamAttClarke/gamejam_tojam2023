import { PhysicsBody } from "../../shared/types/PhysicsBody"
import { IVector } from "../../shared/types/IVector";

export interface IUpdatePhysicsBody {
  (deltaT: number, body: PhysicsBody): void;
}

// Any problems? Talk to Ivan
export const updatePhysicsBody: IUpdatePhysicsBody = (deltaT: number, body: PhysicsBody) => {
  const scale_factor = 15;
  let time_factor: number = (deltaT / body.lastDeltaT);
  let delta_x: number = (body.position.x - body.lastPosition.x + body.acceleration.x) * time_factor * scale_factor;
  let delta_y: number = (body.position.y - body.lastPosition.y + body.acceleration.y) * time_factor * scale_factor;
  let new_x: number = body.lastPosition.x + delta_x;
  let new_y: number = body.lastPosition.y + delta_y;
  body.lastDeltaT = deltaT;
  body.lastPosition = body.position;
  body.position.x = new_x;
  body.position.y = new_y;

  if(body.position.x < 0) {
    body.position.x = 0;
  }

  if(body.position.x > 800) {
    body.position.x = 800;
  }

  if(body.position.y > 0) {
    body.position.y = 0;
  }

  if(body.position.y < -550) {
    body.position.y = -550;
  }
};

