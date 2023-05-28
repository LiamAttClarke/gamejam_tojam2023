import type { Trail } from "shared/types/Trail";
import Phaser from "phaser";
import type { Player } from "shared/types/Player";
import { GameManager } from "@/GameManager";

export class AudioScene extends Phaser.Scene {
  private _gameManager: GameManager;

  constructor() {
    super({ key: 'audio', active: true });
    this._gameManager = GameManager.getInstance();
  }

  preload () {
    this.load.audio("gameplay", "assets/audio/GameplayM.mp3");
    this.load.audio("title", "assets/audio/TitlescreenM.mp3");
    this.load.audio("fox", "assets/audio/Fox.mp3");
    console.log('preload');
  }

  create () {
    const sound = this.sound.add('title');
    sound.play();
  }

  update(time: number, delta: number): void {

  }
}
