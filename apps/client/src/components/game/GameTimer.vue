<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { GameManager } from '../../GameManager';

const gameManager = GameManager.getInstance();
const useGameManagerStore = inject('gameManager')

onMounted(() => {
console.log(useGameManagerStore.timer)
});
</script>

<template>
  <div>
    <h1>Time Left: {{ useGameManagerStore.timer }}</h1>
  </div>
</template>
