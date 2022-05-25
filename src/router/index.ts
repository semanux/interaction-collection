import { createWebHistory, createRouter } from 'vue-router'
import FirstPage from '../pages/FirstPage.vue'
import SecondPage from '../pages/SecondPage.vue'
const routes = [
  {
    path: '/',
    name: 'first',
    component: FirstPage
  },
  {
    path: '/second',
    name: 'second',
    component: SecondPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router