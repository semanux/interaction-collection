<script setup lang="ts">
import { ref, reactive } from "@vue/reactivity"
import { computed } from "vue"
import useValidate from "@vuelidate/core"
import { required, email, minLength, sameAs } from "@vuelidate/validators"
import { useRouter } from "vue-router"
import { useCounterStore } from "../stores/counter"
import { useBankAccountStore } from "../stores/bankAccount"
import { useFormStore } from "../stores/formStore"

const router = useRouter()

const state = reactive({
  email: "",
  password: {
    password: "",
    confirm: ""
  }
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: { required, sameAs: sameAs(state.password.password) }
    }
  }
})

const validator = useValidate(rules, state)

const onSubmit = (e: Event) => {
  console.log("called the button", e)
  validator.value.$validate()
  e.preventDefault()
}

const onNextPage = () => {
  router.push("/")
}

const goToHome = () => {
  router.push("/second")
}

const store = useBankAccountStore()

//most of the important part is accessing the logic behind the store and doing some subscriptions

store.$onAction(({ name, store, after }) => {
  after((result) => {
    if (result) {
      store.processTransaction(result)
    }
  })
})

//submitting the payment

const payAmount = ref(0)

const submitPayment = () => {
  if (payAmount.value) {
    store.rahulpayment(payAmount.value)
    payAmount.value = 0
  }
}

//linking the FirstPage with FormStore

const storeNew = useFormStore()
</script>

<template>
  <div class="root">
    <form @submit="onSubmit">
      <h2>Create an ccount</h2>
      <p>
        <input
          type="text"
          placeholder="Email"
          v-model="storeNew.emailShowCaser"
        />
        <span v-if="validator.email.$error">
          {{ validator.email.$errors[0].$message }}
        </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          v-model="storeNew.passWordShowCaser"
        />
        <span v-if="validator.password.password.$error">
          {{ validator.password.password.$errors[0].$message }}
        </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="state.password.confirm"
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
