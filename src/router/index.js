import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PaymentView from '@/views/PaymentView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // Pour recevoir les query de l'url en props dans le composant
      props: (route) => ({
        // L'opérateur "ou" (=> "||") permet de dire : la props 'title' est égale à la valeur de la query 'title' si elle existe, sinon elle est égale à une string vide
        title: route.query.title || '',
        // Les query sont de type string donc on les convertit en nombre entier au besoin grâce à la méthode 'parseInt'
        page: parseInt(route.query.page) || 1,
        sort: route.query.sort || '',
        // Les query sont de type string donc on les convertit en nombre au besoin grâce à la méthode 'Number' cette fois, pour garder les décimals s'il y en a
        pricemin: Number(route.query.pricemin) || '',
        pricemax: Number(route.query.pricemax) || ''
      })
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: PaymentView,
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requireAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView
    }
  ],
  // Pour toujours revenir en haut de la page lorsqu'on navigue
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

// Définition du 'Global Before Guards'
router.beforeEach((to, from) => {
  // Injection du fournisseur de dépendance
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value?.token) {
    //   👆 La route requière une authentification et 👆 l'utilisateur n'est pas connecté => donc on le redirige
    return { name: 'login', query: { redirect: to.path } }
  }
})

export default router
