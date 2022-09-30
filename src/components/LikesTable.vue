<template>
  <section>
    <div class="d-flex justify-content-between mb-2">
      <div class="font-weight-light">Total: {{ this.followers.length }}</div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="followers.length == 0"
          @click="clearResults"
        >
          Clear Results
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Profile</th>
          <th scope="col">User Name</th>
          <th scope="col">Full Name</th>
          <th scope="col">Is Private</th>
          <th scope="col">Is Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="follower in this.followers" v-bind:key="follower.username">
          <td>
            <img
              crossorigin="anonymous"
              :src="follower.profile_pic_url"
              class="rounded-circle"
              style="max-width: 25px"
            />
          </td>
          <td>{{ follower.username }}</td>
          <td>{{ follower.full_name }}</td>
          <td>{{ follower.is_private }}</td>
          <td>{{ follower.is_verified }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    props: ['followers'],
    methods: {
      clearResults() {
        this.$emit('clearResults');
      },
    },
  };
</script>
