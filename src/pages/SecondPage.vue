<template>
  <form @submit="onSubmit">
    <!-- some fields -->
  </form>
</template>

<script>
import { useForm } from 'vee-validate';

export default {
  setup() {
    const { handleSubmit } = useForm();

    const onSubmit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      onSubmit,
    };
  },
};
</script>
