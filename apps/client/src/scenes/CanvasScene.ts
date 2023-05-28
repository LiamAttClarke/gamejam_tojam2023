import Phaser from "phaser";
import type { Trail } from "shared/types/Trail";
import type { Player } from "shared/types/Player";
import { CharacterKind } from "shared/types/Character";
import { GameManager } from "@/GameManager";

const PLAYER_WIDTH = 128;

export class CanvasScene extends Phaser.Scene {
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
    this.load.spritesheet(CharacterKind.Hedgehog, "assets/spritesheets/hedgehog.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Porcupine, "assets/spritesheets/porcupine.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Cat, "assets/spritesheets/cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Dog, "assets/spritesheets/dot.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Fox, "assets/spritesheets/fox.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Armadillo, "assets/spritesheets/armadillo.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(CharacterKind.Goat, "assets/spritesheets/goat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create () {
    // Create animations
    this.anims.create({
      key: `${CharacterKind.Armadillo}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Armadillo, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Cat}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Cat, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Dog}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Dog, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Fox}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Fox, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Goat}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Goat, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Hedgehog}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Hedgehog, { start: 3, end: 5 }),
      repeat: -1
    });
    this.anims.create({
      key: `${CharacterKind.Porcupine}_walk`,
      frameRate: 7,
      frames: this.anims.generateFrameNumbers(CharacterKind.Porcupine, { start: 3, end: 5 }),
      repeat: -1
    });

    for (const player of this._gameManager.players) {
      this.addPlayer(player, CharacterKind.Hedgehog);
    }
    // for (const trail of this._gameManager.trails) {
    //   this.addTrail(trail);
    // }
  }

  // update(time: number, delta: number): void {
  //   // TODO: Only update if dirty
  //   for (const player of this._gameManager.players) {
  //     this.updatePlayer(player);
  //   }
  //   for (const trail of this._gameManager.trails) {
  //     try {
  //       this.updateTrail(trail);
  //       this.drawSplineFromTrail(trail)
  //     } catch (e) {
  //       this.addTrail(trail);
  //     }
  //   }
  // }

  private addPlayer(player: Player, character: CharacterKind) {
    const sprite = this.add.sprite(player.body.position.x, player.body.position.y, character);
    sprite.displayWidth = PLAYER_WIDTH;
    sprite.displayHeight = PLAYER_WIDTH;
    // TODO: Move this to the update call based on velocity
    sprite.play(`${character}_walk`);
    this._playerObjs.set(player.id, sprite);
  }

  // private addTrail(trail: Trail) {
  //   if (!trail.points.length) return;
  //   const flattenedPoints = trail.points.reduce((points, p) => [...points, ...p], []);
  //   const obj = this.add.curve(0, 0, new Phaser.Curves.Spline(flattenedPoints));
  //   obj.setStrokeStyle(2, 0xff0000);
  //   this._trailObjs.set(trail.id, obj);
  // }

  // private updatePlayer(player: Player) {
  //   const playerObj = this._playerObjs.get(player.id);
  //   if (!playerObj) throw new Error(`No GameObject found for player: ${player.id}`);
  //   // TODO: update player
  //   playerObj.setPosition(player.position[0], player.position[1]);
  // }

  // private updateTrail(trail: Trail) {
  //   const trailObj = this._trailObjs.get(trail.id);
  //   if (!trailObj) throw new Error(`No GameObject found for trail: ${trail.id}`);
  //   // TODO: update curve
  // }

  // private drawSplineFromTrail(trail: Trail) {
  //   const flattenedPoints = trail.points.reduce((points, p) => [...points, ...p], []);

  //   const graphics = this.add.graphics();
  //   const lineWidth = 2;
  //   const lineColor = 0xff0000;

  //   graphics.lineStyle(lineWidth, lineColor);

  //   if (flattenedPoints.length > 1) {
  //     const startingPoint = new Phaser.Math.Vector2(flattenedPoints[0], flattenedPoints[1]);
  //     graphics.moveTo(startingPoint.x, startingPoint.y);

  //     for (let i = 2; i < flattenedPoints.length; i += 2) {
  //       const point = new Phaser.Math.Vector2(flattenedPoints[i], flattenedPoints[i + 1]);
  //       graphics.lineTo(point.x, point.y);
  //     }
  //   }

  //   graphics.strokePath();
  // }
}
