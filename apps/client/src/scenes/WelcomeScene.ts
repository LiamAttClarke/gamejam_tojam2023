import type { Trail } from "shared/types/Trail";
import Phaser from "phaser";

export class WelcomeScene extends Phaser.Scene {
  private _gameManager: GameManager;

  constructor() {
    super({ key: 'welcome', active: true });

  }

  preload () {
    //const backgroundImage = params.add.image(0, 0, 'background');
    //backgroundImage.setOrigin(0, 0);
    this.load.image('background', 'assets/background.jpg');
  }

  create () {
    this.face = this.add.image(400, 300, 'background');
  }

  update(time: number, delta: number): void {

  }
}
