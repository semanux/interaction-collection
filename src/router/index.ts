import { createWebHistory, createRouter, useRoute } from "vue-router"
import Home from "../pages/Home.vue"
import FirstPage from "../pages/FirstPage.vue"
import SecondPage from "../pages/SecondPage.vue"
import ThirdPage from "../pages/ThirdPage.vue"
import NotFound from "../components/NotFound.vue"
import FormWrapper from "../pages/FormWrapper.vue"
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/1",
    name: "first",
    component: FirstPage
  },
  {
    path: "/2",
    name: "second",
    component: SecondPage
  },
  {
    path: "/3",
    name: "third",
    component: ThirdPage
  },
  {
    path: "/form/:id",
    component: FormWrapper
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
