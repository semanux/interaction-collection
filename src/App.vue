<script setup lang="ts">
import headerComponent from "@/components/Header.vue";
import footerComponent from "@/components/Footer.vue";

</script>

<template>
  <headerComponent/>
  <div class="middle">
    <router-view/>
  </div>
  <footerComponent/>
</template>

<style>
@import "@/assets/styles/corporate/style.css";

/* TODO: Put background color to corporate colors. */
:root {
  --color-background: #eef6f6;
}

[v-cloak] { display: none; }

body {
  background-color: var(--color-background);
  accent-color: var(--color-accent-primary);
}

input{
  border-radius: var(--low-roundness);
  border: 1px solid var(--color-gray);
}

h2 {
  margin-top: 0;
  margin-bottom: 0;
}

#app {
  color: var(--color-font-primary);
  max-width: 1600px;
  margin: auto;
}

.middle {
  border-radius: var(--low-roundness);
  background-color: var(--color-fill-tertiary);
  padding: 1.0rem;
}

.block {
  display: block;
  margin: 1rem 0 1rem 0;
}

.block:first-child {
  margin-top: 1rem;
}

.block:last-child {
  margin-bottom: 1rem;
}

.form {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 150px auto;
  grid-template-areas:
    "heading form"
    "description form";
  column-gap: 3rem;
  row-gap: 1rem;
}

.description {
  font-size: 75%;
}

</style>