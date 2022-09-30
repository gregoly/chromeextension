import { createApp } from 'vue';
import App from '../view/devtools.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

chrome.devtools.panels.create(
  'Atlas Extension',
  'Atlas Extension for exporting data',
  'devtools.html',
  function (panel) {
    const app = createApp(App);

    app.use(VueAxios, axios);

    app.config.globalProperties.hostname = 'https://atlas.unearthcampaigns.com';
    //app.config.globalProperties.hostname = "https://atlas-staging.unearthcampaigns.com"
    //app.config.globalProperties.hostname = "https://atlas.sharedwithexpose.com"

    app.config.globalProperties.token = async (results) => {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.sync.get(['apiToken'], (result) => {
            resolve(result.apiToken);
          });
        } catch (ex) {
          reject(ex);
        }
      });
    };

    app.mount('#app');
  },
);
