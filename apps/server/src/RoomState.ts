import Curve from "../../shared/dtos/Curve";

export default class RoomState {
  curves: Curve[];

  constructor() {
    this.curves = [];
  }
}
