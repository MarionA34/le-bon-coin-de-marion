<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const username = ref('')
const email = ref('')
const password = ref('')
const displayPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    if (username.value && email.value && password.value) {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          username: username.value,
          email: email.value,
          password: password.value
        }
      )

      // console.log('SignupView - data>>', data)

      // Création de l'objet qui sera stocké dans le fournisseur de dépendance et les cookies
      const userInfos = {
        username: data.user.username,
        token: data.jwt,
        id: data.user.id
      }

      GlobalStore.changeUserInfos(userInfos)

      $cookies.set('userInfos', userInfos)

      router.push({ name: 'home' })
    } else {
      errorMessage.value = 'Veuillez remplir tous les champs'
    }
  } catch (error) {
    console.log('SignupView - catch>>', error)

    if (error.response) {
      errorMessage.value = error.response.data.error.message
    } else {
      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
  }

  isSubmitting.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <div>
        <div>
          <h2>Bonjour !</h2>

          <h1>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div>
            <label for="username">Nom <span>*</span></label>
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              @input="() => (errorMessage = '')"
            />
          </div>

          <div>
            <label for="email">E-mail <span>*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              @input="() => (errorMessage = '')"
            />
          </div>

          <div>
            <label for="password">Mot de passe <span>*</span></label>
            <div class="passwordInput">
              <input
                :type="displayPassword ? 'text' : 'password'"
                name="password"
                id="password"
                v-model="password"
                @input="() => (errorMessage = '')"
              />
              <div>
                <font-awesome-icon
                  :icon="['far', 'eye']"
                  v-if="displayPassword"
                  @click="() => (displayPassword = !displayPassword)"
                />
                <font-awesome-icon
                  :icon="['far', 'eye-slash']"
                  v-else
                  @click="() => (displayPassword = !displayPassword)"
                />
              </div>
            </div>
          </div>

          <button type="button" v-if="isSubmitting">Création en cours ...</button>
          <button v-else>S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>

          <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>

        <p>
          Vous avez déjà un compte ?
          <RouterLink :to="{ name: 'login' }">Connectez-vous</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url('../assets/img/login-illustration.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  display: flex;
  /* Le mot clé 'safe' permet à cette propriété de repasser automatiquement ) la valeur 'flex-start' si la hauteur devient insuffisante. Cela évitera à l'utilisateur de ne pas pouvoir scroller pour voir le haut et le bas du bloc.  */
  align-items: safe center;
  justify-content: center;
}
.container > div {
  box-shadow: 0 0 7px 1px var(--grey-med);
  background-color: #fff;
  border-radius: 15px;
  padding: 30px;
  height: 490px;
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}
form {
  flex: 1;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
form > div {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 7px;
}
input {
  border: 1px solid var(--grey);
  height: 45px;
  border-radius: 15px;
  padding-left: 10px;
}
.passwordInput {
  display: flex;
}
.passwordInput input {
  border-radius: 15px 0 0 15px;
  flex: 1;
}
.passwordInput > div {
  border: 1px solid var(--grey);
  display: flex;
  align-items: center;
  border-left: none;
  color: var(--grey);
  height: 45px;
  border-radius: 0 15px 15px 0;
  width: 40px;
  padding: 10px;
}
span {
  color: var(--grey);
}
button {
  background-color: var(--orange);
  border: none;
  border-radius: 15px;
  height: 45px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
button > svg {
  font-size: 14px;
}
form > p {
  color: var(--orange);
}
p {
  text-align: center;
}
a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
