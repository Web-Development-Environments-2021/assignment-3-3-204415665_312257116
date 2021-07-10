
<template>
    <div class="container " style="padding-top: 15px;">
      <!------------------------ display ------------------------>
      <div class="row" v-if="loadingFlag">

      <!----------------------- no contact ---------------------->
        <div v-if="resultFlag" style="padding-top: 15px;">
            <div class="match-card noContact card text-white">
                <div class="card-body" >                         
                    <!-- <a class="text-white" herf="#"> -->
                    <div style="text-align:center;font-size: 18px!important;">
                        <a>You have no favorite games at the moment<br>To add, click here</a><br><br>
                        <b-button @click="moveToCurrentMatch" variant="primary">Add matches</b-button>
                    </div>
                </div>
            </div>
        </div>

      <!---------------------- have contact ---------------------->
        <div v-else v-for="(g,index) in favoriteMatchesList" v-bind:key="g.matchID"  style="padding-top: 15px;">
          <div :sync="displayMode()"></div>
            <div v-if="index < limit" class="col-sm-4">
              <div class="match-card favoriteMatches card  text-white card-has-bg click-col">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">                         
                      <h4 class="card-title mt-0" >
                        <!-- <a class="text-white" herf="#"> -->
                          <div :title="g.matchID" class="match-title">
                              <a>Match Id:{{ g.matchID }}</a> 
                          </div>
                          <div class="future-match-content">                                           
                            <div class="row" >     
                              <div class="teamsName">
                                  <router-link :to="`/teams/teamDetails/${ g.localTeamName }`" class="teams-names" >
                                      {{ g.localTeamName }}
                                  </router-link>
                                  VS
                                  <router-link :to="`/teams/teamDetails/${ g.visitorTeamName }`" class="teams-names" >
                                      {{ g.visitorTeamName }}
                                  </router-link>
                              </div>
                              <br><hr>
                          </div>
                          <div class=match-info>
                            Venue: {{ g.venueName }}
                          </div>
                          <div class=match-info  >
                            Referee Name : {{ refereeFullName(g) }}
                          </div>
                          </div>
                      </h4>
                    <small class="card-meta" style="float:right;">match date: {{g.matchDate.slice(0,10)}} , {{ g.matchDate.slice(11,16)}}</small>

                  </div>
                    <div>
                      <div class='form-check form-switch'>
                      </div>
                      <b-button pill style="float:right;" @click="clickHandler(g)" v-bind:pressed="g.myToggle" variant="outline-warning"> <b-icon icon="star-fill" class="rounded-circle" /> </b-button>
                      <!-- <p style="position: absolute; top:225px;left: 270px;"><strong>{{ g.myToggle }}</strong></p> -->
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!------------------------ loading  ------------------------>
      <div v-else>
        <loading/>
      </div>
      </div>
</template>

<script>

import Loading from "./loading";

