<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <section class="container">
      <div>
        <h1>404</h1>
        <h2>Perdu dans les</h2>
        <h3>RAYONS !</h3>
        <p>Désolés, on a cherché dans tous les coins, on n'a pas trouvé la bonne page.</p>
        <router-link :to="{ name: 'home' }">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />

          Retour à l'accueil
        </router-link>
      </div>
      <div class="img-bgd">
        <img src="../assets/img/notfound.webp" alt="" />
      </div>
    </section>
  </main>
</template>

<style scoped>
main > section {
  display: flex;
}

main > section > div {
  display: flex;
  flex-direction: column;
}

main > section > div:first-child {
  flex: 1;
}

.img-bgd {
  justify-content: flex-end;
  width: 380px;
}

h1 {
  color: var(--orange);
  font-weight: bold;
  font-size: 50px;
  margin-top: 100px;
  margin-bottom: 30px;
}

h2 {
  font-size: 45px;
  font-weight: bold;
}

h3 {
  font-size: 58px;
  color: white;
  text-shadow: 0 0 5px var(--orange);
  margin-bottom: 100px;
}

p {
  margin-bottom: 100px;
}
</style>
