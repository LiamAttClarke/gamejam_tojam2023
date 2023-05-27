import { PhysicsBody } from "./PhysicsBody";

export interface Player {
  id: string;
  name: string;
  body: PhysicsBody;
  currentTrailId: string;
}
