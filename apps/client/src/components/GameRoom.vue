<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameRenderer from './GameRenderer.vue';
import GamePlayerList from './game/GamePlayerList.vue';
import GameTimer from './game/GameTimer.vue';
import GameInput from './game/GameInput.vue';
</script>

<template>
  <div>
    <GamePlayerList></GamePlayerList>
    <GameTimer></GameTimer>

    <GameInput></GameInput>
    <GameRenderer></GameRenderer>
  </div>
</template>
