<script setup lang="ts">
import { ref } from 'vue';
const message = ref('Success');

</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
