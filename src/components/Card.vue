<template>
  <div class="card w-75">
    <div class="card-header">Step {{ step }}) Choose {{ title }}</div>
    <div class="card-body">
      <select class="form-select w-100 p-1" v-model="resource" @change="selected">
        <option value="" disabled>--{{ title }}--</option>
        <option v-for="resource in resources" :key="resource.id" :value="resource">
          {{ resource.name }}
        </option>
      </select>

      <button type="buttom" @click="startOver" class="btn btn-secondary mt-1">Start over</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['title', 'current_resource', 'resources', 'step'],
    mounted() {
      this.resource = this.current_resource;
    },
    data() {
      return {
        resource: {},
      };
    },
    methods: {
      startOver() {
        this.$emit('startOver');
      },
      selected() {
        this.$emit('engagementUpdated', this.resource);
      },
    },
  };
</script>
