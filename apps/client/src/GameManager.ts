import type { Trail } from 'shared/types/Trail';
import type { Player } from 'shared/types/Player';

// NOTE: Game store should only be mutated by a server event

export class GameManager {
  static _instance: GameManager;

  private _players = new Map<string, Player>();
  private _trails = new Map<string, Trail>();
  private _timer:number = 999; //This is the time for guesser to figure out the word

  public static getInstance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }
    return GameManager._instance;
  }

  get players() {
    return this._players.values();
  }

  get trails() {
    return this._trails.values();
  }

  get timer() {
    return this._timer;
  }

  getPlayer(playerId: string): Player {
    const player = this._players.get(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    return player;
  }

  addPlayer(player: Player) {
    this._players.set(player.id, player);
    console.log(`Added player '${player.id}'`);
  }

  setPlayerPosition(playerId: string, position: number[]) {
    const player = this._players.get(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    player.position = position;
  }

  removePlayer(playerId: string) {
    this._players.delete(playerId)
  }

  addTrail(trail: Trail) {
    this._trails.set(trail.id, trail);
  }

  getTrail(trailId: string): Trail {
    const trail = this._trails.get(trailId);
    if (!trail) throw new Error(`Trail '${trailId}' not found.`);
    return trail;
  }

  appendTrailPoints(trailId: string, points: number[][]) {
    const trail = this._trails.get(trailId);
    if (!trail) throw new Error(`Trail '${trailId}' not found.`);
    trail.points.push(...points);
  }

  appendTrailPoint(trailId: string, point: number[]) {
    const trail = this._trails.get(trailId);
    if (!trail) throw new Error(`Trail '${trailId}' not found.`);
    trail.points.push(point);
  }

  removeTrail(trailId: string) {
    this._trails.delete(trailId);
  }
}
