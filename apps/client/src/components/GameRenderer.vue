<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Phaser from 'phaser'
import * as SceneMap from '../scenes'

const container = ref()
const game = ref()

const props = defineProps<{
  placeholder: string
}>()

onMounted(() => {
  game.value = new Phaser.Game({
    type: Phaser.AUTO,
    parent: container.value,
    scene: SceneMap.Scene1,
    scale: {
      mode: Phaser.Scale.FIT
    }
  })
})
</script>

<template>
  <div class="p-4 ml-64">
    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
      <div class="game-renderer" ref="container"></div>
    </div>
  </div>
</template>

<style scoped>
.phaser-renderer {
  width: 100%;
  height: 100%;
}
</style>
