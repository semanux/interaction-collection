<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const router = useRoute()
const id = router.params.id
var path = location.pathname.slice(1, 2)
var path2 = location.pathname.slice(3)
console.log("value of the id params===", router.query.name)
</script>

<template>
  <p>
    {{path}}
    {{path2}}

  </p>
</template>