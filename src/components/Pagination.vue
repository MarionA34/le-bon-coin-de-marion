<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps(['pagination'])

const changePage = (num) => {
  // Copie des query existantes pour pouvoir les modifier
  const queries = { ...route.query }

  queries.page = num

  // On navigue vers la route actuelle avec les query mises à jour
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <div class="pagination">
    <!-- Affichage de l'icône "previous" actif à partir de la deuxième page-->
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      @click="changePage(pagination.page - 1)"
      v-if="pagination.page > 1"
    />
    <!-- Affichage de l'icône "previous" inactif si c'est la première page -->
    <font-awesome-icon :icon="['fas', 'angle-left']" class="disactivated" v-else />

    <div>
      <p
        v-for="num in pagination.pageCount"
        :class="{
          selected: num === pagination.page
        }"
        @click="changePage(num)"
      >
        {{ num }}
      </p>
    </div>

    <!-- Affichage de l'icône "next" actif jusqu'à l'avant dernière page-->
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      @click="changePage(pagination.page + 1)"
      v-if="pagination.page < pagination.pageCount"
    />
    <!-- Affichage de l'icône "next" inactif si c'est la dernière page -->
    <font-awesome-icon :icon="['fas', 'angle-right']" class="disactivated" v-else />
  </div>
</template>

<style scoped>
div {
  display: flex;
}
.pagination {
  gap: 25px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.pagination > div {
  align-items: center;
}
p {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.selected {
  color: white;
  background-color: var(--black);
  border-radius: 3px;
}
svg {
  cursor: pointer;
}
.disactivated {
  color: var(--grey-med);
  cursor: default;
}
</style>
