<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameRenderer from './GameRenderer.vue';
import GamePlayerList from './game/GamePlayerList.vue';
import GameTimer from './game/GameTimer.vue';
import GameInput from './game/GameInput.vue';

function addPlayer(){

}
</script>

<template>
  <div class="container mx-auto center">
    <div class="flex flex-row">

      <GamePlayerList class="basis-1/4"></GamePlayerList>
      <GameTimer class="w-full"></GameTimer>

      <GameInput class="w-full"></GameInput>
      <GameRenderer class="w-full"></GameRenderer>
    </div>
  </div>
</template>
