import { Socket } from "socket.io";

export const onConnect = (socket: Socket) => {
  console.log('received new connection from FE', socket.id);
}
