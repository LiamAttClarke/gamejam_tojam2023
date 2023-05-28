<template>
  <div class="flex flex-col items-center pt-12">
    <h1 class="uppercase text-6xl font-bold tracking-tight text-black">Poop Deck</h1>
    <div class="flex flex-col items-center pt-10">
        <h2 class="text-2xl font-bold tracking-tight text-black">Start Some Shit</h2>
        <ButtonBasic class="mt-4" @click="createRoom">Create New Game</ButtonBasic>
    </div>
    <div class="flex flex-col items-center pt-12">
      <h2 class="text-2xl font-bold tracking-tight text-black">Join a Shitty Gang</h2>
      <div class="pt-4">
        <input class="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" type="text" id="roomInput" v-model="roomIdInput" placeholder="Enter Room ID">
        <ButtonBasic class="ml-4" @click="joinRoom">Join Game</ButtonBasic>

      </div>
    </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, onUnmounted } from 'vue'
import ButtonBasic from '../components/ButtonBasic.vue';
import { io } from 'socket.io-client';
//import { useGameManagerStore } from '../stores/gameManager';
const roomIdInput = ref('');
const socket = ref();

const useGameManagerStore = inject('gameManager')

function connectSocket(){}

function createRoom() {
  console.log('create room');
  // Handle join event response
  socket.value.emit('create_room', (response) => {
    // Handle the response from the server
    console.log(response);
  });
}
function joinRoom() {
  if (roomIdInput.value!== '') {
    console.log(roomIdInput.value);
    //gameManagerStore.joinRoom(roomIdInput.value);
  }else{
    console.log('no room id');
  }

  if(socket.value){
    socket.value = io('http://localhost:3000');
  }

  socket.value.emit('join_room', roomIdInput.value, (response) => {
    // Handle the response from the server
    console.log(response);
  });
}

onMounted(() => {
  // Connect to the socket.io server
  socket.value = io('http://localhost:3000');

  socket.value.on('broadcast_room_state',(response) => {
    // Handle the response from the server
    console.log(response);
  });
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
    socket.value = null;
  }
});
</script>
