import { createWebHistory, createRouter, useRoute } from "vue-router"
import Home from "@/components/pages/Home.vue"
import FirstPage from "@/components/pages/FirstPage.vue"
import SecondPage from "@/components/pages/SecondPage.vue"
import ThirdPage from "@/components/pages/ThirdPage.vue"
import NotFound from "@/components/NotFound.vue"
import FormWrapper from "@/components/pages/FormWrapper.vue"
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
