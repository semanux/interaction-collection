<template>
  <div>
    <h2>Filter LearnVue Articles</h2>
    <input type="text" placeholder="Filter Search" v-model="query" />
    <button @click="reset">Reset button</button>
    {{ query }}
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
export default {
  setup() {
    const query = ref('')
    const reset = () => {
      query.value = ''
    }
    const formattedText = computed({})
    onMounted(() => {})
    return {
      query,
      reset
    }
  }
}
</script>

<style></style>
