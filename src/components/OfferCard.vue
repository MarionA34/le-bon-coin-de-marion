<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { formatPrice } from '../utils/formatPrice'

const props = defineProps({
  offerInfos: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const formatDate = computed(() => {
  // -- Syntaxe qui chaîne toutes les méthodes
  return props.offerInfos.updatedAt.split('T')[0].split('-').reverse().join('/')

  // -- Version non chaînée pour comprendre le déroulé
  // const creationDateUTCFormat = props.offerInfos.updatedAt
  // console.log('OfferCard - 1 - creationDateUTCFormat>>>', creationDateUTCFormat)
  // const dateSimpleFormat = creationDateUTCFormat.split('T')[0]
  // console.log('OfferCard - 2 - dateSimpleFormat>>>', dateSimpleFormat)
  // const dateSimpleFormatArray = dateSimpleFormat.split('-')
  // console.log('OfferCard - 3 - dateSimpleFormatArray>>>', dateSimpleFormatArray)
  // const dateCorrectOrderArray = dateSimpleFormatArray.reverse()
  // console.log('OfferCard - 4 - dateCorrectOrderArray>>>', dateCorrectOrderArray)
  // const stringDate = dateCorrectOrderArray.join('/')
  // console.log('OfferCard - 5 - stringDate>>>', stringDate)
  // return stringDate
})

const formatedPrice = computed(() => {
  const price = props.offerInfos.price

  /*
   On retourne la valeur de retour de la fonction nommée 'formatPrice' qui est déclarée dans le dossier 'utils'. Ainsi nous pouvons la réutiliser dans d'autres composants tels que 'OfferView.vue'. Ceci est plus pratique, contrairement à la propriété calculée 'formatDate' que nous avons réécrite dans le composant 'OfferView.vue'.
   */
  return formatPrice(price)
})
</script>

<template>
  <!-- Navigation vers la route portant le nom 'offer' en lui transmettant un params nommé 'id' -->
  <RouterLink :to="{ name: 'offer', params: { id: id } }" class="offerCard">
    <div class="firstPart">
      <div class="owner">
        <img
          :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
          alt=""
          v-if="offerInfos.owner.data.attributes.avatar.data"
        />
        <p>{{ offerInfos.owner.data.attributes.username }}</p>
      </div>

      <img :src="offerInfos.pictures.data[0].attributes.url" :alt="offerInfos.title" />

      <p>{{ offerInfos.title }}</p>

      <p>{{ formatedPrice }} €</p>
    </div>

    <div class="secondPart">
      <div>
        <p>{{ formatDate }}</p>
      </div>

      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </RouterLink>
</template>

<style scoped>
.offerCard {
  height: 380px;
  /* Calcul de la largeur => 100% de la largeur du parent, moins l'espace entre chaque 'Card' (5 cartes donc 4 espaces => 15px x 4). Le tout divisé par le nombre de carte souhaité sur la ligne */
  width: calc((100% - 60px) / 5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
}

/* -- FIRST PART ------------ */
.firstPart > img {
  height: 240px;
  width: 100%;
  border-radius: 10px;
  margin: 7px 0 5px 0;
}
.firstPart p {
  font-weight: bold;
  line-height: 20px;
}
.firstPart p:last-child {
  margin-top: 5px;
}
.owner {
  display: flex;
  align-items: center;
  gap: 5px;
}
.owner p {
  font-size: 14px;
}

/* -- SECOND PART ------------ */
.secondPart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.secondPart p {
  color: var(--grey);
  font-size: 12px;
  line-height: 16px;
}
svg {
  font-size: 20px;
  color: var(--grey);
}
</style>
