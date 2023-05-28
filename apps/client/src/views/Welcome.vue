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
<div class="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 background-animate">
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
