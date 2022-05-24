import { createWebHistory, createRouter } from 'vue-router'
import SecondPage from '../components/SecondPage.vue'

const routes = [
  {
    path: '/',
    name: 'second',
    component: SecondPage
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
