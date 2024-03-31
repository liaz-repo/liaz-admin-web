import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/index.vue'
import BlankView from '../views/BlankView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blank',
    name: 'blank',
    component: BlankView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
