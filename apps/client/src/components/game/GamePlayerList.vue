<script setup lang="ts">
import { ref, inject } from 'vue';
import { GameManager } from '../../GameManager';
import { useGameManagerStore } from './stores/gameManager';
const gameManager = GameManager.getInstance();
const useGameManagerStore = inject('gameManager');
</script>

<template>
  <div>
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in useGameManagerStore.players" :key="index">{{ player }}</li>
    </ul>
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in gameManager.trails" :key="index">{{ player }}</li>
    </ul>
  </div>
</template>
