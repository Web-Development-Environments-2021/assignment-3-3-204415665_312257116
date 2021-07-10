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

    if ( username == "daniMoshe" ){
      localStorage.setItem("unionAgentLogged", JSON.stringify(true));

      this.getDataForUnionActions().then( () => {
        localStorage.setItem("unionAgentDataActions", JSON.stringify(true));
      });
    }
  },

  logout() {
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
    sessionStorage.removeItem("lastSearchQuery");
    sessionStorage.removeItem("lastSearchResults");
    sessionStorage.removeItem("lastSearchType");

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

    }catch ( error ){
      console.log(error);
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
        console.log(error);
      }
  },

  async getDataForUnionActions(){
    try{

      const responseForNewMatch = await this.getDetailsForNewMatch();
      localStorage.setItem("teamsNames", JSON.stringify(responseForNewMatch.teamsNames));
      localStorage.setItem("venuesNames", JSON.stringify(responseForNewMatch.venuesName));
      localStorage.setItem("referees", JSON.stringify(responseForNewMatch.referees));

    } catch (error){
      console.log(error);
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
      console.log(error);
    }
  },

// -------------------------------Get League Details --------------------------------

  async getLeagueDetails(){
    try {
      axios.withCredentials = true;
      axios.get( this.serverUrl + "league/getDetails" )
      .then( (response) => {
        axios.withCredentials = false;
        localStorage.setItem("leagueDetails", JSON.stringify(response.data.leagueDetails) );
      })
      .catch( (err) => { console.log(err); } );
      
    } catch (error){
      console.log(error);
    }
  },  
  
// -------------------------------getSearchInfo--------------------------------

  async getDataForSearch(){
    try{
      // const searchResponse = await this.initSearchInfo();
      this.initSearchInfo().then( ( searchResponse ) => {
        localStorage.setItem("teamsInfo", JSON.stringify(searchResponse.all_Info.Teams));
        localStorage.setItem("playersInfo", JSON.stringify(searchResponse.all_Info.Players));
      });

    } catch (error){
      console.log(error);
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
      console.log(error);
    }
  },

  async initDataForSearch(){
    try{
      const responseForNewMatch = await this.getDetailsForNewMatch();
      localStorage.setItem("teamsNames", JSON.stringify(responseForNewMatch.teamsNames));
      localStorage.setItem("venuesNames", JSON.stringify(responseForNewMatch.venuesName));
      localStorage.setItem("referees", JSON.stringify(responseForNewMatch.referees));
    } catch (error){
      console.log(error);
    }
  },

// -------------------------------Data For User--------------------------------

  async initDataForUser(){
    try{

      var favoriteResponse = await this.getUserFavoriteMatches();
      favoriteResponse?.map(fav => fav.myToggle=true);
      localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteResponse));
    }catch ( error ){
      console.log(error);
    }
  },

  async getUserFavoriteMatches(){
    try{
        axios.withCredentials = true;
        const response = await axios.get(
            this.serverUrl + "users/favoriteMatches"
        );
        axios.withCredentials = false;
        if(response.status==204){
          return [];
        }
        return response.data;

    } catch (error){
      console.log(error);
    }
  },

  async getCurrentStageMatches(){
    try{
        axios.withCredentials = true;
        axios.get(  this.serverUrl + "matches/currentStageMatches" ).then( ( response ) => {
            axios.withCredentials = false;
            localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(response.data?.futureMatches));
            localStorage.setItem("CurrentStageMatchesPastMatches", JSON.stringify(response.data?.pastMatches));
          }
        );
      } catch (error){
        console.log(error);
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
          this.$root.store.logout();
          this.axios.defaults.withCredentials = true;
          this.axios.post(this.$root.store.serverUrl + "Logout").then( ( res ) => {
            this.axios.defaults.withCredentials = false;
          });
      }
      this.$root.store.onExit();

    }
    if( JSON.parse(sessionStorage.getItem("enter"))==true ){
      this.$root.store.getLeagueDetails();
      this.$root.store.getDataForSearch();
      this.$root.store.getCurrentStageMatches();
      sessionStorage.setItem("enter", JSON.stringify(false));
    }

  },

  render: (h) => h(App)
}).$mount("#app");
