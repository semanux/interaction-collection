<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

// Route based query to track the page
const route = useRoute()
// Getting path from the location and the pathName
var path = location.pathname.slice(1)
</script>

<template>
  <div>
  <!-- Getting the pageNo from route.params.id -->
    Page: {{ path }}
    <h1>The Page No is {{ route.params.id }}</h1>
  </div>
</template>
