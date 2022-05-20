<template>
  <div class="root">
    <h2>Sabka Baap</h2>
    <p>
      <input type="text" placeholder="Email" v-model="state.email" />
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="state.password.newpassword"
      />
    </p>
    <p>
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="state.password.confirm"
      />
    </p>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
  setup() {
    const state = reactive({
      email: '',
      password: {
        newpassword: '',
        confirm: ''
      }
    })
    const rules = computed(() => {
      email: {
        required, email
      }
      password: {
        newpassword: {
          required
          minLength: minLength(6)
        }
        confirm: {
          required
          sameAs: sameAs(state.password.newpassword)
        }
      }
    })
    const v$ = useValidate(rules, state)

    return { state, v$ }
  }
}
</script>

<style lang="css">
.root {
  width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
}

input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
}

button {
  background-color: #3498db;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  color: white;
}
</style>
