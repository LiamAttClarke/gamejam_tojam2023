<script setup lang="ts">
  import ButtonBasic from '../components/ButtonBasic.vue';
</script>

<template>
  <div class="flex flex-col justify-around items-center w-full h-screen bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 background-animate">
   <div class="flex flex-col items-center"> 
    <p class="text-lg font-bold tracking-tight text-indigo-900">Pooping in public made easier</p>
    <h1 class=" uppercase text-6xl font-bold tracking-tight text-black"> Game of Poops </h1>
   </div>
    <router-link
    to="/lobby"
    >
    <ButtonBasic class="px-36">Get Started!</ButtonBasic>
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