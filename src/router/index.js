import { createWebHistory, createRouter } from 'vue-router'
import FirstPage from '../components/FirstPage.vue'
import SecondPage from '../components/SecondPage.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: FirstPage
  },
  {
    path: '/second',
    name: 'second',
    component: SecondPage
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router