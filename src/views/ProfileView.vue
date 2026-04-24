<script setup>
import { onMounted, inject, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import BtnPublishOffer from '@/components/BtnPublishOffer.vue'

const router = useRouter()
const GlobalStore = inject('GlobalStore')
const userInfos = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=avatar&populate[1]=offers&populate[2]=offers.pictures',
      { headers: { Authorization: `Bearer ${GlobalStore.userInfos.value.token}` } }
    )

    console.log('toutes les infos=>>>', data)
    userInfos.value = data
  } catch (error) {
    console.log(error.message)
  }
})

const totalOffers = computed(() => {
  const numOfOffers = userInfos.value.offers.length

  if (numOfOffers === 1) {
    return '1 annonce'
  } else {
    return `${numOfOffers} annonces`
  }
})

const deleteOffer = async (id) => {
  try {
    const { data } = await axios.delete(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${id}',
      { headers: { Autorization: `Bearer ${GlobalStore.userInfos.value.token}` } }
    )
    router.go()
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <main>
    <p v-if="!userInfos" class="container">Chargement en cours...</p>
    <div v-else class="container">
      <div class="userInfos">
        <img v-if="userInfos.avatar" :src="userInfos.avatar.url" />
        <div v-else class="firstLetter">
          <p>{{ userInfos.username[0] }}</p>
        </div>

        <div>
          <h1>{{ userInfos.username }}</h1>
          <p>{{ userInfos.email }}</p>
        </div>
      </div>

      <div v-if="userInfos.offers.length === 0" class="noOffer">
        <h3>Vous n'avez aucune annonce en ligne.</h3>
        <BtnPublishOffer />
      </div>
      <div v-else>
        <h3>{{ totalOffers }}</h3>

        <div class="offersBloc">
          <div v-for="offer in userInfos.offers" :key="offer.id">
            <img :src="offer.pictures[0].url" alt="" class="offerImg" />
            <h2>{{ offer.title }}</h2>
            <p>{{ offer.price }} €</p>
            <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding-top: 40px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

h3 {
  font-weight: bold;
  font-size: 18px;
}

.userInfos {
  border: 1px solid var(--grey-med);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 40px;
}

.firstLetter {
  background-color: var(--blue-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.offersBloc {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  border: 1px solid var(--grey-med);
  border-radius: 10px;
}

.offersBloc > div {
  display: flex;
  /* border: 1px solid var(--grey-med); */
  box-shadow: 0 0 7px var(--grey-med);
  border-radius: 10px;
  padding: 15px;
  height: 150px;
  align-items: center;
}

.offersBloc img {
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
}

.offersBloc h2 {
  flex: 2;
  font-weight: bold;
  font-size: 22px;
}
.offersBloc p {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: var(--brown);
}

svg {
  color: var(--orange);
  cursor: pointer;
}

.noOffer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
