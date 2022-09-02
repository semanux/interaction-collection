<script setup lang="ts">
  import { useForm, useField } from "vee-validate"
  import * as yup from "yup"
  import { useFormStore } from "@/store"
  import { useRouter } from "vue-router"
  import recorder from "@/components/Recorder.vue"


  const store = useFormStore()
  const router = useRouter()

</script>


<template>

    <h1>
      Donate your voice
    </h1>
    <h2>to teach machines how real people use nonverbal voice expressions. </h2>
    <p>
      Our aim is to teach machines to understand few nonverbal voice expressions used by people in the conversations. We later plan to use this knowledge and provide people with natural interaction techniques. You may only participate in our voice donation program if you agree to our <a href="https://semanux.com/data-privacy">terms.</a>
    </p>
    <div class="middle-container">
      <recorder/>
    </div>

    <div class="middle-container">
      <img src="/assets/QRCode.JPG" class="center" style="" alt="QR code to this page, to open on phone conveniently" height="150" width="150">
        <p>If you don't have a good microphone, scan this QR code to open this page conveniently on your phone. Smartphones usually have a good quality built-in mic.</p>
    </div>     

</template>

<style scoped>

.middle-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2;
  border-radius: 5px;
  padding: 20px;
}


</style>
  
