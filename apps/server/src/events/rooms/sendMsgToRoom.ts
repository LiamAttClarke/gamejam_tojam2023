import { RoomManager } from "../../RoomManager";

export default (roomId: string, message: object) => {
  RoomManager.getInstance().sendMessage(roomId, JSON.stringify(message))
}
