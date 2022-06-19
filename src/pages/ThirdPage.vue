<script setup lang="ts">
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useFormStore } from "../stores/formStore"
import { useRouter } from "vue-router"
import PageNumber from "../components/PageNumber.vue"

const store = useFormStore()
const router = useRouter()
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})

// Create a form context with the validation schema.
const { errors } = useForm({
  validationSchema: schema
})

// No need to define rules for fields.
const { value: email } = useField("email")
const { value: password } = useField("password")

const onSubmit = () => {
  console.log("value of the email field", email.value)
  store.setEmail(email.value as string)
  store.setPassword(password.value as string)
  router.push("/second")
}
</script>

<template>
  <div>
    <PageNumber />
    <form @submit="onSubmit">
      <input v-model="email" />
      <span>{{ errors.email }}</span>
      <br>
      <input
        v-model="password"
        type="password"
      />
      <span>{{ errors.password }}</span>
      <button>Submit</button>
    </form>
  </div>
</template>