import { createWebHistory, createRouter } from 'vue-router'
import FirstInput from '../components/FirstInput.vue'
import SecondInput from '../components/SecondInput.vue'

const routes = [
  {
    path: '/',
    name: 'second',
    component: SecondInput
  },
  {
    path: '/second',
    name: 'second',
    component: SecondInput
  },
  {
    path: '/third',
    name: 'third',
    component: SecondInput
  },
  {
    path: '/fourth',
    name: 'fourth',
    component: SecondInput
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
