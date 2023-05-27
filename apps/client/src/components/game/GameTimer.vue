<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GameManager } from '../../GameManager';
const gameManager = GameManager.getInstance();

</script>

<template>
  <div>
    <h1>Time Left: {{ gameManager.timer }}</h1>
  </div>
</template>
