<template>
  <form @submit="helloWorld">
    <div>
      <label>your name</label>
      <input v-model.trim="name" />
    </div>
    <button type="submit">submit</button>
  </form>
  <button @click="helloWorld">Make</button>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FirstPage',
//   setup() {
//     const helloWorld = async () => {
//       const result = await axios.get('https://api.publicapis.org/entries')
//       console.log('waiting for the result', result.data)
//       console.log('helloworld')
//     }
//     return {
//       helloWorld
//     }
//   },
  data() {
    return {
      name: '',
      dateTime: new Date(),
      timer: undefined,
      submitted: false
    }
  },
  methods: {
    setDate() {
      this.dateTime = new Date()
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setDate()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>
