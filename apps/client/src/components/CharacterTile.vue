<script setup lang="ts">
import type { PropType } from 'vue'
import Character from '../constants'
// cosnt props:{
//   character:String as PropType<Character>,
// }

const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  character: {
    type: String,
    required: true
  }
})
</script>

<template>
  <label class="wrapper">
    <input
      class="checkbox"
      type="radio"
      :checked="selected"
      :value="character"
      @change="$emit('change', character)"
      name="char"
    />
    <div class="tile">
      <img :src="`/assets/avatars/${character}.png`" alt="character" width="100" height="100" />
    </div>
  </label>
</template>

<style scoped>
.tile {
  padding: 10px;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid black;
}

label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.wrapper input:checked ~ .tile {
  border: 5px solid brown;
}
</style>
