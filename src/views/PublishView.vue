<script setup>
import { useObjectUrl } from '@vueuse/core'
import axios from 'axios'
import { ref, computed } from 'vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const GlobalStore = inject('GlobalStore')
const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    isLoading.value = true

    if (title.value && description.value && price.value && pictures.value) {
      const formData = new FormData()

      for (const key in pictures.value) {
        if (Object.hasOwnProperty.call(pictures.value, key)) {
          formData.append('files.pictures', pictures.value[key])
        }
      }

      const stringifiedInfo = JSON.stringify({
        title: title.value,
        description: description.value,
        price: price.value,
        owner: GlobalStore.userInfos.value.id
      })

      formData.append('data', stringifiedInfo)
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('data>>', data.data)
      router.push({ name: 'offer', params: { id: data.data.id } })
    } else {
      errorMessage.value = 'Veuillez remplir tous les champs svp'
    }
  } catch (error) {
    console.log(error.response.data.error)
  }
  isLoading.value = false
}

const urlsListPreview = computed(() => {
  const tab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }

  return tab
})

const selectPictures = (event) => {
  errorMessage.value = ''

  const numOfFiles = event.target.files.length

  if (numOfFiles <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = '10 photos maximum'
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Déposer une annonce</h1>
      <form @submit.prevent="handleSubmit">
        <label for="title">Titre de l'annonce</label
        ><input
          type="text"
          name="title"
          id="title"
          v-model="title"
          @input="() => (errorMessage = '')"
        />
        <p>Vous n'avez pas besoin de mentionner "Achat" ou "Vente" ici.</p>
        <label for="description">Description de l'annonce</label>
        <textarea
          id="description"
          name="description"
          rows="20"
          v-model="description"
          @input="() => (errorMessage = '')"
        >
        </textarea>

        <p>
          Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
          ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
          série, facture, certificat, inscription de la marque sur l’article, emballage etc.
          Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
          l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne pourra
          pas demander le remboursement ou l’échange du bien ou service proposé
        </p>
        <label for="price"> Votre prix de vente </label>
        <div class="price">
          <input
            type="number"
            name="price"
            id="price"
            v-model="price"
            @input="() => (errorMessage = '')"
          />
          <p>€</p>
        </div>

        <label for="pictures" class="fileInput">
          <font-awesome-icon :icon="['fas', 'camera-alt']" />
          <span>Sélectionnez jusqu'à 10 photos</span>
        </label>
        <input type="file" id="pictures" multiple @input="selectPictures" />

        <div v-if="pictures" class="previews">
          <img v-for="url in urlsListPreview" :src="url" alt="" />
        </div>

        <p v-if="isLoading">Publication en cours</p>

        <button>Déposer mon annonce</button>

        <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--grey-light);
  padding: 40px 0px;
}

.container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

h1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 30px 0px 10px 0px;
}

p {
  font-size: 12px;
  color: var(--grey);
  margin-top: 5px;
  width: 770px;
}

input,
textarea {
  border: 1px solid var(--grey);
  border-radius: 15px;
  width: 770px;
}

input[type='text'] {
  height: 45px;
}

.price {
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.price input {
  width: 190px;
  border-radius: 15px 0 0 15px;
  border: 1px solid var(--grey);
  height: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price p {
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey);
  border-left: none;
  height: 100%;
  border-radius: 0 15px 15px 0;
  margin-top: 0px;
  font-size: 16px;
}

input[type='file'] {
  display: none;
}

.fileInput {
  border: 1px solid var(--blue-dark);
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  color: var(--blue-dark);
  cursor: pointer;
}

.fileInput span {
  text-align: center;
}

.fileInput svg {
  font-size: 34px;
}

button {
  color: white;
  background-color: var(--orange);
  border-radius: 15px;
  padding: 10px 15px;
  border: none;
  align-self: flex-end;
  margin-top: 40px;
  font-weight: bold;
}

img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 30px;
}

.previews {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.previews img {
  border-radius: 10px;
  object-fit: cover;
  width: calc((100% - 40px) / 5);
  aspect-ratio: 1/1;
}

.errorMessage {
  color: var(--orange);
  text-align: center;
  font-size: 16px;
}
</style>
