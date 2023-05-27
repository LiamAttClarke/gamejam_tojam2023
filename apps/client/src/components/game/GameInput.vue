<script setup lang="ts">
import { ref, onMounted } from 'vue';

const players = ref([]);
const newPlayer = ref('');

function addPlayer() {
  if (newPlayer.value.trim() !== '') {
    players.value.push(newPlayer.value);
    newPlayer.value = '';
  }
}

onMounted(() => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addPlayer();
    }
  };

  document.addEventListener('keydown', handleKeyPress);

  // Cleanup the event listener when the component is unmounted
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
});
</script>

<template>
  <div>
    <h2>Guesses</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player }}</li>
    </ul>
    <input v-model="newPlayer" placeholder="Enter a guess" />
  </div>
</template>
