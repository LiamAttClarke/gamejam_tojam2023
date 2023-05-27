import type { Trail } from 'shared/types/Trail';
import type { Player } from 'shared/types/Player';

// NOTE: Game store should only be mutated by a server event

export class GameManager {
  static _instance: GameManager;

  private _players = new Map<string, Player>();
  private _trails = new Map<string, Trail>();

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

  getPlayer(playerId: string): Player {
    const player = this._players.get(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    return player;
  }

  addPlayer(player: Player) {
    this._players.set(player.id, player);
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

  appendTrailPoints(trailId: string, points: number[][]) {
    const trail = this._trails.get(trailId);
    if (!trail) throw new Error(`Trail '${trailId}' not found.`);
    trail.points.push(...points);
  }

  removeTrail(trailId: string) {
    this._trails.delete(trailId);
  }
}
