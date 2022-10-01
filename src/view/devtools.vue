<template>
  <div class="mt-6">
    <!-- <atlas-nav></atlas-nav> -->

    <div class="w-full pb-10">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: this.state === 'instagram' }"
            href="#"
            @click="changeState('instagram')"
          >
            Instagram Ads
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: this.state == 'facebook' }"
            href="#"
            @click="changeState('facebook')"
            >Facebook Ads</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            :class="{ active: this.state == 'settings' }"
            @click="changeState('settings')"
            >Settings</a
          >
        </li>
      </ul>

      <!-- This is the instagram area -->
      <div v-if="state == 'instagram'" class="w-full">
        <instagram-screen :error="error"> </instagram-screen>
      </div>

      <div v-if="state == 'facebook'" class="w-full">
        <facebook-screen> </facebook-screen>
      </div>

      <!-- Settings area -->
      <div v-if="state == 'settings'">
        <settings></settings>
      </div>
    </div>
  </div>
</template>

<script>
  import Settings from '../components/Settings.vue';
  import InstagramScreen from '../components/InstagramScreen.vue';
  import FacebookScreen from '../components/FacebookScreen.vue';
  import AtlasNav from '../components/AtlasNav.vue';
  import Likes from '../components/Likes.vue';
  import LikesTable from '../components/LikesTable.vue';
  import Errors from '../components/Errors.vue';
  import '../styles/tailwind.css';

  export default {
    components: {
      Settings,
      Likes,
      Errors,
      LikesTable,
      InstagramScreen,
      FacebookScreen,
      AtlasNav,
    },
    name: 'devtoolsView',
    data() {
      return {
        state: 'facebook',
        loading: false,
        error: null,
      };
    },
    methods: {
      changeState(state) {
        this.state = state;
      },
    },
  };
</script>
