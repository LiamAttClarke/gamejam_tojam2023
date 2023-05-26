import { RoomManager } from "../../RoomManager";

export default (roomId: string, message: object) => {
  RoomManager.getInstance().broadcastRoomState(roomId, JSON.stringify(message))
}
