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
  document.addEventListener('keydown', onKeyDown)
})

// TODO: remove events on component destroy
const aMag = 10
const isPooping = ref(false)
const currentTrailId = ref()
function onKeyDown(event: KeyboardEvent) {
  const player = gameManager.getPlayer(liam.id)
  if (!player) return
  const acceleration = [0, 0]
  //aw x=-1 y=-1
  //wd x=1 y=1
  //as x=-1 y=-1
  //sd x=1 y=-1
  switch (event.key) {
    case 'w':
      acceleration[1] -= aMag
      useGameManagerStore.sendInput({x: 0, y: 1})
      //x=0, y=1
      break
    case 'a':
      acceleration[0] -= aMag
      useGameManagerStore.sendInput({x: -1, y: 0})
      //x=-1, y=0
      break
    case 's':
      acceleration[1] += aMag
      useGameManagerStore.sendInput({x: 0, y: -1})
      //x=0, y=-1
      break
    case 'd':
      acceleration[0] += aMag
      //x=1, y=0
      break
    case 'q':
      isPooping.value = true
      startPoop()
      break
    case 'e':
      isPooping.value = false
      break
  }
  const newPosition = [player.position[0] + acceleration[0], player.position[1] + acceleration[1]]
  gameManager.setPlayerPosition(player.id, newPosition)
}
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
