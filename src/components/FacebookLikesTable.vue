<template>
  <section>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="w-full">Profile</th>
          <th scope="w-full">User Name</th>
          <th scope="w-full">Full Name</th>
          <th scope="w-full">Mutual Friends Count</th>
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
          <td>{{ follower.mutual_friends }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    props: ['followers'],
  };
</script>
