<template>
  <div>
    <h1 class="text-lg">Game Lobby</h1>

    <button>Create New Game</button>
    <input type="text" id="roomInput" v-model:="roomId" placeholder="Enter Room ID">
    <button>Join  Game</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const roomId = ref('');
function createGame() {

}
function joinGame() {
  if (roomId.value!== '') {
    console.log(roomId.value);
  }
}
</script>
