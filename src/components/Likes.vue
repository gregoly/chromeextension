<template>
  <div class="column mb-10">
    <div class="clearfix mt-1" style="height: 2rem">
      <div
        v-if="loading"
        style="width: 1.2rem; height: 1.2rem"
        class="spinner-border text-secondary float-right"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else style="width: 1rem; height: 1rem" class="float-right" role="status"></div>
    </div>
    <Errors v-if="error" :error="error"></Errors>
    <Transition>
      <div v-if="initial_loading">Loading...</div>
      <div v-else class="mb-4">
        <div>
          <div class="text-muted mb-4">You are signed in using team "{{ current_team_name }}"</div>

          <form v-on:submit.prevent v-show="!hideCreateForm">
            <div class="form">
              <div class="row justify-content-md-center">
                <div class="col">
                  <Transition>
                    <Card
                      v-if="step == 'select_project'"
                      title="Project"
                      step="1"
                      @startOver="startOver"
                      :resources="projects"
                      :current_resource="project"
                      @engagementUpdated="getEngagementApiProjectUpdated"
                    ></Card>

                    <Card
                      v-else-if="step == 'select_campaign'"
                      title="Campaign"
                      step="2"
                      @startOver="startOver"
                      :resources="campaigns"
                      :current_resource="campaign"
                      @engagementUpdated="getEngagementApiCampaignUpdated"
                    ></Card>

                    <Card
                      v-else-if="step == 'select_ad_set'"
                      title="Ad Set"
                      step="3"
                      @startOver="startOver"
                      :resources="ad_sets"
                      :current_resource="ad_set"
                      @engagementUpdated="getEngagementApiAdSetUpdated"
                    >
                    </Card>

                    <div class="card w-75" v-else-if="step == 'select_ad'">
                      <div class="card-header">Step 4) Choose Ad</div>
                      <div class="card-body">
                        <select
                          class="form-select form-select-lg mb-3 w-100 p-1"
                          v-model="like"
                          @change="likeSelected()"
                        >
                          <option value="" disabled>--Ad--</option>
                          <option v-for="ad in ads[likes_key]" :key="ad.id" :value="ad">
                            {{ ad.name }}
                          </option>
                        </select>

                        <button type="buttom" @click="startOver" class="btn btn-secondary mt-2">
                          Start over
                        </button>
                      </div>
                    </div>
                  </Transition>

                  <div class="mt-2 mb-2">
                    <ul class="list-inline">
                      <li class="list-inline-item" style="font-size: 14px" v-if="project">
                        {{ project.name }} <i class="bi bi-chevron-right"></i>
                      </li>
                      <li class="list-inline-item" style="font-size: 14px" v-if="campaign">
                        {{ campaign.name }} <i class="bi bi-chevron-right"></i>
                      </li>
                      <li class="list-inline-item" style="font-size: 14px" v-if="ad_set">
                        {{ ad_set.name }}
                      </li>
                    </ul>
                  </div>

                  <!-- start info area -->
                  <Transition>
                    <div class="card w-100" v-if="step == 'see_ad_info'">
                      <div class="card-header">
                        <div class="d-flex justify-content-between">
                          <button
                            @click="showInfo"
                            class="btn btn-light align-middle"
                            type="button"
                          >
                            <span class="d-inline-block text-truncate" style="max-width: 300px">
                              See Info about the Ad "{{ like.name }}"
                            </span>
                            <svg
                              style="height: 20px"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              /></svg
                            >s
                          </button>

                          <button type="buttom" @click="refreshAdInfo" class="btn btn-dark">
                            Refresh
                          </button>
                          <button type="buttom" @click="startOver" class="btn btn-secondary">
                            Start over
                          </button>
                        </div>
                      </div>
                      <div class="card-body" v-show="show_info">
                        <div class="alert alert-warning mt-2" role="alert">
                          <p class="text-justify font-weight-light">
                            As you scroll through likes you will see the results below. After you
                            are done you can send them to Atlas web site to manage.
                          </p>
                        </div>
                        <ul>
                          <li>URL: {{ like.url }}</li>
                          <li>Created At: {{ like.created_at }}</li>
                          <li>Total Import {{ lastImport.total }} records.</li>
                          <li>The last imported username {{ lastRecord.username }}.</li>
                          <li>The Full Name is {{ lastRecord.full_name }}.</li>
                        </ul>
                        <message :type="message.type" v-if="message.message">
                          {{ message.message }}
                        </message>
                      </div>
                    </div>
                  </Transition>
                  <!-- end info area -->
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import Message from './Message';
  import Card from './Card';
  import Errors from './Errors';
  import _ from 'lodash';
  export default {
    components: {
      Message,
      Card,
      Errors,
    },
    props: {
      followers: {
        type: Array,
        default: [],
      },
      endpoint: {
        type: String,
        default: 'instagrams',
      },
    },
    computed: {
      lastRecord: {
        get() {
          if (this.lastImport.data.length == 0) {
            return {
              full_name: 'none found',
              profile_pic_url: null,
            };
          } else {
            let record = this.lastImport['data'][0];
            return record;
          }
        },
      },
      likes_key() {
        return this.endpoint == 'instagrams' ? 'instagram_likes' : 'facebook_likes';
      },
      project_id() {
        return this.project != null && this.project.id != null ? this.project.id : null;
      },
      campaign_id() {
        return this.campaign != null && this.campaign.id != null ? this.campaign.id : null;
      },
      ad_set_id() {
        return this.ad_set != null && this.ad_set.id != null ? this.ad_set.id : null;
      },
    },
    data() {
      return {
        errorMessage:
          "Make sure you have the right token from Atlas. You can see the how to video <a href='https://www.dropbox.com/s/pwd46rqcufofquv/token.mp4?dl=0' target='_blank'>here</a>",
        step: 'select_project',
        projects: [],
        project: {},
        ads: [],
        initial_loading: true,
        ad_set: {},
        ad_sets: [],
        campaign: {},
        campaigns: [],
        show_info: false,
        current_team_name: null,
        error: '',
        message: {
          type: 'success',
          message: null,
        },
        apiToken: null,
        running: false,
        existingInstagramLikings: {
          data: [],
          total: 0,
        },
        hideCreateForm: false,
        chromeUrl: null,
        loading: false,
        likeId: null,
        lastImport: {
          total: 0,
          data: [],
        },
        like: {
          id: null,
          name: null,
          url: null,
          user_id: null,
          updated_at: null,
          created_at: null,
        },
      };
    },
    mounted() {
      this.getApiToken().then((res) => {
        this.getEngagementApi('select_project');
      });
    },
    methods: {
      showInfo() {
        this.show_info = !this.show_info;
      },
      createFollowers() {
        this.$emit('createFollowersClicked');
      },
      refreshAdInfo() {
        this.$emit('likeSelected', this.like);
        this.getFollowers();
      },
      likeSelected() {
        this.step = 'see_ad_info';
        this.getFollowers();
        this.$emit('likeSelected', this.like);
      },
      startOver() {
        this.hideCreateForm = false;
        this.step = this.$options.data().step;
        this.like = this.$options.data().like;
        this.project = null;
        this.campaign = this.$options.data().campaign;
        this.ad_set = this.$options.data().ad_set;
        this.message.message = null;
      },
      async getApiToken() {
        let token = await this.token();
        this.apiToken = token;
        this.$emit('apiTokenUpdated', this.apiToken);
      },
      async getUrl() {
        let queryOptions = { active: true, currentWindow: true };
        return await chrome.tabs.query(queryOptions);
      },
      getFollowers() {
        this.$http
          .get(`${this.hostname}/api/${this.endpoint}/${this.like.id}`, {
            headers: {
              Authorization: `Bearer ${this.apiToken}`,
              'content-type': 'application/json',
            },
          })
          .then((response) => {
            this.lastImport = response.data;
          })
          .catch((error) => {
            this.error = error;
          });
      },
      getEngagementApiProjectUpdated(resource) {
        this.step = 'select_campaign';
        this.project = resource;
        this.getEngagementApi(this.step);
      },
      getEngagementApiCampaignUpdated(resource) {
        this.step = 'select_ad_set';
        this.campaign = resource;
        this.getEngagementApi(this.step);
      },
      getEngagementApiAdSetUpdated(resource) {
        this.step = 'select_ad';
        this.ad_set = resource;
        this.getEngagementApi(this.step);
      },
      getEngagementApi(step) {
        var url = new URL(`${this.hostname}/api/engagements`),
          params = {
            project: this.project_id,
            campaign: this.campaign_id,
            ad_set: this.ad_set_id,
          };
        Object.keys(params).forEach((key) => {
          if (params[key] != null) {
            url.searchParams.append(key, params[key]);
          }
        });
        this.loading = true;
        this.$http
          .get(url, {
            maxRedirects: 0,
            timeout: 4000,
            headers: {
              Authorization: `Bearer ${this.apiToken}`,
              'content-type': 'application/json',
              Accepts: 'application/json',
            },
          })
          .then((response) => {
            this.hydrateData(response);
            this.loading = false;
            this.initial_loading = false;
            this.step = step;
          })
          .catch((error) => {
            if (error.response && error.response.status && error.response.status == 401) {
              this.error = this.errorMessage;
            } else {
              this.error = error;
            }
            this.loading = false;
          });
      },
      hydrateData(response) {
        this.projects = response.data.projects;
        this.project = response.data.project ? response.data.project : null;
        this.ads = response.data.ads;
        this.ad_set = response.data.ad_set;
        this.ad_sets = response.data.ad_sets;
        this.campaign = response.data.campaign;
        this.campaigns = response.data.campaigns;
        this.current_team_name = response.data.current_team_name;
      },
    },
  };
</script>

<style>
  @import '../styles/bootstrap.min.css';
</style>
