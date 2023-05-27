<template>
  <div class="flex flex-col items-center pt-12">
    <h1 class="uppercase text-6xl font-bold tracking-tight text-black">Poop Deck</h1>
    <div class="flex flex-col items-center pt-10">
        <h2 class="text-2xl font-bold tracking-tight text-black">Start Some Shit</h2>
        <ButtonBasic class="mt-4">Create New Game</ButtonBasic>
    </div>
    <div class="flex flex-col items-center pt-12">
      <h2 class="text-2xl font-bold tracking-tight text-black">Join a Shitty Gang</h2>
      <div class="pt-4">
        <input class="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" type="text" id="roomInput" v-model="roomId" placeholder="Enter Room ID">
        <ButtonBasic class="ml-4">Join Game</ButtonBasic>
  
      </div>
    </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonBasic from '../components/ButtonBasic.vue';
const roomId = ref('');
function createGame() {

}
function joinGame() {
  if (roomId.value!== '') {
    console.log(roomId.value);
  }
}
</script>
