<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonBasic from './ButtonBasic.vue'
import { ref } from 'vue'
const router = useRouter()

var inputValue = ref('')

// Debounce function to delay action execution
let debounceTimer: ReturnType<typeof setTimeout>

const submitGuess = () => {
  console.log(inputValue.value)
  //   // Clear the previous debounce timer
  //   clearTimeout(debounceTimer)

  //   // Set a new debounce timer
  //   debounceTimer = setTimeout(() => {
  //     const { value } = event.target as HTMLInputElement
  //     if (value.length < 1) return
  //     console.log('Input value changed:', (event.target as HTMLInputElement).value)
  //     // useGameManagerStore.emitNameChange(value)
  //   }, 1000) // 1000 milliseconds = 1 second
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-800 w-full p-3">
    <input
      type="text"
      placeholder="Make a guess"
      v-model="inputValue"
      class="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 uppercase"
      @keyup.enter="submitGuess"
    />
    <ButtonBasic class="ml-3 mx-auto" @click="submitGuess">Submit</ButtonBasic>
  </div>
</template>

<style scoped></style>
