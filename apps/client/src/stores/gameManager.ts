import { defineStore } from 'pinia';
import type { Trail } from 'shared/types/Trail';
import type { Player } from 'shared/types/Player';

// Define the store
export const useGameManagerStore = defineStore('gameManager', {
  state: () => ({
    count: 0,
    _players: new Map<string, Player>(),
    _trails: new Map<string, Trail>(),
    _timer: 0,
    _roomId: '',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    getPlayer(playerId: string){
      const player = this._players.get(playerId);
      if (!player) throw new Error(`Player '${playerId}' not found.`);
        return player;
    }
  },
});
