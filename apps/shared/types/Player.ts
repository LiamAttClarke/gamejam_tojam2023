import { PhysicsBody } from "./PhysicsBody";
import { CharacterKind } from "./Character";

export interface Player {
  id: string;
  name: string;
  body: PhysicsBody;
  character: CharacterKind;
  currentTrailId: string|null;
  // If we add a point on every tick, it will get too cumbersome for the FE to render. So instead we sample.
  // On each tick we decrement the cooldown. Once it reaches zero, and if the player is drawing a trail, we add a point.
  trailPointCooldown: number;
}
