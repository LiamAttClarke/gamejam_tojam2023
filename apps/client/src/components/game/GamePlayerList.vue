<script setup lang="ts">
import { ref } from 'vue';
const players = ref(['Player 1', 'Player 2', 'Player 3']);

</script>

<template>
  <div>
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player }}</li>
    </ul>
  </div>
</template>
