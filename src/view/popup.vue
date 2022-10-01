<template>
  <div>
    <atlas-nav></atlas-nav>
    <div class="w-full mt-12 min-w-[600px] min-h-[450px]">
      <h3>Welcome to Atlas Data Collector</h3>
      <div>
        Follow the aninimation below to open the DevTools area. Click
        <a href="https://www.dropbox.com/s/w3xzsed1yuhclxf/how_to_open.mp4?dl=0" target="_blank"
          >here</a
        >
        see a video.
      </div>
      <div>
        <img src="../assets/how_to_open.gif" class="rounded float-right w-full" />
      </div>
    </div>
  </div>
</template>

<script>
  import AtlasNav from '../components/AtlasNav.vue';

  export default {
    name: 'popupView',
    components: {
      AtlasNav,
    },

    mounted() {
      // chrome.devtools.panels.openResource(
      //     url: string,
      //     lineNumber: number,
      //     callback?: function,
      //   )
    },
    data() {
      return {
        msg: 'popup',
      };
    },
  };
</script>

<style></style>
