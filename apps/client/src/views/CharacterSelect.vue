<script setup lang="ts">
import CharacterTile from '../components/CharacterTile.vue';
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
</script>

<template>
  <div class="container">
    <h1>Select your pooper!</h1>
    <div class="button-container">
    <CharacterTile class="btn">
      <img src="../assets/fox-pixel.png" alt="test" width="100" height="100">
    </CharacterTile>
    <CharacterTile class="btn">
      <img src="../assets/cat-pixel.png" alt="test" width="100" height="100">
    </CharacterTile>
    <CharacterTile class="btn">
      <img src="../assets/dog-pixel.png" alt="test" width="100" height="100">
    </CharacterTile>
  </div>
  <button @click="addPlayer">Add Player</button>
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
