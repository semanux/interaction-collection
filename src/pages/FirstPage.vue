<template>
  <form @submit="onSubmit">
    <input
      name="email"
      v-model="email"
    />
    <span>{{ errors.email }}</span>
    <br>
    <input
      name="password"
      v-model="password"
      type="password"
    />
    <span>{{ errors.password }}</span>
    <button>Submit</button>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useFormStore } from "../stores/formStore"
import { useRouter } from "vue-router"

export default {
  setup() {
    // Define a validation schema

    const store = useFormStore()
    const router = useRouter()
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8)
    })

    // Create a form context with the validation schema
    const { errors } = useForm({
      validationSchema: schema
    })

    // No need to define rules for fields
    const { email } = useField("email")
    const { password } = useField("password")

    const onSubmit = () => {
      console.log("value of the value field", email)
      store.setEmail(email)
      store.setPassword(password)
      router.push("/second")
    }

    return {
      errors,
      email,
      password,
      onSubmit
    }
  }
}
</script>
