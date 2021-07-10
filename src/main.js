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
  FormTimepickerPlugin ,
  FormRatingPlugin,
  FormCheckboxPlugin,
  OverlayPlugin,
  ModalPlugin,
  ImagePlugin,
  BootstrapVueIcons 
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
  FormTimepickerPlugin ,
  FormRatingPlugin,
  FormCheckboxPlugin,
  OverlayPlugin,
  ModalPlugin,
  ImagePlugin,
  BootstrapVueIcons 
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
    this.onLogOut();

    if ( this.username == "daniMoshe" ){
      this.cleanUnionAgentData();

    }
    this.username = undefined;
  },


  //* ------------------------------ UnionAgent ------------------------------ *//
  onLogOut(){

    localStorage.removeItem("UserFavoriteMatches");

    if ( JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")) != undefined ) {

      let currentStageMatches=[];
      currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
      currentStageMatches.map(fav => delete fav?.myToggle);
      localStorage.setItem("CurrentStageMatchesFutureMatches",JSON.stringify(currentStageMatches));
    }

  },
  onExit(){
    localStorage.removeItem("UserFavoriteMatches");
    localStorage.removeItem("teamsInfo");
    localStorage.removeItem("playersInfo");
    localStorage.removeItem("CurrentStageMatchesFutureMatches");
    localStorage.removeItem("CurrentStageMatchesPastMatches");
  },
  onEnter(){
    localStorage.setItem("teamsInfo", undefined);
    localStorage.setItem("playersInfo", undefined);
    localStorage.setItem("UserFavoriteMatches", undefined);
    localStorage.setItem("CurrentStageMatchesFutureMatches", undefined);
    localStorage.setItem("CurrentStageMatchesPastMatches", undefined);
  },
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
  
// -------------------------------getSearchInfo--------------------------------

  async getDataForSearch(){
    try{
      console.log("Start init search info");
      // const searchResponse = await this.initSearchInfo();
      this.initSearchInfo().then( ( searchResponse ) => {
        localStorage.setItem("teamsInfo", JSON.stringify(searchResponse.all_Info.Teams));
        localStorage.setItem("playersInfo", JSON.stringify(searchResponse.all_Info.Players));
        console.log("Ends init search info");
      });

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async initSearchInfo(){
    try{
      axios.withCredentials = true;
      const response = await axios.get(
          this.serverUrl + "league/search/searchInfo"
      );
      axios.withCredentials = false;
      return response.data;
    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async initDataForSearch(){
    try{
      const responseForNewMatch = await this.getDetailsForNewMatch();
      localStorage.setItem("teamsNames", JSON.stringify(responseForNewMatch.teamsNames));
      localStorage.setItem("venuesNames", JSON.stringify(responseForNewMatch.venuesName));
      localStorage.setItem("referees", JSON.stringify(responseForNewMatch.referees));
    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

// -------------------------------Data For User--------------------------------

  async initDataForUser(){
    try{
      console.log("Start init User info");

      var favoriteResponse = await this.getUserFavoriteMatches();
      favoriteResponse?.map(fav => fav.myToggle=true);
      localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteResponse));
      console.log("done - Init Data From User");
    }catch ( error ){
      // TODO: What to do We The Error
    }
  },

  async getUserFavoriteMatches(){
    try{
        axios.withCredentials = true;
        const response = await axios.get(
            this.serverUrl + "users/favoriteMatches"
        );
        axios.withCredentials = false;
        console.log(response);
        if(response.status==204){
          return [];
        }
        return response.data;

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async getCurrentStageMatches(){
    try{
        console.log("starts - getCurrentStageMatches")
        axios.withCredentials = true;
        axios.get(  this.serverUrl + "matches/currentStageMatches" ).then( ( response ) => {
            axios.withCredentials = false;
            console.log(response.data.pastMatches);
            localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(response.data?.futureMatches));
            localStorage.setItem("CurrentStageMatchesPastMatches", JSON.stringify(response.data?.pastMatches));
            console.log("finises - getCurrentStageMatches")
          }
        );
      } catch (error){
        // TODO: What to do We The Error ???
      }
  },

}

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
  created(){

    if(sessionStorage.enter==undefined){

      sessionStorage.setItem("enter", JSON.stringify(true));

      if ( localStorage.username ){
          console.log("Need LogOut");
          this.$root.store.logout();
          this.axios.defaults.withCredentials = true;
          this.axios.post(this.$root.store.serverUrl + "Logout").then( ( res ) => {
            
            this.axios.defaults.withCredentials = false;
          });
      }
      this.$root.store.onExit();

    }
    if( JSON.parse(sessionStorage.getItem("enter"))==true ){
      this.$root.store.getDataForSearch();
      this.$root.store.getCurrentStageMatches();
      sessionStorage.setItem("enter", JSON.stringify(false));
    }

  },

  render: (h) => h(App)
}).$mount("#app");
