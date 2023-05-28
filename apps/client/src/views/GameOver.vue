<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonBasic from '../components/ButtonBasic.vue'
const router = useRouter()
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen wrapper">
    <div class="flex flex-col items-center z-10">
      <h1 class="uppercase text-6xl font-bold tracking-tight text-black">Game Over</h1>
    </div>
    <!-- <div class="absolute inset-0 fixed" ref="container"></div> -->
    <router-link to="/lobby" class="z-10">
      <ButtonBasic class="mt-10 px-36 z-10">Try Again?</ButtonBasic>
    </router-link>
  </div>
</template>

<style scoped lang="css">
.wrapper {
  background-image: url('/assets/background.jpg');
}
</style>
