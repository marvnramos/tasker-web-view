import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import RegisterView from '@/views/User/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: AuthView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ]
})

export default router
