import { IVector } from "./types/IVector";

export default class Vector implements IVector {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static fromArray(arr: number[]): Vector {
    if (arr.length !== 2) throw new Error("'arr' length must be 2.");
    return new Vector(arr[0], arr[1]);
  }

  static fromVectorLike(v: IVector): Vector {
    return new Vector(v.x, v.y);
  }

  static dot(u: Vector, v: Vector): number {
    return u.x * v.x + u.y * v.y;
  }

  static distance(v: Vector, u: Vector): number {
    return u.subtract(v).magnitude();
  }

  static angleBetween(a: Vector, b: Vector): number {
    const p = a.x * b.x + a.y * b.y;
    const n = Math.sqrt(
      (a.x ** 2 + a.y ** 2) * (b.x ** 2 + b.y ** 2),
    );
    const sign = a.x * b.y - a.y * b.x < 0 ? -1 : 1;
    const angle = Math.acos(p / n);
    return sign * angle;
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  addScalar(n: number): Vector {
    return new Vector(this.x + n, this.y + n);
  }

  subtractScalar(n: number): Vector {
    return new Vector(this.x - n, this.y - n);
  }

  multiplyByScalar(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

  negate(): Vector {
    return new Vector(-this.x, -this.y);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector {
    const magnitude = this.magnitude();
    return new Vector(this.x / magnitude, this.y / magnitude);
  }

  perpendicular(clockwise = true): Vector {
    return clockwise ? new Vector(this.y, -this.x) : new Vector(-this.y, this.x);
  }

  toArray(): number[] {
    return [this.x, this.y];
  }
}
