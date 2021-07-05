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
  AvatarPlugin,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
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
  SpinnerPlugin,
  PopoverPlugin ,
  IconsPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  OverlayPlugin,
} from "bootstrap-vue";
[
  AvatarPlugin,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
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
  SpinnerPlugin,
  PopoverPlugin ,
  IconsPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  OverlayPlugin
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

    if ( username == "daniMoshe" ){
      localStorage.setItem("unionAgentLogged", JSON.stringify(true));

      this.getDataForUnionActions().then( () => {
        localStorage.setItem("unionAgentDataActions", JSON.stringify(true));
      });
    }
  },

  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("UserFavoriteMatches");

    if ( this.username == "daniMoshe" ){
      this.cleanUnionAgentData();

    }
    this.username = undefined;
  },


  //* ------------------------------ UnionAgent ------------------------------ *//


  cleanUnionAgentData(){

    localStorage.removeItem("unionAgentLogged");
    localStorage.removeItem("leagueFutureMatches");
    localStorage.removeItem("leaguePastMatches");
    localStorage.removeItem("teamsNames");
    localStorage.removeItem("venuesNames");
    localStorage.removeItem("referees");

    localStorage.removeItem("unionAgentDataActions");

  },

  async initDataForUnionAgent(){
    try{
      const responseFromLeagueMatches = await this.getLeagueMatches();
      localStorage.setItem("leagueFutureMatches", JSON.stringify(responseFromLeagueMatches.featureMatches));
      localStorage.setItem("leaguePastMatches", JSON.stringify(responseFromLeagueMatches.pastMatches));
      console.log("done - Init Data From Union Agent");

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
      }
  },

  async getDataForUnionActions(){
    try{

      const responseForNewMatch = await this.getDetailsForNewMatch();
      localStorage.setItem("teamsNames", JSON.stringify(responseForNewMatch.teamsNames));
      localStorage.setItem("venuesNames", JSON.stringify(responseForNewMatch.venuesName));
      localStorage.setItem("referees", JSON.stringify(responseForNewMatch.referees));

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async getDetailsForNewMatch(){
    try{
      axios.withCredentials = true;
      const response = await axios.get(
          this.serverUrl + "unionAgent/match"
      );
      
      axios.withCredentials = false;
      
      return response.data;

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async initDataForUser(){
    try{
      // console.log(localStorage.getItem("username"));
      const response = await this.getUserFavoriteMatches();
      localStorage.setItem("UserFavoriteMatches", JSON.stringify(response));
      console.log("done - Init Data From User");

    }catch ( error ){
      // TODO: What to do We The Error ???
    }
  },

  async getUserFavoriteMatches(){
    try{
        // axios.withCredentials = true;
        const response = await axios.get(
            this.serverUrl + "users/favoriteMatches"
        );
        // axios.withCredentials = false;
        return response.data;

    } catch (error){
      // TODO: What to do We The Error ???
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
