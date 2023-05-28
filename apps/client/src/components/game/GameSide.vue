<script setup lang="ts">
import { inject } from 'vue';

const useGameManagerStore = inject('gameManager');

</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="(player, index) in useGameManagerStore.players" :key="index">
          <div
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
          >
            <span class="ml-3">{{ player[1].name }}</span>
        </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
