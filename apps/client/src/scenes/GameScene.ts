import type { Trail } from "shared/types/Trail";
import Phaser from "phaser";
import type { Player } from "shared/types/Player";
import { GameManager } from "@/GameManager";
import { useGameManagerStore } from '../stores/gameManager';
import { CharacterKind } from "shared/types/Character";
import { ref, Ref } from 'vue';

const PLAYER_WIDTH = 128;

export class GameScene extends Phaser.Scene {
  private _gameManager: GameManager;
  private _gameManagerStore: ReturnType<typeof useGameManagerStore>;
  /** Player.id -> Phaser.GameObject */
  private _playerObjs = new Map<string, Phaser.GameObjects.Sprite>();
  /** Trail.id -> Phaser.GameObject */
  private _trailObjs = new Map<string, Phaser.GameObjects.Curve>();

  constructor() {
    super('game');
    this._gameManager = GameManager.getInstance();
    this._gameManagerStore = useGameManagerStore();
    console.log(this._gameManagerStore);
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

    for (const player of Object.values(this._gameManagerStore.players)) {
      this.addPlayer(player);
    }
    for (const trail of this._gameManager.trails) {
      this.addTrail(trail);
    }
  }

  update(time: number, delta: number): void {
    // TODO: Only update if dirty
    //console.log(this._gameManagerStore.players);
    if(this._gameManagerStore.players.size > 0) {

      const playerIds = Array.from(this._gameManagerStore.players.keys());
      for (const playerId of playerIds) {
        const player = this._gameManagerStore.players.get(playerId);
        // Update the player object in Phaser
        this.addPlayer(player, player?.character);
      }
      /*
      for (const player of this._gameManager.players) {
        console.log(player);
        this.addPlayer(player);
      }*/
    }
    this.updatePlayers();
    /*
    for (const player of this._gameManager.players) {
      this.updatePlayers(player);
    }*/
    /*
    for (const trail of this._gameManager.trails) {
      try {
        this.updateTrail(trail);
        this.drawSplineFromTrail(trail)
      } catch (e) {
        this.addTrail(trail);
      }
    }*/
  }

  private addPlayer(player: Player, character: CharacterKind) {
    if(this._playerObjs.get(player.id))
    {
      //console.log(`Player ${player.id} exists`);
      return;
    }
    console.log(`Player ${player.id} added`);
    const sprite = this.add.sprite(player.body.position.x, player.body.position.y, character);
    sprite.displayWidth = PLAYER_WIDTH;
    sprite.displayHeight = PLAYER_WIDTH;
    // TODO: Move this to the update call based on velocity
    //sprite.play(`${character}_walk`);
    this._playerObjs.set(player.id, sprite);
  }

  private setPlayers(players: Player[]) {
    console.log(players);
    for (const player of players) {
      this.addPlayer(player);
    }
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
    playerObj.setPosition(player.body.position.x, -player.body.position.y);
    console.log(playerObj);
    //console.log(playerObj.);

  }

  private updatePlayers() {
    //console.log('update');
    //console.log(this._gameManagerStore.players);
    //console.log(this._playerObjs);
    for (const [playerId, playerObj] of this._playerObjs.entries()) {
      //console.log(playerId, playerObj);
      const player = this._gameManagerStore.players.get(playerId);
      if (player) {
        // Update player position
        //playerObj.x = player.position[0];
        //playerObj.y = player.position[1];
        //console.log(player);
        //console.log(player.body.position);
        this.updatePlayer(player);
      }
    }
/*
    this._gameManagerStore.players.forEach((player) => {
      this._playerObjs.set(player.id, player);
      console.log(player.id);
    });
    for (const playerObj of this._playerObjs.values()) {
      const playerId = playerObj.getData('playerId');
      const player = this._gameManager.players.find((p) => p.id === playerId);
      if (!player) {
        throw new Error(`No player found for player object with ID: ${playerId}`);
      }
      playerObj.setPosition(player.body.position[0], player.body.position[1]);
      console.log(playerObj);
    }*/
  }

  private updateTrail(trail: Trail) {
    const trailObj = this._trailObjs.get(trail.id);
    if (!trailObj) throw new Error(`No GameObject found for trail: ${trail.id}`);
    // TODO: update curve
  }

  private drawSplineFromTrail(trail: Trail) {
    const flattenedPoints = trail.points.reduce((points, p) => [...points, ...p], []);

    const graphics = this.add.graphics();
    const lineWidth = 2;
    const lineColor = 0xff0000;

    graphics.lineStyle(lineWidth, lineColor);

    if (flattenedPoints.length > 1) {
      const startingPoint = new Phaser.Math.Vector2(flattenedPoints[0], flattenedPoints[1]);
      graphics.moveTo(startingPoint.x, startingPoint.y);

      for (let i = 2; i < flattenedPoints.length; i += 2) {
        const point = new Phaser.Math.Vector2(flattenedPoints[i], flattenedPoints[i + 1]);
        graphics.lineTo(point.x, point.y);
      }
    }

    graphics.strokePath();
  }
}