export default {

  name: "FavoriteMatches",
  components: {
    Loading,

  },
  props:{
    display:{
      type: String,
      require: true
    }
  },
  data() {

    return {

      favoriteMatchesList:[],
      updateInterval: undefined,
      loadingFlag:false,
      resultFlag:false,
      limit:3,

    };
  },

  methods: {
    hasRefereeInfo(element){
      if(element?.refereeInformation==undefined){
        return false
      }
      return Object.keys(element.refereeInformation).length;
    },
    refereeFullName(match) {
      var refereeInfo = match.refereeInformation;
      if (refereeInfo == undefined) {
        return "  -  "; 
      }
      if ( Object.keys(refereeInfo).length ) {
          return refereeInfo.firstname + " " + refereeInfo.lastname;
      }
      return "  -  ";
    },

// ------------------------------------------clickHandler------------------------------------------
    async clickHandler(g){
      try{
          let response;
          let StageMatchesHandler=[];
          StageMatchesHandler.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
          g.myToggle = !g.myToggle;
          StageMatchesHandler?.map(Stage =>{
            if(Stage.matchID==g.matchID){
              Stage.myToggle=g.myToggle;
            }
          });

          if(g.myToggle==false){
            response = await this.DeleteFavoriteMatches(g.matchID);
            if(response.status < 400){
              this.favoriteMatchesList = this.favoriteMatchesList?.filter(function(value){ 
                return value.matchID != g.matchID;
              });
            }
          }
          localStorage.setItem("UserFavoriteMatches", JSON.stringify(this.favoriteMatchesList));
          localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(StageMatchesHandler));
          this.$root.toast("status", "The game was successfully removed from favorites", "success");

      }catch
      {
        this.$root.toast("Error", "Multiple clicks - the game has been added once", "failure");
      }
      
    },

/**
 * ------------------------------------------clickHandler------------------------------------------
 */
  async DeleteFavoriteMatches(matchID){
      try{
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.delete(
              this.$root.store.serverUrl + "users/favoriteMatches?matchID=" + matchID
          );
          this.axios.defaults.withCredentials = false;
          return response;
          
      } catch (error){
        // TODO: What to do We The Error ???
      }
  },

//**------------------------------updateFavoriteMatches------------------------------------ */
    updateFavoriteMatches(){ 

      var userFavorite = JSON.parse(localStorage.getItem("UserFavoriteMatches"));


      if( userFavorite != undefined ) {

        if ( userFavorite.length!=0 ) {

          if ( !(JSON.stringify(this.favoriteMatchesList) === JSON.stringify( userFavorite ))) {

            this.favoriteMatchesList = [];
            this.loadingFlag=true;
            this.favoriteMatchesList.push(... userFavorite );
            this.updatedChanges();
          }
        }     
        if(this.favoriteMatchesList.length == 0) {
          this.loadingFlag=true;
          this.resultFlag=true;
        }
      }
    },

    moveToCurrentMatch() {
        this.$router.push("/matches/currentStageMatches");
    },

    updatedChanges(){ 
      let StageMatchesHandler =[];
      StageMatchesHandler.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
      StageMatchesHandler?.map(Stage =>
        this.favoriteMatchesList?.map(fev =>
        {
          if(fev.matchID==Stage.matchID){
            Stage.myToggle=true;
          }
        })
      );
      localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(StageMatchesHandler));
    },

    displayMode(){
      if(this.display=="main"){
        this.limit = 3;
      }
      else{
        this.limit = this.favoriteMatchesList.length;
      }
    }
  },
  //**--------------------------------------------mounted------------------------------------ */

  mounted()  {
    this.updateInterval = setInterval( this.updateFavoriteMatches, 100 );
  },

 //**--------------------------------------------beforeDestroy------------------------------------ */

  beforeDestroy(){
    clearInterval(this.updateInterval);
  },

};

</script>

<style lang="scss" scoped>

.match-card.noContact.card{
    min-height: 200px !important;
    min-width: 200px !important;
    font-size: 13px!important;
    left: 20px;
    background-color: #293241a4;

}
.container{
    left: 0px!important;
    position: absolute!important;
}

.match-card.favoriteMatches.card{
    min-height: 210px !important;
    min-width: 330px !important;
    background-image:url('../assets/AdobeStock_203017792.jpeg');
    // background-size: cover;
    font-size: 17px;
}
.match-title{
  font-size: 25px!important;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-align: center;
  position: absolute;
  top:30px;
  left: 75px;
  margin: auto;
  color: rgb(32, 32, 32);
}

.teamsName{
  position: absolute;
  top: 75px;
  left: 20px;
  text-align: center;
  // width: 200px;
  // word-wrap: break-word;
  font-size: 15px!important;
}

.match-info{
  position: relative;
  top: 25px;
  font-size: 12px!important;
  text-align: left;
  padding: 3px;
}
small{
  position: absolute;
    top: 150px;
  left: 15px;
}

.teams-names {
  color: white;
}

.teams-names:hover {
  color: blue;
}
  
</style> 

