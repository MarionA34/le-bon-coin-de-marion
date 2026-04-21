<script setup>
import { RouterLink } from 'vue-router'
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BtnPublishOffer from './BtnPublishOffer.vue'

const GlobalStore = inject('GlobalStore')

const route = useRoute()
const router = useRouter()

const searchText = ref('')

const disconnection = () => {
  // Suppression du cookie
  $cookies.remove('userInfos')

  GlobalStore.changeUserInfos({
    username: '',
    token: ''
  })

  router.push({ name: 'home' })
}

const handleSearch = () => {
  // Copie des query existantes pour pouvoir les modifier
  const queries = { ...route.query }

  // SI la valeur existe, elle est ajoutée aux query, SINON la clé est retirée des query
  if (searchText.value) {
    queries.title = searchText.value
  } else {
    delete queries.title
  }

  // Pour toujours commencer à la première page de la recherche
  queries.page = 1

  // On navigue vers la route actuelle avec les query mises à jour
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <header>
    <div class="container">
      <div class="topBloc">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/img/logo.svg" alt="" />
        </RouterLink>

        <div class="middlePart">
          <BtnPublishOffer />

          <!-- Transformation de la 'div' en formulaire -->
          <form @submit.prevent="handleSearch">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Rechercher sur leboncoin"
              v-model="searchText"
            />

            <!-- Ajout d'un bouton pour la soumission du formulaire -->
            <button>
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
          </form>
        </div>

        <div class="rightPart">
          <div v-if="GlobalStore.userInfos.value.username">
            <div class="connection">
              <font-awesome-icon :icon="['far', 'user']" />
              <p>{{ GlobalStore.userInfos.value.username }}</p>
            </div>

            <div>
              <font-awesome-icon
                :icon="['fas', 'arrow-right-from-bracket']"
                @click="disconnection"
                class="disconnection"
              />
            </div>
          </div>

          <RouterLink :to="{ name: 'login' }" class="connection" v-else>
            <font-awesome-icon :icon="['far', 'user']" />

            <p>Se connecter</p>
          </RouterLink>
        </div>
      </div>

      <div class="bottomBloc">
        <span>Immobilier</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Véhicules</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Locations de vacances</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Emploi</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Mode</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Maison & Jardin</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Famille</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Electronique</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Loisirs</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5;
  height: var(--header-height);
}
.container {
  padding: 10px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  width: 140px;
}
/* -- TOP BLOC ---------------- */
.topBloc {
  display: flex;
  justify-content: space-between;
}
.topBloc p {
  font-size: 12px;
}
.middlePart {
  display: flex;
  align-items: center;
  gap: 20px;
}
form {
  display: flex;
  background-color: var(--grey-light);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}

.middlePart input {
  background-color: inherit;
  border: none;
  flex: 1;
  outline: none;
}
.middlePart svg {
  background-color: var(--orange);
  padding: 8px;
  box-sizing: content-box;
  border-radius: 7px;
}
.middlePart input::placeholder {
  color: var(--grey);
  font-size: 16px;
}
form button {
  display: flex;
  align-items: center;
  border: none;
  background-color: #ffffff00;
  padding: 0;
}
.rightPart > div {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 100%;
  font-size: 16px;
}
.disconnection {
  cursor: pointer;
  color: var(--grey);
}
.connection {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: none;
  background-color: #ffffff00;
}
/* -- BOTTOM BLOC ---------------- */
.bottomBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.bottomBloc svg {
  color: var(--black);
  font-size: 2px;
}
</style>
