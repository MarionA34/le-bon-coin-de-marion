import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

// Import de FontAwesome Core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import du composant vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icône
import {
  faPlusSquare,
  faHeart,
  faClock,
  faUser,
  faEyeSlash,
  faEye
} from '@fortawesome/free-regular-svg-icons'

import {
  faCheckDouble,
  faMapMarkerAlt,
  faCircle,
  faSearch,
  faArrowRight,
  faArrowLeft,
  faSignOut,
  faAngleRight,
  faAngleLeft,
  faCameraAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

// Ajout de l'icône à la bibliothèque
library.add(
  faPlusSquare,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faUser,
  faCircle,
  faSearch,
  faArrowRight,
  faEyeSlash,
  faSignOut,
  faEye,
  faAngleRight,
  faAngleLeft,
  faCameraAlt,
  faCheck,
  faArrowLeft
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

// Dit à toute l'application d'utiliser le package
app.use(VueCookies, { expires: '7d', secure: 'true', sameSite: 'Lax' })

// Création de la valeur réactive
const userInfos = ref(
  $cookies.get('userInfos') || {
    username: '',
    token: ''
  }
)
const changeUserInfos = (infos) => {
  userInfos.value = infos
}

// Création du 'provider'
app.provide('GlobalStore', { userInfos: userInfos, changeUserInfos: changeUserInfos })

app.mount('#app')
