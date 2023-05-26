import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Curve } from 'shared/types/Curve';
import type { Player } from 'shared/types/Player';

// NOTE: Game store should only be mutated by a server event

export const useGameStore = defineStore('game', () => {
  const players = ref<Player[]>([]);
  const curves = ref<Curve[]>([]);

  function addPlayer(player: Player) {
    if (players.value.find(p => p.id === player.id)) throw new Error(`Player with id '${player.id}' already exists in this room.`);
    if (players.value.find(p => p.name === player.name)) throw new Error(`Player with name '${player.name}' already exists in this room.`);
    players.value.push(player);
  }

  function removePlayer(playerId: string) {
    const playerIndex = players.value.findIndex(p => p.id === playerId);
    if (playerIndex >= 0) {
      players.value.splice(playerIndex, 1);
    }
  }

  function addCurve(curve: Curve) {
    curves.value.push(curve);
    return curve;
  }

  function appendCurvePoints(curveId: string, points: number[][]) {
    const curve = curves.value.find(c => c.id === curveId);
    if (!curve) throw new Error(`Curve '${curveId}' not found.`);
    curve.points.push(...points);
  }

  function removeCurve(curveId: string) {
    const curveIndex = curves.value.findIndex(c => c.id === curveId);
    return curves.value.splice(curveIndex, 1);
  }

  return { players, addPlayer, removePlayer, curves, addCurve, appendCurvePoints, removeCurve };
});
