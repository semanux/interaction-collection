  <script setup lang="ts">
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useFormStore } from "@/store"
import { useRouter } from "vue-router"
import recorder from "@/components/Recorder.vue"

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
  router.push("/2")
}
</script>

<template>
  <div class="middle-container">
    <recorder />
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

<style scoped>

.middle-container {
  display: flex;
  width: 50vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

form{
  display: flex;
  width: 50%;
  flex-direction: column;
  margin: 2;
  padding: 2;
}
</style>