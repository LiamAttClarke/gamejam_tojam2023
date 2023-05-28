<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameRenderer from './GameRenderer.vue';
import GamePlayerList from './game/GamePlayerList.vue';
import GameTimer from './game/GameTimer.vue';
import GameInput from './game/GameInput.vue';
import ButtonBasic from './ButtonBasic.vue';

function addPlayer(){

}
</script>

<template>
  <div class="container mx-auto center">
    <GameTimer class="border w-full"></GameTimer>
    <div class="flex flex-row">
      <div>
        <GamePlayerList class="border basis-1/4"></GamePlayerList>
        <GameInput class=" border w-full"></GameInput>
      </div>
      <GameRenderer class="w-full h-full"></GameRenderer>
      
    </div>
  </div>
  
</template>
