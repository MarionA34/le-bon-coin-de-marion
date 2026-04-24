<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <div>
        <h1>404</h1>
        <p>Perdu dans les</p>
        <p class="orangeText">RAYONS !</p>
      </div>

      <p>Désolés, on a cherché dans tous les coins, on n'a pas trouvé la bonne page.</p>

      <router-link :to="{ name: 'home' }">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />

        Retour à l'accueil
      </router-link>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url('../assets/img/notfound.webp');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
}

h1 {
  color: var(--orange);
  font-weight: bold;
  font-size: 48px;
  margin-bottom: 20px;
}

h1 + p {
  font-size: 48px;
  font-weight: bold;
}

.orangeText {
  font-size: 62px;
  color: white;
  text-shadow: 0 0 4px var(--orange);
}
</style>
