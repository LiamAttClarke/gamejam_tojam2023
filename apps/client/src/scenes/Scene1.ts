import type { Trail } from "shared/types/Trail";
import Phaser from "phaser";
import type { Player } from "shared/types/Player";
import { GameManager } from "@/GameManager";

export class Scene1 extends Phaser.Scene {
  private _gameManager: GameManager;
  /** Player.id -> Phaser.GameObject */
  private _playerObjs = new Map<string, Phaser.GameObjects.Sprite>();
  /** Trail.id -> Phaser.GameObject */
  private _trailObjs = new Map<string, Phaser.GameObjects.Curve>();

  constructor() {
    super();
    this._gameManager = GameManager.getInstance();
  }

  preload () {
    this.load.image('player', 'assets/peach.png');
  }

  create () {
    for (const player of this._gameManager.players) {
      this.addPlayer(player);
    }
    for (const trail of this._gameManager.trails) {
      this.addTrail(trail);
    }
  }

  update(time: number, delta: number): void {
    // TODO: Only update if dirty
    for (const player of this._gameManager.players) {
      this.updatePlayer(player);
    }
    for (const trail of this._gameManager.trails) {
      this.updateTrail(trail);
    }
  }

  private addPlayer(player: Player) {
    const obj = this.add.sprite(player.position[0], player.position[1], 'player');
    obj.displayWidth = 32;
    obj.displayHeight = 32;
    this._playerObjs.set(player.id, obj);
  }

  private addTrail(trail: Trail) {
    if (!trail.points.length) return;
    const flattenedPoints = trail.points.reduce((points, p) => [...points, ...p], []);
    const obj = this.add.curve(0, 0, new Phaser.Curves.Spline(flattenedPoints));
    obj.setStrokeStyle(2, 0xff0000);
    this._trailObjs.set(trail.id, obj);
  }

  private updatePlayer(player: Player) {
    const playerObj = this._playerObjs.get(player.id);
    if (!playerObj) throw new Error(`No GameObject found for player: ${player.id}`);
    // TODO: update player
    playerObj.setPosition(player.position[0], player.position[1]);
  }

  private updateTrail(trail: Trail) {
    const trailObj = this._trailObjs.get(trail.id);
    if (!trailObj) throw new Error(`No GameObject found for trail: ${trail.id}`);
    // TODO: update curve
  }
}
