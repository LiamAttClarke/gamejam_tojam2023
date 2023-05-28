<script setup lang="ts">
import type { PropType } from 'vue'
import Character from '../constants'
// cosnt props:{
//   character:String as PropType<Character>,
// }

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  character: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="tile">
    <div class="text-center pb-1">{{ username }}</div>
    <img :src="`/assets/avatars/${character}.png`" alt="character" width="60" height="60" />
  </div>
</template>

<style scoped>
.tile {
  padding: 10px;
  border-radius: 16px;
  border: 1px solid black;
  width: fit-content;
}
</style>
