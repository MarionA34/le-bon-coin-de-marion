<script setup>
import { ref, computed } from 'vue'
import { onMounted, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP'
)

const props = defineProps({
  id: String
})

const isLoading = ref(true)

const offerInfos = ref(null)

const option = ref('faceToFace')
const cardElement = ref(null)
const isProcessing = ref(false)

const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const errorMessage = ref('')

onBeforeMount(async () => {
  const stripe = await stripePromise

  const elements = stripe.elements()

  cardElement.value = elements.create('card')
  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`
    )
    console.log(data)
    offerInfos.value = data.data
  } catch (error) {
    console.log(error.message)
  }
  isLoading.value = false
})

const total = computed(() => {
  let optionPrice = 0
  if (option.value === 'delivery') {
    optionPrice = 15.6
  }
  return 0.99 + optionPrice + offerInfos.value.attributes.price
})

const handlePayment = async () => {
  if (!firstname.value || !lastname.value) {
    return (errorMessage.value = 'Prénom et nom obligatoires')
  }
  isProcessing.value = true
  try {
    const stripe = await stripePromise
    const { token } = await stripe.createToken(cardElement.value)
    const stripeToken = token.id

    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
      {
        title: offerInfos.value.attributes.title,
        amount: total.value,
        token: stripeToken
      },
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfos.value.token}`
        }
      }
    )
    console.log('data payment=>>>', data)

    if (data.status === 'succeeded') {
      alert(
        `Paiement de ${total.value} € validé pour l'achat du produit ${offerInfos.value.attributes.title} par ${firstname.value} ${lastname.value}`
      )
      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.log(error.message)
  }
  isProcessing.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>
      <div>
        <div class="firstCol">
          <div>
            <h2>Informations personnelles</h2>
            <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>
            <label for="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              id="firstname"
              v-model="firstname"
              @input="errorMessage = ''"
            />
            <label for="lastname">Nom</label>
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              id="lastname"
              v-model="lastname"
              @input="errorMessage = ''"
            />
            <label for="phone">Téléphone</label>
            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              id="phone"
              v-model="phone"
              @input="errorMessage = ''"
            />
            <p>Recevoir un SMS pour l'arrivée de votre colis ou votre code de locker</p>
          </div>
          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>
          <div>
            <h2>Coordonnées bancaires</h2>
            <div id="card-element"></div>

            <div class="btnPart">
              <button @click="handlePayment" :disabled="isProcessing">Payer</button>
              <p v-if="errorMessage">{{ errorMessage }}</p>
            </div>

            <p>
              Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
              compléter votre achat.
            </p>
            <p>
              Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
              nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
            </p>
          </div>
        </div>
        <p v-if="isLoading">Chargement en cours...</p>
        <div v-else class="secondCol">
          <div>
            <div class="imgAndTitle">
              <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
              <h3>{{ offerInfos.attributes.title }}</h3>
            </div>

            <p class="price">{{ offerInfos.attributes.price }} €</p>
          </div>
          <div class="optionPart">
            <h3>Mode de remise</h3>
            <div>
              <input
                type="radio"
                name="faceToFace"
                value="faceToFace"
                id="faceToFace"
                v-model="option"
              />
              <label for="faceToFace">
                <p>Remise en main propre</p>
                <p>Payez en ligne et récupérez votre achat en main</p>
                <p>propre lors de votre rendez-vous avec le vendeur</p>
              </label>
            </div>
            <div>
              <input type="radio" name="delivery" value="delivery" id="delivery" v-model="option" />
              <label for="delivery">
                <p>Colissimo</p>
                <p>à votre domicile sous 2-3 jours</p>
              </label>
              <p class="price">15,60 €</p>
            </div>
            <div>
              <h3>Protection leboncoin</h3>
              <p class="price">0,99 €</p>
            </div>

            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Votre argent est sécurisé et versé au bon moment</span>
            </p>

            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Notre service client dédié vous accompagne</span>
            </p>
          </div>
          <div>
            <h2>Total</h2>
            <p class="price">{{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 40px 0px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  font-weight: bold;
}

h2 + p {
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 12px;
}

h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.container > div {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* --------- FIRSTCOL -------------- */
.firstCol {
  flex: 1;
}

.firstCol > div {
  box-shadow: 0 0 7px var(--grey);
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
}

.firstCol p {
  font-size: 12px;
}

.firstCol > p {
  margin: 20px 0px;
}

.firstCol label {
  margin-bottom: 10px;
}

.firstCol input {
  border: 1px solid var(--grey-med);
  border-radius: 15px;
  height: 45px;
  margin-bottom: 15px;
  padding-left: 10px;
}

#card-element {
  margin: 20px 0;
  border: 1px solid var(--grey-med);
  min-height: 45px;
  padding: 15px;
  border-radius: 15px;
}

.firstCol button {
  align-self: flex-start;
  background-color: var(--orange);
  color: white;
  padding: 7px 15px;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
}

.firstCol button:disabled {
  opacity: 0.5;
  cursor: auto;
}

.btnPart {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.btnPart p {
  color: var(--orange);
  font-size: 16px;
}
/* --------- SECONDCOL -------------- */

.secondCol {
  width: 355px;
  box-shadow: 0 0 7px var(--grey);
  border-radius: 10px;
}

.imgAndTitle {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: bold;
}

.secondCol > div:not(:nth-child(2)) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.secondCol > div:first-child img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.optionPart {
  border-top: 1px solid var(--grey-med);
  border-bottom: 1px solid var(--grey-med);
  padding: 15px;
  margin: 20px 0;
}

.optionPart > div {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.optionPart label p:not(:first-child) {
  font-size: 12px;
  color: var(--grey-med);
  line-height: 25px;
}

.optionPart > p {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

svg {
  color: var(--green);
}

.price {
  font-weight: bold;
  color: var(--brown);
  font-size: 16px;
  margin-bottom: 0;
}
</style>
