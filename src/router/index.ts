import { createWebHistory, createRouter } from 'vue-router'
import FirstPage from '../pages/FirstPage.vue'
import SecondPage from '../pages/SecondPage.vue'
import ThirdPage from '../pages/ThirdPage.vue'
import NotFound from '../components/NotFound.vue'
const routes = [
  {
    path: "/",
    name: "first",
    component: FirstPage
  },
  {
    path: "/2/70",
    name: "second",
    component: SecondPage
  },
  {
    path: "/3/70",
    name: "third",
    component: ThirdPage
  },
  { path: "/semanux/form/:id", component: SecondPage }, 
  {
    path: "/:catchAll(.*)",
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router