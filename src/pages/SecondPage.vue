<script setup lang="ts">
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useFormStore } from "../stores/formStore"
import { useRouter } from "vue-router"
import NewRecordVue from "../components/RecordComponent.vue"

const store = useFormStore()
const router = useRouter()

//using yup package to do the validatoin for email id and password with a length of 8
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

//onSubmit function to store email and id password in pinia store
const onSubmit = (e) => {
  e.preventDefault();
  console.log("value of the email field", email.value)
  store.setEmail(email.value as string)
  store.setPassword(password.value as string)
  router.push("/3")
}
</script>

<template>
  <div class="container">
    <!-- <NewRecordVue /> -->
    <form @submit="onSubmit">
      <input v-model="email" />
      <br>
      <span>{{ errors.email }}</span>
      <br>
      <input
        v-model="password"
        type="password"
      />
      <span>{{ errors.password }}</span>
      <br>
      <button type="submit" value="Save information">Submit</button>
    </form>
  </div>
</template>

<style lang="css">
</style>