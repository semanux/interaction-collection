<template>
  <component :is="PageComp" />
</template>

<script>
import { useRouter, useRoute } from "vue-router"

const route = useRoute()
const router = useRouter()
const PageComp = ref(1)

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
