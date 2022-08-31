<script setup>
  import { useRouter, useRoute } from "vue-router"
  import { ref, watch } from "vue"

  //formWrapper component to create dynamic pages route
  const route = useRoute()
  const router = useRouter()
  const PageComp = ref()

  //watchFunction to await the loading of the image in function
  watch(
    () => route.params.id,
    async (id) => {
      try {
        PageComp.value = (await import("../pages/" + id + ".vue")).default
      } catch {
        router.push("/404")
      }
    }
  )
</script>

<template>
  <component :is="PageComp" />
</template>
