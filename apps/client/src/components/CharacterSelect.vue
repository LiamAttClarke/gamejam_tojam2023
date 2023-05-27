<script setup lang="ts">
import RoundButton from './RoundButton.vue';
// see other players and their selections
// see available clickable characters
// if host, start game button
</script>

<template>
  <div class="container">
    <h1>Select your pooper!</h1>
    <div class="button-container">
    <RoundButton>
      <img src="../assets/fox-pixel.png" alt="test" width="100" height="100">
    </RoundButton>
    <RoundButton>
      <img src="../assets/cat-pixel.png" alt="test" width="100" height="100">
    </RoundButton>
    <RoundButton>
      <img src="../assets/dog-pixel.png" alt="test" width="100" height="100">
    </RoundButton>
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
  justify-content: space-between;
}
</style>