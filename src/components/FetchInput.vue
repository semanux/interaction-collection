<template>
  <h1>Vue 3 and Fetch Example</h1>

  <ul v-if="!loading && data && data.length">
    <li v-for="post of data" :key="post">
      <p><strong></strong></p>
      <p></p>
    </li>
  </ul>

  <p v-if="loading">Still loading..</p>
  <p v-if="error"></p>
</template>
<script>
import { ref, computed, onMounted } from 'vue'
export default {
  name: 'Posts',
  props: {},
  setup() {
    const data = ref(null)
    const loading = ref(true)
    const error = ref(null)

    async function fetchData() {
      loading.value = true

      const res = await fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => (this.data = data))
      loading.value = false

      return { data, loading, error }

      // async function fetchData() {
      //   loading.value = true
      //   // I prefer to use fetch
      //   // you can use use axios as an alternative
      //   try {
      //     const res = await fetch('http://jsonplaceholder.typicode.com/posts', {
      //       method: 'get',
      //       headers: {
      //         'content-type': 'application/json'
      //       }
      //     })
      //     // a non-200 response code
      //     if (!res.ok) {
      //       // create error instance with HTTP status text
      //       const error = new Error(res.statusText)
      //       error.json = res.json()
      //       throw error
      //     }
      //     const json = await res.json()
      //     // set the response data
      //     data.value = json.data
      //   } catch (err) {
      //     error.value = err
      //     // In case a custom JSON error response was provided
      //     if (err.json) {
      //       return err.json.then((json_1) => {
      //         // set the JSON response message
      //         error.value.message = json_1.message
      //       })
      //     }
    }
  }
}
</script>

<style></style>
