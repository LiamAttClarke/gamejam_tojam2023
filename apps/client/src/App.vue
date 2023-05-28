<script setup lang="ts">
import PhaserRenderer from './components/GameRenderer.vue'
import { GameManager } from './GameManager'
import { useGameManagerStore } from './stores/gameManager'
import type { Player } from '../../shared/types/Player'
import type { IVector } from '../../shared/types/IVector'
import { onMounted, ref, inject } from 'vue'

const gameManager = GameManager.getInstance()
const useGameManagerStore = inject('gameManager');

const liam: Player = {
  id: crypto.randomUUID(),
  name: 'Liam',
  position: [200, 200]
}
gameManager.addPlayer(liam)
gameManager.addTrail({
  id: crypto.randomUUID(),
  ownerId: liam.id,
  points: [
    [0, 0],
    [100, 200],
    [150, 150]
  ]
})

onMounted(() => {

})

// TODO: remove events on component destroy
const aMag = 10
const isPooping = ref(false)
const currentTrailId = ref()

// start pooping
function startPoop() {
  const player = gameManager.getPlayer(liam.id)
  if (!player) return
  try {
    const trail = gameManager.getTrail(currentTrailId.value)
  } catch (e) {
    currentTrailId.value = crypto.randomUUID()
    gameManager.addTrail({
      id: currentTrailId.value,
      ownerId: liam.id,
      points: []
    })
  }
}

//set interval where it will check if the player is pooping
setInterval(() => {
  const player = gameManager.getPlayer(liam.id)
  if (!player) return
  if (isPooping.value) {
    gameManager.appendTrailPoint(currentTrailId.value, player.position)
  } else {
    //not pooping
    currentTrailId.value = null
    //console.log(gameManager.trails);
  }
}, 1000)
</script>

<template>
  <main>
    <div>
      <router-link to="/">Welcome </router-link>
      <router-link to="/lobby">Lobby </router-link>
      <router-link to="/character">CharacterSelect </router-link>
      <router-link to="/room">GameRoom </router-link>
      <router-link to="/game">Game </router-link>
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped></style>
