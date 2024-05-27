import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import RegisterView from '@/views/User/UserView.vue'
import TasksView from '@/views/Task/TasksView.vue'
import NotFoundView from '@/views/AboutView.vue'

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
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: TasksView
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: () => NotFoundView
    }
  ]
})

export default router
