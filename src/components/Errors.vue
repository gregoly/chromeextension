<template>
  <div v-if="error" class="alert alert-danger mt-2" role="alert" v-html="error"></div>
</template>

<script>
  export default {
    props: ['error'],
  };
</script>
