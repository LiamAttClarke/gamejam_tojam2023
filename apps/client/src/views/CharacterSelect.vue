<script setup lang="ts">
import CharacterTile from '../components/CharacterTile.vue'
import PlayerTile from '../components/PlayerTile.vue'
import { CharacterKind } from '../../../shared/types/Character'
import { useRouter } from 'vue-router'
import ButtonBasic from '../components/ButtonBasic.vue'
const router = useRouter()

import { ref, inject, toRef } from 'vue'
import type { Player } from 'shared/types/Player'

const selectedCharacter = ref()
/*
import RoundButton from './RoundButton.vue';
import {GameManager} from '../GameManager';
const gameManager = GameManager.getInstance();
// see other players and their selections
// see available clickable characters
// if host, start game button
function addPlayer(){

  const player: Player = {
  id: crypto.randomUUID(),
  name: "Liam",
  position: [Math.random()*200, Math.random()*200]
};
  gameManager.addPlayer(player);
}
*/

const useGameManagerStore = inject('gameManager')

//const players = toRef(useGameManagerStore, 'players');
//console.log(players);

const joinCode: Number = ref(useGameManagerStore.roomId)

// Debounce function to delay action execution
let debounceTimer: ReturnType<typeof setTimeout>

const handleInputChange = (event: InputEvent) => {
  // Clear the previous debounce timer
  clearTimeout(debounceTimer)

  // Set a new debounce timer
  debounceTimer = setTimeout(() => {
    const { value } = event.target as HTMLInputElement
    if (value.length < 1) return
    console.log('Input value changed:', (event.target as HTMLInputElement).value)
    useGameManagerStore.emitNameChange(value)
  }, 1000) // 1000 milliseconds = 1 second
}

function selectCharacter(character: CharacterKind) {
  console.log(character, selectedCharacter.value)
  useGameManagerStore.emitCharacterChange(character)
}

function startGame() {
  //useGameManagerStore.emitStartGame();
  console.log('start game')
  //We should really wait for the server to respond, but for now we'll just leave the page
  setTimeout(() => {
    router.push('/room')
  }, 3000)
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="sidebar col-span-3">
      <h2 class="text-2xl font-bold tracking-tight text-black">
        Join Code: <span class="uppercase">{{ joinCode }}</span>
      </h2>
    </div>

    <div class="center-container col-span-6 px-4">
      <h1 class="uppercase text-3xl font-bold tracking-tight text-black">Select your pooper!</h1>
      <input
        type="text"
        class="w-full border border-gray-300 rounded-md"
        @input="handleInputChange"
      />
      <div class="selection-container">
        <CharacterTile
          class="btn"
          :character="CharacterKind.Goat"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
        <CharacterTile
          class="btn"
          :character="CharacterKind.Porcupine"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
        <CharacterTile
          class="btn"
          :character="CharacterKind.Hedgehog"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
        <CharacterTile
          class="btn"
          :character="CharacterKind.Armadillo"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
      </div>
      <div class="flex justify-center items-center mt-10">
        <ButtonBasic class="px-36 mx-auto" @click="startGame">Start Game</ButtonBasic>
      </div>
    </div>

    <div class="players col-span-3">
      <h2 class="text-center text-2xl font-bold tracking-tight text-black">Other players</h2>
      <PlayerTile
        v-for="(player, index) in useGameManagerStore.players"
        :key="index"
        class="my-3 mx-auto"
        :username="player[1].name"
        :character="player[1].character"
      ></PlayerTile>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0;
}
.center-container {
  margin: auto;
  align-items: center;
  height: 100%;
}
.selection-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  margin: 10px;
}

.sidebar {
}

.players {
}
</style>
