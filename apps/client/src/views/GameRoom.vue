<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import GameNav from '../components/game/GameNav.vue';
import GameSide from '../components/game/GameSide.vue';
import GameRenderer from '../components/GameRenderer.vue';

const useGameManagerStore = inject('gameManager');

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
})

const isPooping = ref(false)

function onKeyDown(event: KeyboardEvent) {
  //aw x=-1 y=-1
  //wd x=1 y=1
  //as x=-1 y=-1
  //sd x=1 y=-1
  switch (event.key) {
    case 'w':
      useGameManagerStore.sendInput({x: 0, y: 1})
      //x=0, y=1
      break
    case 'a':
      useGameManagerStore.sendInput({x: -1, y: 0})
      //x=-1, y=0
      break
    case 's':
      useGameManagerStore.sendInput({x: 0, y: -1})
      //x=0, y=-1
      break
    case 'd':
      useGameManagerStore.sendInput({x: 1, y: 0})
      //x=1, y=0
      break
    case 'q':
      useGameManagerStore.emitStartTrail();
      break
    case 'e':
      useGameManagerStore.emitStopTrail();
      break
  }
}
function onKeyUp(event: KeyboardEvent) {
  //Stop accelerating
  useGameManagerStore.sendInput({x: 0, y: 0})
}
</script>

<template>
  <div class="flex w-full h-full">
    <GameNav></GameNav>
    <GameSide></GameSide>
    <GameRenderer></GameRenderer>
  </div>

</template>
