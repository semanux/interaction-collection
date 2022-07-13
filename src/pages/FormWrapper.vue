<script setup>
import FirstPage from "../pages/FirstPage.vue"
import SecondPage from "../pages/SecondPage.vue"
import ThirdPage from "../pages/ThirdPage.vue"
import { useRouter, useRoute } from "vue-router"
import { ref, watch } from "vue"

const route = useRoute()
const router = useRouter()
const PageComp = ref()

watch(
  () => route.params.id,
  async (id) => {
    try {
      PageComp.value = (await import("../pages/" + id + ".vue")).default
    } catch {
      router.push("/404")
    }
  },
  { immediate: true }
)
</script>

<template>
  <component :is="FirstPage" />
  <component :is="SecondPage" />
  <component :is="ThirdPage" />
</template>
