<template>
  <section>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Profile</th>
          <th scope="col">User Name</th>
          <th scope="col">Full Name</th>
          <th scope="col">Mutual Friends Count</th>
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
