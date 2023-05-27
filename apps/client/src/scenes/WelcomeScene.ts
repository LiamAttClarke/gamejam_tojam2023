import type { Trail } from "shared/types/Trail";
import Phaser from "phaser";
import type { Player } from "shared/types/Player";
import { GameManager } from "@/GameManager";

export class AudioScene extends Phaser.Scene {
  private _gameManager: GameManager;

  constructor() {
    super();
    this._gameManager = GameManager.getInstance();
  }

  preload () {
    this.load.image('player', 'assets/peach.png');
  }

  create () {

  }

  update(time: number, delta: number): void {

  }
}
