<script setup lang="ts">
  import ButtonBasic from '../components/ButtonBasic.vue';
  import { inject, onMounted, ref } from 'vue';
  import Phaser from 'phaser'
  import * as SceneMap from "../scenes";
  const container = ref();
  const game = ref();
  const useGameManagerStore = inject('gameManager');
/*
  const gameManager = inject('gameManager');

  const isInitialized = ref(false);

  onMounted(async () => {
    // Wait for the store to be fully initialized
    await gameManagerStore.$reset(); // Replace with the actual initialization logic

    // Now the store is fully initialized
    isInitialized.value = true;
  });
*/
onMounted(() => {
  // Setup the phase game scenes
  useGameManagerStore.setGame(new Phaser.Game({
    type: Phaser.AUTO,
    parent: container.value,
    scene: [SceneMap.AudioScene, SceneMap.WelcomeScene, SceneMap.GameScene],
    scale: {
      mode: Phaser.Scale.NONE,
      autoCenter: Phaser.Scale.NONE,
      width: 800,
      height: 600,
    }
  }))
  console.log(useGameManagerStore.game.canvas);

})
/*
onUnmounted(() => {
  const oldParent = useGameManagerStore.game.canvas.parentNode;
  oldParent.removeChild(game.canvas);
})
*/
</script>

<template>
<div class="flex flex-col justify-center items-center w-full h-screen background">
    <div class="flex flex-col items-center z-10">
      <p class="text-lg font-bold tracking-tight text-indigo-900">Pooping in public made easier</p>
      <h1 class="uppercase text-6xl font-bold tracking-tight text-black">Game of Poops</h1>
    </div>
    <div class="absolute inset-0 fixed	" ref="container"></div>
    <router-link to="/lobby" class="z-10">
      <ButtonBasic class="mt-10 px-36 z-10">Get Started!</ButtonBasic>
    </router-link>
  </div>


</template>

<style scoped lang="css">
.background {
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
