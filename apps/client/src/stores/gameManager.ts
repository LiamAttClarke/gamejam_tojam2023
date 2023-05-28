import { defineStore } from 'pinia';
import type { Trail } from 'shared/types/Trail';
import type { Player } from 'shared/types/Player';

// Define the store
export const useGameManagerStore = defineStore('gameManager', {
  state: () => ({
    _self: null as Player | null,
    _players: new Map<string, Player>(),
    _trails: new Map<string, Trail>(),
    _timer: 0,
    _roomId: '',
    _joinCode: '3333',
  }),
  getters: {
    players: (state) => state._players,
    trails: (state) => state._trails,
    timer: (state) => state._timer,
    roomId: (state) => state._roomId,
    joinCode: (state) => state._joinCode,
  },
  actions: {
    getPlayer(playerId: string){
      const player = this._players.get(playerId);
      if (!player) throw new Error(`Player '${playerId}' not found.`);
        return player;
    },
    setRoom(roomId: string){
      this._roomId = roomId;
    },
    sendInput(input: string){

    }
  },
});
