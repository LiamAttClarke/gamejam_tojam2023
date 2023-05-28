<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue'

const container = ref()

const useGameManagerStore = inject('gameManager');

onMounted(() => {
  console.log(useGameManagerStore.game.scene)
  // init the players in to phaser
  //useGameManagerStore.game.setPlayers(useGameManagerStore.players);
  const oldParent = useGameManagerStore.game.canvas.parentNode;
  oldParent.removeChild(useGameManagerStore.game.canvas);
  container.value.appendChild(useGameManagerStore.game.canvas);
  //useGameManagerStore.game.parent = container.value;
  //useGameManagerStore.game.boot();
  //console.log(container.value)

  setTimeout(() => {
    //useGameManagerStore.game.canvas.resize(800, 600);
    useGameManagerStore.game.scene.start('game');
  }, 100); // Adjust the delay as needed (e.g., 100 milliseconds)

})
/*
// we probably can change to to just watch the players
watch(useGameManagerStore, (newValue) => {
  console.log(newValue.players);
});*/
</script>

<template>
  <div class="ml-64 w-full h-full">
    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
      <div class="game-renderer w-full h-full " ref="container">
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
