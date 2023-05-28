<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'

const container = ref()
const game = ref()

const props = defineProps<{
  placeholder: string
}>()

const useGameManagerStore = inject('gameManager');

onMounted(() => {
  console.log(useGameManagerStore.game.scene)
  /*
  game.value = new Phaser.Game({
    type: Phaser.AUTO,
    parent: container.value,
    scene: SceneMap.Scene1,
    scale: {
      mode: Phaser.Scale.FIT
    }
  })
  */
})
</script>

<template>
  <div class="ml-64 w-full h-full">
    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
      <div class="game-renderer w-full h-full " ref="container"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
