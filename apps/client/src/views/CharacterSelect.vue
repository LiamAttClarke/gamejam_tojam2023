<script setup lang="ts">
import CharacterTile from '../components/CharacterTile.vue'

import { ref } from 'vue'

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

var selected: Array<Boolean> = [false, false, false]

function selectCharacter(character: String) {
  console.log(character, selectedCharacter.value)
}
</script>

<template>
  <div class="container">
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
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0;
}
.container {
  display: block;
  margin: auto;
  padding: 100px;
  border: 1px solid black;
  align-items: center;
  height: 100%;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  margin: 20px;
}
</style>
