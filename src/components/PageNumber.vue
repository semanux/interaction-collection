<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"


// will be going to check from router based query so that it will be easy
// const router = useRoute()
// const id = router.params.id
var path = location.pathname.slice(1)
</script>

<template>
  <p>
    Page: {{path}}
  </p>
</template>