<template>
  <div class="row">
    <div class="col col-12">
      <Errors v-if="error" :error="error"></Errors>
      <!-- show the settings since they have to do this -->

      <likes
        :endpoint="endpoint"
        :followers="followers"
        @likeSelected="likeSelected"
        @apiTokenUpdated="apiTokenUpdated"
        @createFollowersClicked="createFollowers"
      ></likes>

      <!-- then show the import buttons and clear -->

      <!-- then show the table -->

      <message :type="message.type" v-if="message.message">
        {{ message.message }}
      </message>

      <div class="d-flex justify-content-between mb-2">
        <div class="font-weight-light">Total: {{ this.followers.length }}</div>
        <div>
          <button
            type="buttom"
            @click="createFollowers"
            class="btn btn-primary mr-2"
            :disabled="followers.length == 0"
          >
            <span
              v-if="running"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Send Data to Atlas
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            :disabled="followers.length == 0"
            @click="clearResults"
          >
            Clear Results
          </button>
        </div>
      </div>

      <facebook-likes-table :followers="followers"> </facebook-likes-table>
    </div>
  </div>
</template>

<script>
  import Likes from './Likes.vue';
  import FacebookLikesTable from './FacebookLikesTable.vue';
  import Errors from './Errors.vue';
  import Message from './Message';

  export default {
    components: {
      Likes,
      Message,
      Errors,
      FacebookLikesTable,
    },
    created() {
      const chromeEvent = chrome.devtools.network.onRequestFinished;

      chromeEvent.addListener((request) => this.handleRequestFinished(request));
    },

    beforeDestroy() {
      chromeEvent.removeListener((request) => this.handleRequestFinished(request));
    },

    data() {
      return {
        endpoint: 'facebooks',
        apiToken: null,
        error: '',
        running: false,
        message: {
          type: 'success',
          message: null,
        },
        like: {},
        followers: [],
        loading: false,
        state: 'settings',
        existingInstagramLikings: {
          data: [],
          total: 0,
        },
      };
    },
    methods: {
      apiTokenUpdated(apiTokenUpdated) {
        this.apiToken = apiTokenUpdated;
      },
      likeSelected(likeSelected) {
        this.like = likeSelected;
      },
      changeState(newState) {
        this.state = newState;
      },
      clearResults() {
        this.followers = [];
      },

      handleRequestFinished(request) {
        if (!String(request?.request?.url).includes('graphql')) {
          return;
        }

        request.getContent((content) => {
          const data = JSON.parse(content).data;

          if (
            data != undefined &&
            data.node != undefined &&
            data.node.reactors != undefined &&
            data.node.reactors.edges != undefined
          ) {
            data.node.reactors.edges.forEach((element) => {
              if (element.node.__typename === 'User') {
                var person = element.node;

                var profile_url_array = person.profile_url.split('/');
                var username = profile_url_array[profile_url_array.length - 1];

                var follower = {
                  id: person.id,
                  social_id: person.profile_url,
                  full_name: person.name,
                  username: username,
                  mutual_friends: person.mutual_friends.count,
                  profile_pic_url: person.profile_picture.uri,
                };
                this.followers.push(follower);
              }
            });
          }
        });
      },
      createFollowers() {
        this.running = true;
        this.message.message = null;
        var chunckedFollowers = _.chunk(this.followers, 50);
        chunckedFollowers.forEach((chunckedFollower) => {
          this.$http
            .post(`${this.hostname}/api/${this.endpoint}/${this.like.id}/likes`, chunckedFollower, {
              headers: {
                Authorization: `Bearer ${this.apiToken}`,
                'content-type': 'application/json',
              },
            })
            .then((response) => {
              //this.$emit("createFollowers", this.like);
              this.running = false;
              this.message.message = 'Success sending over the data';
              //this.getFollowers();
            })
            .catch((error) => {
              this.running = false;
              this.message.message = 'Error sending over the data';
              this.message.type = 'error';
            });
        });
      },
    },
  };
</script>
