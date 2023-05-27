<script setup lang="ts">
import { ref } from 'vue';
import { GameManager } from '../../GameManager';
const gameManager = GameManager.getInstance();
</script>

<template>
  <div>
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in gameManager.players" :key="index">{{ player }}</li>
    </ul>
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in gameManager.trails" :key="index">{{ player }}</li>
    </ul>
  </div>
</template>
