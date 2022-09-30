<template>
  <div
    class="alert mt-2"
    :class="{ 'alert-error': type == 'error', 'alert-success': type != 'error' }"
    role="alert"
  >
    <p class="text-justify font-weight-light">
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'success',
      },
    },
  };
</script>

<style>
  @import '../styles/bootstrap.min.css';
</style>
