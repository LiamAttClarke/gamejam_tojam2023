<script setup lang="ts">
import GameTimer from './GameTimer.vue'

</script>

<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 ml-64">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <GameTimer class="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 dark:text-white dark:border-gray-700"/>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 dark:text-white dark:border-gray-700">You are the Guesser</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
</template>
