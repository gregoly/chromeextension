<template>
  <section>
    <div class="flex justify-between mb-2">
      <div class="font-light">Total: {{ this.followers.length }}</div>
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
          <th scope="w-full">Profile</th>
          <th scope="w-full">User Name</th>
          <th scope="w-full">Full Name</th>
          <th scope="w-full">Is Private</th>
          <th scope="w-full">Is Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="follower in this.followers" v-bind:key="follower.username">
          <td>
            <img
              crossorigin="anonymous"
              :src="follower.profile_pic_url"
              class="rounded-full max-w-[25px]"
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
