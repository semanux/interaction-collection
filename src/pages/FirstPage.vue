<script setup lang="ts">
import { ref, reactive } from "@vue/reactivity"
import { computed } from "vue"
import useValidate from "@vuelidate/core"
import { required, email, minLength, sameAs } from "@vuelidate/validators"
import { useRouter } from "vue-router"
import { useFormStore } from "../stores/formStore"

const router = useRouter()
const store = useFormStore()
const state = reactive({
  email: store.email,
  password: store.password,
  confirm: store.confirm
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: { required, sameAs: sameAs(state.confirm) }
    }
  }
})

const validator = useValidate(rules, state)

const onSubmit = (e: Event) => {
  console.log("called the button", e)
  // validator.value.$validate()
  store.emailChange(store.email)
  store.passWord(store.password)
  store.passWordConfirm(store.confirm)
  router.push("/second")

  e.preventDefault()
}

const onNextPage = () => {
  router.push("/")
}

const goToHome = () => {
  router.push("/second")
}

console.log("store", store.emailShowCaser)
</script>

<template>
  <div class="root">
    <form @submit="onSubmit">
      <h2>First Page</h2>
      <p>
        <input
          type="text"
          placeholder="Email"
          v-model="store.email"
        />
        <span v-if="validator.email.$error">
          {{ validator.email.$errors[0].$message }}
        </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          v-model="store.password"
        />
        <span v-if="validator.password.password.$error">
          {{ validator.password.password.$errors[0].$message }}
        </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="store.confirm"
        />
        <span v-if="validator.password.confirm.$error">
          {{ validator.password.confirm.$errors[0].$message }}
        </span>
      </p>
      <div class="rahul">
        <button>Previous</button>
        <button @click="onSubmit">Submit</button>
        <button @click="goToHome()">Next</button>
      </div>
    </form>
  </div>
</template>

<style lang="css">
.root {
  width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
}
.rahul {
  display: flex;
  justify-content: space-between;
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
