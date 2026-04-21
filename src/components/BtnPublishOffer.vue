<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <button>
    <RouterLink :to="{ name: 'publish' }">
      <font-awesome-icon :icon="['far', 'plus-square']" />

      <span>Déposer une annonce</span></RouterLink
    >
  </button>
</template>

<style scoped>
button {
  background-color: var(--orange);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
span {
  margin-left: 10px;
}
</style>
