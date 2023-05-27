import { Socket } from "socket.io";
import { Game } from "shared/types/Game";

// FOR: LIAM

/** Manages the room & game state
 *
 * Requirements:
 * - manages player data
 * - start/end games
 * - evaluate win/lose conditions
 * - add/remove players from room
 * - serialize game state to JSON
 * - must keep track of latest state
 * - Must compute next position for a given player
 */
export class Room {
  private sockets: Socket[] = [];

  private game: Game;
}
