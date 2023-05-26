import { Socket } from "socket.io"

export default (socket: Socket) => (direction: unknown) => {
  console.log(`${socket.id} wants to move ${direction}`);
  // TODO: find associated room with socket; update room state.
}
