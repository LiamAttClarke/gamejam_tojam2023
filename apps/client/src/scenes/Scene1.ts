import { useGameStore } from "@/stores/game";
import type { Curve } from "shared/types/Curve";
import Phaser from "phaser";

export class Scene1 extends Phaser.Scene {

  peach: Phaser.GameObjects.Sprite|null = null;

  timeElapsed: number = 0;

  private _gameStore: ReturnType<typeof useGameStore>|null = null;

  get gameStore() {
    if (!this._gameStore) {
      this._gameStore = useGameStore();
    }
    return this._gameStore;
  }

  preload () {
    this.load.image('peach', 'assets/peach.png');
  }

  create () {
    this.peach = this.add.sprite(400, 300, 'peach');
    this.peach.displayWidth = 32;
    this.peach.displayHeight = 32;

    for (const curve of this.gameStore.curves) {
      this.drawCurve(curve);
    }
  }

  update(time: number, delta: number): void {

  }

  drawCurve(curve: Curve) {
    if (!curve.points.length) return;
    const flattenedPoints = curve.points.reduce((points, p) => [...points, ...p], []);
    console.log(curve.points, flattenedPoints);
    const c = this.add.curve(0, 0, new Phaser.Curves.Spline(flattenedPoints));
    c.setStrokeStyle(2, 0xff0000);
  }

}
