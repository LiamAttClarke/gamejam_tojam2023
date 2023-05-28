<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameNav from '../components/game/GameNav.vue';
import GameSide from '../components/game/GameSide.vue';
import GameRenderer from '../components/GameRenderer.vue';
import GamePlayerList from '../components/game/GamePlayerList.vue';
import GameTimer from '../components/game/GameTimer.vue';
import GameInput from '../components/game/GameInput.vue';
import ButtonBasic from '../components/ButtonBasic.vue';

function addPlayer(){

}
</script>

<template>
  <div class="flex w-full h-full">
    <GameNav></GameNav>
    <GameSide></GameSide>
    <GameRenderer></GameRenderer>
  </div>

</template>
