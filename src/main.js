import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  PaginationPlugin,
  TablePlugin,
  SpinnerPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  PaginationPlugin,
  TablePlugin,
  SpinnerPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage?.username,
  serverUrl: "http://localhost:3000/",

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },


  //* ------------------------------ UnionAgent ------------------------------ *//

  leagueFutureMatches: undefined,
  leaguePastMatches: undefined,

  async initDataForUnionAgent(){
    try{
      const responseFromLeagueMatches = await this.getLeagueMatches();

      localStorage.setItem("leagueFutureMatches", responseFromLeagueMatches.featureMatches);
      localStorage.setItem("leaguePastMatches", responseFromLeagueMatches.pastMatches);

      this.leagueFutureMatches = responseFromLeagueMatches.featureMatches;
      this.leaguePastMatches = responseFromLeagueMatches.pastMatches;

    }catch ( error ){
      // TODO: What to do We The Error ???
    }
  },

  async getLeagueMatches(){
    try{
        axios.withCredentials = true;
        const response = await axios.get(
            this.serverUrl + "unionAgent/leagueManagementPage"
        );
        
        axios.withCredentials = false;
        
        return response.data;

    } catch (error){
      // TODO: What to do We The Error ???
      console.log("Error In  getLeagueMatches");
    }
  }
};


console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
