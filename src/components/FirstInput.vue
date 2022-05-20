<template>
  <div class="root">
    <RadialProgressBar />
    <!-- <form @submit="onSubmit"> -->
    <h2>Create an Account</h2>
    <p>
      <input type="text" placeholder="Email" v-model="state.email" />
      <span v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="state.password.password"
      />
      <span v-if="v$.password.password.$error">
        {{ v$.password.password.$errors[0].$message }}
      </span>
    </p>
    <p>
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="state.password.confirm"
      />
      <span v-if="v$.password.confirm.$error">
        {{ v$.password.confirm.$errors[0].$message }}
      </span>
    </p>
    <div class="rahul">
      <button @click="onPrevious">Previous</button>
      <button @click="onSubmit">Submit</button>
      <button @click="goToHome()">Next</button>
    </div>
    <!-- </form> -->
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import RadialProgressBar from './RadialProgressBar.vue'
import router from '../router/index.js'
import SecondInput from '../components/SecondInput.vue'
export default {
  setup() {
    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: ''
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
    function onSubmit(e) {
      console.log('called the button', e)
      this.v$.$validate()
      e.preventDefault()
    }

    function onNextPage() {
      this.$router.push('/')
    }
    const v$ = useValidate(rules, state)

    return { state, v$, onSubmit, onNextPage }
  },
  methods: {
    goToHome() {
        this.$router.push('/second')
    }
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
