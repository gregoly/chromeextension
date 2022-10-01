<template>
  <div class="row">
    <ul class="nav nav-tabs mt-2">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: this.state == 'table' }"
          href="#"
          @click="changeState('table')"
          >Instagram Import Table</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: this.state == 'settings' }"
          href="#"
          @click="changeState('settings')"
          >Instagram Import Settings</a
        >
      </li>
    </ul>

    <!-- end top nav -->
    <div class="flex w-full" v-show="state == 'table'">
      <Errors v-if="error" :error="error"></Errors>
      <div class="alert alert-warning mt-2" role="alert">
        <p class="text-justify font-light">
          As you scroll through likes you will see the results below. After you are done you can
          send them to Atlas web site to manage.
        </p>
      </div>
      <likes-table :followers="followers" @click="clearResults"></likes-table>
    </div>

    <div class="flex w-full" v-show="state == 'settings'">
      <likes :followers="followers"></likes>
    </div>
  </div>
</template>

<script>
  import Likes from '../components/Likes.vue';
  import LikesTable from '../components/LikesTable.vue';
  import Errors from '../components/Errors.vue';

  export default {
    components: {
      Likes,
      Errors,
      LikesTable,
    },
    mounted() {
      chrome.devtools.network.onRequestFinished.addListener((request) => {
        if (request.request.url.includes('query_hash')) {
          request.getContent((content) => {
            var data = JSON.parse(content).data;
            if (
              data != undefined &&
              data.shortcode_media != undefined &&
              data.shortcode_media.edge_liked_by != undefined
            ) {
              data.shortcode_media.edge_liked_by.edges.forEach((element) => {
                var follower = {
                  id: element.node.id,
                  username: element.node.username,
                  full_name: element.node.full_name,
                  profile_pic_url: element.node.profile_pic_url,
                  is_verified: element.node.is_verified,
                  is_private: element.node.is_private,
                  followed_by_viewer: element.node.followed_by_viewer,
                };
                this.followers.push(follower);
              });
            }
          });
        }
      });
    },
    data() {
      return {
        followers: [],
        loading: false,
        state: 'settings',
        error: null,
        existingInstagramLikings: {
          data: [],
          total: 0,
        },
      };
    },
    methods: {
      changeState(newState) {
        this.state = newState;
      },
      clearResults() {
        this.followers = [];
      },
    },
  };
</script>
