import { ref } from "vue";
import { defineStore } from "pinia";

export const useFormStore = defineStore("formStore", () => {

  // Email ref 
  const email = ref("");
  const setEmail = (newEmail: string) => {
    email.value = newEmail;
  }

  // Password ref
  const password = ref("");
  const setPassword = (newPassword: string) => {
    password.value = newPassword;
  }

  return { email, setEmail, password, setPassword }
});