export interface Player {
  id: string;
  name: string;
}

export interface Curve {
  id: string;
  ownerId: string;
  points: number[][];
}
