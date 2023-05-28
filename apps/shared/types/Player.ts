import { PhysicsBody } from "./PhysicsBody";
import { CharacterKind } from "./Character";

export interface Player {
  id: string;
  name: string;
  body: PhysicsBody;
  character: CharacterKind;
  currentTrailId: string|null;
}
