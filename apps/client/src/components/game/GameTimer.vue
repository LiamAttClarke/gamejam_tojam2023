<script setup lang="ts">
import { ref, onMounted } from 'vue';
const timer = ref(3);
let intervalId = null;


onMounted(() => {
  intervalId = setInterval(() => {
    timer.value--;
    if (timer.value === 0)
      clearInterval(intervalId);
    }, 1000); // Decrement every second (1000 milliseconds)
});

</script>

<template>
  <div>
    <h1>Time Left: {{ timer }}</h1>
  </div>
</template>
