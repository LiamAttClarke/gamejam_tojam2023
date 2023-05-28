<script setup lang="ts">
import CharacterTile from '../components/CharacterTile.vue'
import PlayerTile from '../components/PlayerTile.vue'

import { ref, inject } from 'vue'

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

const useGameManagerStore = inject('gameManagerStore');

const players: Array<Object> = [
  {
    username: 'Artemy',
    character: 'fox'
  },
  {
    username: 'Test',
    character: 'cat'
  },
  {
    username: 'Spy',
    character: 'unknown'
  }
]

const joinCode: Number = useGameManagerStore.joinCode;

function selectCharacter(character: String) {
  console.log(character, selectedCharacter.value)
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="sidebar col-span-3">
      <h2 class="text-2xl font-bold tracking-tight text-black">Join Code: {{ joinCode }}</h2>
    </div>

    <div class="center-container col-span-6 px-4">
      <h1 class="uppercase text-3xl font-bold tracking-tight text-black">Select your pooper!</h1>
      <div class="button-container">
        <CharacterTile
          class="btn"
          character="fox"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
        <CharacterTile
          class="btn"
          character="dog"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
        <CharacterTile
          class="btn"
          character="cat"
          @change="selectCharacter"
          v-model="selectedCharacter"
        >
        </CharacterTile>
      </div>
    </div>

    <div class="players col-span-3">
      <h2 class="text-center text-2xl font-bold tracking-tight text-black">Other players</h2>
      <PlayerTile
        v-for="player in players"
        class="my-3 mx-auto"
        :username="player.username"
        :character="player.character"
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
.button-container {
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
