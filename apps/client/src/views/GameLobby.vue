<template>
  <div class="w-full h-screen bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 background-animate">

  <div class="flex flex-col items-center pt-12">
    <h1 class="uppercase text-6xl font-bold tracking-tight text-black">Poop Deck</h1>
    <div class="flex flex-col items-center pt-10">
        <h2 class="text-2xl font-bold tracking-tight text-black">Start Some Shit</h2>
        <ButtonBasic class="mt-4" :class="{'bg-blue-200 hover:bg-blue-200' : loadingJoin || loadingCreate }" :disabled="loadingCreate || loadingJoin" @click="createRoom"><div v-if="loadingCreate">Loading</div><div v-else>Create New Game</div></ButtonBasic>
    </div>
    <div class="flex flex-col items-center pt-12">
      <h2 class="text-2xl font-bold tracking-tight text-black">Join a Shitty Gang</h2>
      <div class="pt-4">
        <input class="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 uppercase" type="text" id="roomInput" v-model="roomIdInput" placeholder="Enter Room ID">
        <ButtonBasic class="ml-4" :class="{'bg-blue-200 hover:bg-blue-200' : loadingJoin || loadingCreate }" :disabled="loadingCreate || loadingJoin" @click="joinRoom"><div v-if="loadingJoin">Loading</div><div v-else>Join Game</div></ButtonBasic>

      </div>
    </div>
   </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, onUnmounted } from 'vue'
import ButtonBasic from '../components/ButtonBasic.vue';
import { io } from 'socket.io-client';
import { useRouter } from 'vue-router';
//import socket from '../sockets';
//import { useGameManagerStore } from '../stores/gameManager';
const roomIdInput = ref('');
const socket = ref();
const router = useRouter();

const useGameManagerStore = inject('gameManager')
let loadingCreate = ref(false);
let loadingJoin = ref(false);

function createRoom() {
  console.log('create room');
  // Handle join event response
  socket.value.emit('create_room', (response) => {
    // Handle the response from the server
    console.log(response);

  });
  loadingCreate.value = true;
  //We should really wait for the server to respond, but for now we'll just leave the page
  
  setTimeout(() => {
    router.push('/character');
  }, 3000);
}
function joinRoom() {
  if (roomIdInput.value!== '') {
    console.log(roomIdInput.value);
    //gameManagerStore.joinRoom(roomIdInput.value);
  }else{
    console.log('no room id');
  }
  loadingJoin.value = true;
  roomIdInput.value = roomIdInput.value.toLowerCase();

  socket.value.emit('join_room', roomIdInput.value, (response) => {
    // Handle the response from the server
    console.log(response);
  });
  //We should really wait for the server to respond, but for now we'll just leave the page
  setTimeout(() => {
    router.push('/character');
  }, 3000);
}

onMounted(() => {
  // Connect to the socket.io server
  socket.value = io('http://localhost:3000');

  useGameManagerStore.setSocket(socket.value);

  socket.value.on('broadcast_room_state',(response) => {
    const data = JSON.parse(response);
    // Handle the response from the server
    //console.log(JSON.parse(response));
    useGameManagerStore.setPlayers(data.players);
    useGameManagerStore.setRoomId(data.id);
  });

  useGameManagerStore.game.scene.remove('welcome');
  useGameManagerStore.game.scene.remove('audio');
});
//unload the welcome scene

/*
onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
    socket.value = null;
  }
});
*/
</script>

<style scoped lang="css">
.background-animate {
    background-size: 400%;

    -webkit-animation: AnimationName 3s ease infinite;
    -moz-animation: AnimationName 5s ease infinite;
    animation: AnimationName 5s ease infinite;
  }

  @keyframes AnimationName {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>