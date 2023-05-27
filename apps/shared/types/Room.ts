export default interface Room {
  id: string;
  users: string[];
  state: {
    players: {
      string: {
        x: number,
        y: number
      }
    }
  }
}
