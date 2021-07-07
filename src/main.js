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
    this.onLogOut();

    if ( this.username == "daniMoshe" ){
      this.cleanUnionAgentData();

    }
    this.username = undefined;
  },


  //* ------------------------------ UnionAgent ------------------------------ *//
  onLogOut(){
    localStorage.setItem("UserFavoriteMatches", []);
    localStorage.setItem("teamsInfo", []);
    localStorage.setItem("playersInfo", []);
    let currentStageMatches=[];
    currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
    currentStageMatches?.map(fav => delete fav.myToggle);
    localStorage.setItem("CurrentStageMatchesFutureMatches",JSON.stringify(currentStageMatches));
  },
  onExit(){
    localStorage.removeItem("UserFavoriteMatches");
    localStorage.removeItem("teamsInfo");
    localStorage.removeItem("playersInfo");
    localStorage.removeItem("CurrentStageMatchesFutureMatches");
    localStorage.removeItem("CurrentStageMatchesPastMatches");
  },
  onEnter(){
    localStorage.setItem("UserFavoriteMatches", []);
    localStorage.setItem("CurrentStageMatchesFutureMatches", []);
    localStorage.setItem("CurrentStageMatchesPastMatches", []);
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
      if (localStorage.getItem("teamsInfo")?.length==0 && localStorage.getItem("playersInfo")?.length==0){
          const searchResponse = await this.initSearchInfo();
          localStorage.setItem("teamsInfo", JSON.stringify(searchResponse.all_Info.Teams));
          localStorage.setItem("playersInfo", JSON.stringify(searchResponse.all_Info.Players));
          console.log("Ends init search info");
    }
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



// -------------------------------DataForUser--------------------------------

  async initDataForUser(){
    try{
      var favoriteResponse = await this.getUserFavoriteMatches();
      var stagerResponseFutureMatches = [];
      stagerResponseFutureMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));

      favoriteResponse?.map(fav => fav.myToggle=true);

      // stagerResponseFutureMatches?.map(fav => fav.myToggle=false);
      // // if(favoriteResponse.length>0 && stagerResponse.length>0)
      // // {
      //   stagerResponseFutureMatches?.map(Stage =>
      //     favoriteResponse?.map(fev =>
      //       {
      //         if(!Stage?.myToggle){
      //           if(fev.matchID==Stage.matchID){
      //             Stage.myToggle=true;
      //           }
      //         }
      //       }
      //     )
      //   );

      // console.log(favoriteResponse);
      // console.log(stagerResponseFutureMatches);
      localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(stagerResponseFutureMatches));
      localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteResponse));
      console.log("done - Init Data From User");


    }catch ( error ){
      // TODO: What to do We The Error ???
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
        return response?.data;

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },

  async getCurrentStageMatches(){
    try{
        console.log("starts - getCurrentStageMatches")
        axios.withCredentials = true;
        const response = await axios.get(
            this.serverUrl + "matches/currentStageMatches"
        );
        axios.withCredentials = false;
        if(response.status==204){
          response.data= [];
        }
        localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(response?.data.futureMatches));
        localStorage.setItem("CurrentStageMatchesPastMatches", JSON.stringify(response?.data.pastMatches));
        console.log("finises - getCurrentStageMatches")

    } catch (error){
      // TODO: What to do We The Error ???
    }
  },
}
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
  created(){
    this.$root.store.onEnter();
    this.$root.store.getDataForSearch();
    this.$root.store.getCurrentStageMatches();
    localStorage.setItem("UserFavoriteMatches",[]);

  },
  // destroyed(){
  //   this.$root.store.onExit();
  // },

  render: (h) => h(App)
}).$mount("#app");
