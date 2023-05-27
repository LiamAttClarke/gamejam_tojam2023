import { Socket } from "socket.io";
import { Player } from "../../shared/types/Player";
import Vector from "../../shared/Vector";
import matches from "./matches.json";
import { IVector } from "../../shared/types/IVector";
import { Game, GameStatus } from "../../shared/types/Game";
import { updatePhysicsBody } from "./physics";
import { Trail } from "../../shared/types/Trail";
import crypto from 'crypto';

// FOR: LIAM

/** Manages the room & game state
 *
 * Requirements:
 * [x] manages player data
 * [x] add/remove players from room
 * [x] start/end games
 * [x] get snapshot of game state
 * [x] evaluate win/lose conditions
 * [x] Must compute next position for a given player
 * [x] update trail
 */
export class Room {
  private _sockets: Socket[] = [];
  private _game: Game;
  private _destroyed = false;

  get id (): string {
    return this._game.id;
  }

  get destroyed(): boolean {
    return this._destroyed;
  }

  get isGameStarted(): boolean {
    return Boolean(this._game);
  }

  get game(): Game|null {
    return this._game;
  }

  constructor(roomId: string, options: {
    durationMS: number;
    guesserId?: string;
  }) {
    this._game = {
      id: roomId,
      status: GameStatus.Inactive,
      durationMS: options.durationMS,
      guesserId: options.guesserId || "",
      startTimeMS: 0,
      lastUpdateMS: 0,
      term: '',
      clue: '',
      guesses: [],
      players: [],
      trails: []
    };
  }

  private getNextMatch(): { term: string, clue: string } {
    return matches[Math.floor(Math.random() * matches.length)];
  }

  getGameSnapshot(): Game {
    if (!this._game) throw new Error("No active game.");
    return structuredClone(this._game);
  }

  startGame(options: {
    durationMS: number;
    guesserId?: string;
  }) {
    if (this._sockets.length < 2) throw new Error("Room must have at least 2 players to start.");
    const match = this.getNextMatch();
    const now = new Date().getTime();
    this._game.startTimeMS = now;
    this._game.lastUpdateMS = now;
    this._game.term = match.term;
    this._game.clue = match.clue;

    // Create players for each socket
    this._sockets.forEach(s => this.addPlayer(s));
    if (!this._game.guesserId) {
      // If no guesser is set, choose a random one.
      this._game.guesserId = this._game.players[Math.floor(Math.random() * this._game.players.length)].id;
    } else {
      // Make sure guesser exists
      const guesser = this.getPlayer(this._game.guesserId);
      if (!guesser) throw new Error(`Guesser '${this._game.guesserId}' not found.`);
    }
  }

  endGame() {
    this._game.status = GameStatus.Inactive;
  }

  submitGuess(playerId: string, guess: string) {
    if (!this._game) throw new Error("Game has not started yet.");
    const player = this.getPlayer(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    if (this._game.guesserId !== playerId) throw new Error(`Player '${playerId}' is not the guesser.`);

    const normalizedGuess = guess.trim();
    if (!normalizedGuess) throw new Error("Empty guesses are not allowed.")
    this._game?.guesses.push(normalizedGuess);
  }

  setPlayerAcceleration(playerId: string, acceleration: Vector) {
    const player = this.getPlayer(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    player.body.acceleration = acceleration;
  }

  addTrailPoint(playerId: string, position: Vector) {
    const player = this.getPlayer(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    let trail: Trail;
    if (player.currentTrailId) {
      // Use current trail
      const currentTrail = this.getTrail(player.currentTrailId);
      if (!currentTrail) throw new Error(`Could not find current trail for player '${playerId}'.`);
      trail = currentTrail;
    } else {
      // create new trail
      trail = {
        id: crypto.randomUUID(),
        playerId,
        points: [],
      };
      player.currentTrailId = trail.id
    }
    trail.points.push(position);
  }

  endTrail(playerId: string) {
    const player = this.getPlayer(playerId);
    if (!player) throw new Error(`Player '${playerId}' not found.`);
    player.currentTrailId = null;
  }

  update() {
    if (!this._game) throw new Error("A game is not in progress.");
    const now = new Date().getTime();
    const delta = now - this._game.lastUpdateMS;
    const gameTimeElapsed = now - this._game.startTimeMS;
    // Update player physics bodies (positions)
    this.game?.players.forEach(p => updatePhysicsBody(delta, p.body));
    // Check lose condition
    if (gameTimeElapsed > this._game.durationMS) {
      this._game.status = GameStatus.Failure;
    }
    // Check win condition
    const correctGuess = this._game.guesses.find(g => g.toLowerCase() === this._game!.term.toLowerCase());
    if (correctGuess) {
      this._game.status = GameStatus.Victory;
    }
    // Update game time
    this._game.lastUpdateMS = now;
  }

  getPlayer(playerId: string): Player|null {
    return this._game?.players.find(p => p.id === playerId) || null;
  }

  getTrail(trailId: string): Trail|null {
    return this._game?.trails.find(t => t.id === trailId) || null;
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
        lastDeltaT: new Date().getTime(),
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

  getNumPlayers() {
    return this._sockets.length;
  }

  hasSocket(socket: Socket) {
    return this._sockets.filter(s => s.id === socket.id).length > 0;
  }

  destroy() {
    this.endGame();
    for (const socket of this._sockets) {
      socket.leave(this.id);
    }
    this._destroyed = true;
  }
}
