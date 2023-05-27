import { Socket } from "socket.io";
import { Game } from "shared/types/Game";
import { Player } from "../../shared/types/Player";
import Vector from "../../shared/Vector";
import { IVector } from "shared/types/IVector";

// FOR: LIAM

/** Manages the room & game state
 *
 * Requirements:
 * [x] manages player data
 * [x] add/remove players from room
 * [x] start/end games
 * [x] get snapshot of game state
 * [] evaluate win/lose conditions
 * [] Must compute next position for a given player
 */
export class Room {
  private _id: string;
  private _sockets: Socket[] = [];
  private _game: Game|null = null;
  private _destroyed = false;

  get id (): string {
    return this._id;
  }

  get destroyed(): boolean {
    return this._destroyed;
  }

  get isGameStarted(): boolean {
    return Boolean(this._game);
  }

  constructor(roomId: string) {
    this._id = roomId;
  }

  getGameSnapshot(): Game {
    if (!this._game) throw new Error("No active game.");
    return structuredClone(this._game);
  }

  startGame() {
    if (this._game) this.endGame();
    this._game = {
      id: crypto.randomUUID(),
      startTimeMS: new Date().getTime(),
      players: this._sockets.map(()),
      trails: []
    };
  }

  endGame() {
    this._game = null;
  }

  getPlayer(playerId: string): Player|null {
    return this._game?.players.find(p => p.id === playerId) || null;
  }

  addPlayer(socket: Socket, options?: {
    position?: IVector,
    mass?: number,
    drag?: number,
  }): Player {
    const playerId = socket.id;
    if (this.getPlayer(playerId)) throw new Error(`Player '${playerId}' already exists`);
    const player: Player = {
      id: playerId,
      name: "Anonymous",
      body: {
        position: new Vector(0, 0),
        lastPosition: new Vector(0, 0),
        acceleration: new Vector(0, 0),
        mass: options?.mass || 100,
        drag: options?.drag || 0.5,
      },
      currentTrailId: null,
    };
    this._game?.players.push(player);
    return player;
  }

  removePlayer(playerId: string) {
    if (this._game) {
      const playerIndex = this._game?.players.findIndex(p => p.id === playerId);
      if (playerIndex >= 0) {
        this._game.players.splice(playerIndex, 1);
      }
      if (!this._game.players.length) {
        this.endGame();
      }
    }

    const socketIndex = this._sockets.findIndex(s => s.id === playerId);
    if (socketIndex >= 0) {
      const socket = this._sockets[socketIndex];
      socket.leave(this.id);
      this._sockets.splice(socketIndex, 1);
    }
    if (!this._sockets.length) {
      this.destroy();
    }

  }

  destroy() {
    this.endGame();
    for (const socket of this._sockets) {
      socket.leave(this.id);
    }
    this._destroyed = true;
  }

}
