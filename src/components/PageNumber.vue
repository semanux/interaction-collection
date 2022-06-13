<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const router = useRoute()
const id = router.params.id
var path = location.pathname.slice(1)
console.log("value of the id params===", router.query.name)
</script>

<template>
  <p>
    {{path}}
  </p>
</template>