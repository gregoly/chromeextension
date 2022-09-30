<template>
  <message :type="message.type" v-if="message.message">
    {{ message.message }}
  </message>
  <div>
    <form v-on:submit.prevent>
      <div class="form-group">
        <label for="apiToken">API Token</label>
        <input
          v-model="apiToken"
          type="text"
          class="form-control"
          id="apiToken"
          aria-describedby="emailHelp"
          placeholder="Enter token from Atlas"
        />
        <small id="apiToken" class="form-text text-muted"
          >You can get this in Atlas->Your Profile Image->Api Tokens
          <a href="https://atlas.unearthcampaigns.com/user/api-tokens" target="_blank">here</a>
        </small>
      </div>
      <button type="buttom" @click="saveApiToken" class="btn btn-primary">Submit</button>
    </form>
  </div>

  <div class="mt-5">
    <h2>How to get your token</h2>
    <div>Visit the Command Center, login and you can get the token as seen in the image below.</div>
    <img src="../assets/get_token.gif" class="mt-4 rounded float-end w-100" />
  </div>
</template>

<script>
  import Message from './Message';

  export default {
    components: {
      Message,
    },
    data() {
      return {
        message: {
          type: 'success',
          message: null,
        },
        apiToken: '',
      };
    },
    mounted() {
      chrome.storage.sync.get(['apiToken'], (result) => {
        this.apiToken = result.apiToken;
      });
    },
    methods: {
      saveApiToken() {
        // save to chrome storage
        chrome.storage.sync.set(
          {
            apiToken: this.apiToken,
          },
          () => {
            // update state
            this.apiToken = this.apiToken;
            this.message.message = 'Settings Saved';
          },
        );
      },
    },
  };
</script>
