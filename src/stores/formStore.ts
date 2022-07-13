import { ref } from "vue"
import { defineStore } from "pinia"

export const useFormStore = defineStore("formStore", () => {
  // Email ref
  const email = ref("")
  const setEmail = (newEmail: string) => {
    email.value = newEmail
  }

  // Password ref
  const password = ref("")
  const setPassword = (newPassword: string) => {
    password.value = newPassword
  }

  //Storing the audio in Pinia
  const recorder = ref(null as null | Array<any>)
  // const recorder = ref(null as null | MediaRecorder);

  const setRecorder = (newRecorder: null | Array<any>) => {
    recorder.value = newRecorder
  }
  const filterRecorder =
    (index: BigInteger) => (newRecorder: null | Array<any>) => {
      recorder.value?.filter((index) => index.id !== index)
    }
  return {
    email,
    setEmail,
    password,
    setPassword,
    recorder,
    setRecorder,
    filterRecorder
  }
})
