<script setup lang="ts">

</script>

<template>
  <button type="button">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  border: 1px solid black;
}
</style>