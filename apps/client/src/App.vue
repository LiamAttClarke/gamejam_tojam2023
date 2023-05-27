<script setup lang="ts">
import PhaserRenderer from './components/GameRenderer.vue';
import { GameManager } from './GameManager';
import type { Player } from '../../shared/types/Player';
import { onMounted } from 'vue';

const gameManager = GameManager.getInstance();

const liam: Player = {
  id: crypto.randomUUID(),
  name: "Liam",
  position: [200, 200]
};
gameManager.addPlayer(liam);
gameManager.addTrail({
  id: crypto.randomUUID(),
  ownerId: liam.id,
  points: [[0,0],[100,200],[150, 150]]
});

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
})

// TODO: remove events on component destroy
const aMag = 10;
function onKeyDown(event: KeyboardEvent) {
  const player = gameManager.getPlayer(liam.id);
  if (!player) return
  const acceleration = [0, 0];
  switch (event.key) {
    case "w": acceleration[1] -= aMag; break;
    case "a": acceleration[0] -= aMag; break;
    case "s": acceleration[1] += aMag; break;
    case "d": acceleration[0] += aMag; break;
  }
  const newPosition = [player.position[0] + acceleration[0], player.position[1] + acceleration[1]];
  gameManager.setPlayerPosition(player.id, newPosition);
}
</script>

<template>
  <main>
    <div>
      <router-link to="/">Welcome</router-link>
      <router-link to="/lobby">Lobby</router-link>
      <router-link to="/character">Character Select</router-link>
      <router-link to="/game">Game</router-link>
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped></style>
