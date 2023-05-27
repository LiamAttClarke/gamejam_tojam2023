<script setup lang="ts">
import PhaserRenderer from './components/GameRenderer.vue';
import { useGameStore } from './stores/game';
import type { Player } from '../../shared/types/Player';

const gameStore = useGameStore();
const liam: Player = {
  id: crypto.randomUUID(),
  name: "Liam"
};
gameStore.addPlayer(liam);
gameStore.addCurve({
  id: crypto.randomUUID(),
  ownerId: liam.id,
  points: [[0,0],[100,200],[150, 150]]
});
</script>

<template>
  <main>
    <div>
      <router-link to="/">Welcome</router-link>
      <router-link to="/lobby">Lobby</router-link>
      <router-link to="/character">Character Select</router-link>
      <router-link to="/room">GameRoom</router-link>
      <router-link to="/game">Game</router-link>
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped></style>
