<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Phaser from 'phaser'
import * as SceneMap from "../scenes";

const container = ref();
const game = ref();

const props = defineProps<{
  placeholder: string
}>()

onMounted(() => {
  game.value = new Phaser.Game({
    type: Phaser.AUTO,
    parent: container.value,
    scene: SceneMap.Scene1,
    scale: {
      mode: Phaser.Scale.FIT,
    }
  })
})
</script>

<template>
  <div class="game-renderer" ref="container"></div>
</template>

<style scoped>
.phaser-renderer {
  width: 100%;
  height: 100%;
}
</style>
